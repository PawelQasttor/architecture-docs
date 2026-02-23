#!/usr/bin/env python3
"""
SBM-to-IFC Generator
Converts compiled SBM JSON (sbm.json) to a valid IFC4 file with proper
building geometry (walls, slabs, doors, room shapes).

When spaces include a "geometry.outline" polygon, the generator creates:
- Polygon-extruded IfcSpace volumes
- IfcWall elements along room boundaries (interior + exterior)
- IfcSlab floor element
- IfcDoor + IfcOpeningElement for connections between spaces

Without geometry data, it falls back to simple bounding boxes.

Usage:
    python sbm-to-ifc.py --input build/green-terrace/sbm.json --output build/green-terrace/green-terrace.ifc
"""

import argparse
import json
import math
import sys

import ifcopenshell
import ifcopenshell.api
import ifcopenshell.guid

# -- Constants ----------------------------------------------------------------

EXTERIOR_WALL_THICKNESS = 0.20  # meters
INTERIOR_WALL_THICKNESS = 0.12  # meters
SLAB_THICKNESS = 0.20  # meters


# -- Helpers ------------------------------------------------------------------

def load_sbm(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def edge_key(p1, p2):
    """Canonical key for an edge (order-independent, rounded for float comparison)."""
    a = (round(p1[0], 4), round(p1[1], 4))
    b = (round(p2[0], 4), round(p2[1], 4))
    return (min(a, b), max(a, b))


def edges_from_outline(outline):
    """Return list of (p1, p2) edges from a polygon outline."""
    edges = []
    n = len(outline)
    for i in range(n):
        p1 = (float(outline[i][0]), float(outline[i][1]))
        p2 = (float(outline[(i + 1) % n][0]), float(outline[(i + 1) % n][1]))
        edges.append((p1, p2))
    return edges


def wall_angle(p1, p2):
    """Angle in radians from p1 to p2 in the XY plane."""
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    return math.atan2(dy, dx)


def edge_length(p1, p2):
    """Distance between two 2D points."""
    return math.sqrt((p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2)


def create_extruded_polygon(model, body_context, outline_2d, height):
    """Create an IfcShapeRepresentation from a 2D polygon extruded vertically.

    Args:
        model: IFC model
        body_context: Body representation context
        outline_2d: list of (x, y) tuples defining the polygon in meters
        height: extrusion height in meters

    Returns:
        IfcShapeRepresentation

    Note:
        Converts meter coordinates to millimeters to match project units
    """
    # Convert meters to millimeters and close the polygon
    pts_3d = [(float(p[0]) * 1000.0, float(p[1]) * 1000.0, 0.0) for p in outline_2d]
    pts_3d.append(pts_3d[0])

    ifc_pts = [model.createIfcCartesianPoint(p) for p in pts_3d]
    polyline = model.createIfcPolyline(ifc_pts)
    profile = model.createIfcArbitraryClosedProfileDef("AREA", None, polyline)

    origin = model.createIfcCartesianPoint((0.0, 0.0, 0.0))
    z_dir = model.createIfcDirection((0.0, 0.0, 1.0))
    x_dir = model.createIfcDirection((1.0, 0.0, 0.0))
    placement = model.createIfcAxis2Placement3D(origin, z_dir, x_dir)

    direction = model.createIfcDirection((0.0, 0.0, 1.0))
    # Convert height from meters to millimeters
    solid = model.createIfcExtrudedAreaSolid(profile, placement, direction, float(height) * 1000.0)

    rep = model.createIfcShapeRepresentation(body_context, "Body", "SweptSolid", [solid])
    return rep


# -- IFC Model Creation -------------------------------------------------------

def create_ifc_model(sbm):
    """Create an IFC4 model from SBM JSON data with proper geometry."""
    project_name = sbm.get("project", {}).get("name", "SBM Project")

    # Create blank IFC4 model
    model = ifcopenshell.api.run("project.create_file", version="IFC4")

    # Project
    project = ifcopenshell.api.run(
        "root.create_entity", model, ifc_class="IfcProject", name=project_name
    )

    # Units - metric (millimeters)
    # Note: ifcopenshell API functions auto-convert, but manual geometry creation needs mm
    ifcopenshell.api.run("unit.assign_unit", model)

    # Geometric representation context
    ctx = ifcopenshell.api.run("context.add_context", model, context_type="Model")
    body = ifcopenshell.api.run(
        "context.add_context",
        model,
        context_type="Model",
        context_identifier="Body",
        target_view="MODEL_VIEW",
        parent=ctx,
    )

    # Spatial hierarchy: Site -> Building -> Storey
    site = ifcopenshell.api.run(
        "root.create_entity", model, ifc_class="IfcSite", name="Site"
    )
    ifcopenshell.api.run(
        "aggregate.assign_object", model, relating_object=project, products=[site]
    )

    # Collect unique building IDs from spaces
    building_ids = set()
    for space in sbm.get("entities", {}).get("spaces", []):
        bid = space.get("buildingId")
        if bid:
            building_ids.add(bid)

    buildings = {}
    for bid in sorted(building_ids):
        building = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcBuilding", name=bid
        )
        ifcopenshell.api.run(
            "aggregate.assign_object",
            model,
            relating_object=site,
            products=[building],
        )
        buildings[bid] = building

    # Collect unique level IDs and create storeys
    level_ids = set()
    for space in sbm.get("entities", {}).get("spaces", []):
        lid = space.get("levelId")
        bid = space.get("buildingId")
        if lid and bid:
            level_ids.add((bid, lid))

    storeys = {}
    for bid, lid in sorted(level_ids):
        if bid not in buildings:
            continue
        storey = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcBuildingStorey", name=lid
        )
        ifcopenshell.api.run(
            "aggregate.assign_object",
            model,
            relating_object=buildings[bid],
            products=[storey],
        )
        storeys[(bid, lid)] = storey

    # ---- Create spaces with geometry ----------------------------------------
    ifc_spaces = {}
    has_geometry = False
    all_edges = {}  # edge_key -> list of space_ids
    all_outlines = {}  # space_id -> outline
    space_storeys = {}  # space_id -> storey_key
    x_offset = 0.0

    for space_data in sbm.get("entities", {}).get("spaces", []):
        space_id = space_data["id"]
        space_name = space_data.get("spaceName", space_id)
        area = space_data.get("designArea", 10.0)
        height = space_data.get("designHeight", 2.7)
        global_id = space_data.get("ifcMapping", {}).get("globalId")
        geometry = space_data.get("geometry")

        bid = space_data.get("buildingId")
        lid = space_data.get("levelId")
        storey_key = (bid, lid)
        space_storeys[space_id] = storey_key

        # Create IfcSpace
        ifc_space = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcSpace", name=space_name
        )
        if global_id:
            ifc_space.GlobalId = global_id
        ifc_space.LongName = space_name
        ifc_space.CompositionType = "ELEMENT"

        if geometry and "outline" in geometry:
            # -- Proper polygon geometry --
            has_geometry = True
            outline = geometry["outline"]
            elevation = geometry.get("elevation", 0.0)
            all_outlines[space_id] = outline

            # Track edges for wall detection
            for p1, p2 in edges_from_outline(outline):
                ek = edge_key(p1, p2)
                all_edges.setdefault(ek, []).append(space_id)

            # Create polygon extrusion
            rep = create_extruded_polygon(model, body, outline, height)
            prod_rep = model.createIfcProductDefinitionShape(None, None, [rep])
            ifc_space.Representation = prod_rep

            # Place at correct elevation (convert meters to millimeters)
            matrix = [
                [1.0, 0.0, 0.0, 0.0],
                [0.0, 1.0, 0.0, 0.0],
                [0.0, 0.0, 1.0, elevation * 1000.0],
                [0.0, 0.0, 0.0, 1.0],
            ]
            ifcopenshell.api.run(
                "geometry.edit_object_placement",
                model,
                product=ifc_space,
                matrix=matrix,
            )
        else:
            # -- Fallback: bounding box from area --
            side = math.sqrt(area)
            matrix = [
                [1.0, 0.0, 0.0, x_offset],
                [0.0, 1.0, 0.0, 0.0],
                [0.0, 0.0, 1.0, 0.0],
                [0.0, 0.0, 0.0, 1.0],
            ]
            ifcopenshell.api.run(
                "geometry.edit_object_placement",
                model,
                product=ifc_space,
                matrix=matrix,
            )
            representation = ifcopenshell.api.run(
                "geometry.add_wall_representation",
                model,
                context=body,
                length=side,
                height=height,
                thickness=side,
            )
            ifcopenshell.api.run(
                "geometry.assign_representation",
                model,
                product=ifc_space,
                representation=representation,
            )
            x_offset += side + 0.5

        # Assign to storey
        if storey_key in storeys:
            ifcopenshell.api.run(
                "aggregate.assign_object",
                model,
                relating_object=storeys[storey_key],
                products=[ifc_space],
            )

        # Property set: Pset_SBM_Space
        occupancy = space_data.get("occupancy", {})
        requirements = space_data.get("requirements", [])
        zone_ids = space_data.get("zoneIds", [])

        pset_props = {
            "SBM_ID": space_id,
            "SBM_SpaceName": space_name,
            "SBM_SpaceType": space_data.get("spaceType", ""),
            "SBM_DesignArea": area,
            "SBM_DesignHeight": height,
            "SBM_DesignVolume": space_data.get("designVolume", 0.0),
            "SBM_MaxOccupants": occupancy.get("maxOccupants", 0),
            "SBM_UsagePattern": occupancy.get("usagePattern", ""),
            "SBM_Requirements": "; ".join(requirements),
            "SBM_ZoneIds": "; ".join(zone_ids),
        }

        pset = ifcopenshell.api.run(
            "pset.add_pset", model, product=ifc_space, name="Pset_SBM_Space"
        )
        ifcopenshell.api.run(
            "pset.edit_pset", model, pset=pset, properties=pset_props
        )

        ifc_spaces[space_id] = ifc_space

    # ---- Create walls -------------------------------------------------------
    ifc_walls = {}  # edge_key -> IfcWall

    if has_geometry:
        wall_height = sbm.get("entities", {}).get("spaces", [{}])[0].get(
            "designHeight", 2.7
        )
        wall_idx = 0

        for ek, space_ids in all_edges.items():
            p1, p2 = ek
            length = edge_length(p1, p2)
            if length < 0.01:
                continue

            is_interior = len(space_ids) > 1
            thickness = INTERIOR_WALL_THICKNESS if is_interior else EXTERIOR_WALL_THICKNESS
            wall_type = "Interior" if is_interior else "Exterior"
            wall_idx += 1
            wall_name = f"Wall-{wall_type}-{wall_idx:02d}"

            wall = ifcopenshell.api.run(
                "root.create_entity", model, ifc_class="IfcWall", name=wall_name
            )

            ifcopenshell.api.run(
                "geometry.create_2pt_wall",
                model,
                element=wall,
                context=body,
                p1=list(p1),
                p2=list(p2),
                elevation=0.0,
                height=wall_height,
                thickness=thickness,
            )

            # Assign to storey
            first_space_id = space_ids[0]
            sk = space_storeys.get(first_space_id)
            if sk and sk in storeys:
                ifcopenshell.api.run(
                    "spatial.assign_container",
                    model,
                    relating_structure=storeys[sk],
                    products=[wall],
                )

            # Wall property set
            wall_pset = ifcopenshell.api.run(
                "pset.add_pset", model, product=wall, name="Pset_WallCommon"
            )
            ifcopenshell.api.run(
                "pset.edit_pset",
                model,
                pset=wall_pset,
                properties={
                    "IsExternal": not is_interior,
                    "LoadBearing": not is_interior,
                },
            )

            ifc_walls[ek] = wall

    # ---- Create floor slab --------------------------------------------------
    if has_geometry and all_outlines:
        all_x = []
        all_y = []
        for outline in all_outlines.values():
            for pt in outline:
                all_x.append(float(pt[0]))
                all_y.append(float(pt[1]))

        slab_outline = [
            (min(all_x), min(all_y)),
            (max(all_x), min(all_y)),
            (max(all_x), max(all_y)),
            (min(all_x), max(all_y)),
        ]

        slab = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcSlab", name="Floor Slab L01"
        )

        slab_rep = ifcopenshell.api.run(
            "geometry.add_slab_representation",
            model,
            context=body,
            depth=SLAB_THICKNESS,
            polyline=slab_outline,
        )
        ifcopenshell.api.run(
            "geometry.assign_representation",
            model,
            product=slab,
            representation=slab_rep,
        )

        # Place slab below floor level
        slab_matrix = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, -SLAB_THICKNESS],
            [0.0, 0.0, 0.0, 1.0],
        ]
        ifcopenshell.api.run(
            "geometry.edit_object_placement",
            model,
            product=slab,
            matrix=slab_matrix,
        )

        # Assign to first storey
        for sk, storey in storeys.items():
            ifcopenshell.api.run(
                "spatial.assign_container",
                model,
                relating_structure=storey,
                products=[slab],
            )
            break

    # ---- Create doors -------------------------------------------------------
    doors_created = set()

    if has_geometry:
        for space_data in sbm.get("entities", {}).get("spaces", []):
            for adj in space_data.get("adjacentSpaces", []):
                if adj.get("relationship") != "connects_via_door":
                    continue
                door_info = adj.get("door")
                if not door_info:
                    continue

                pos = (float(door_info["position"][0]), float(door_info["position"][1]))
                door_key = (round(pos[0], 3), round(pos[1], 3))
                if door_key in doors_created:
                    continue
                doors_created.add(door_key)

                door_width = door_info.get("width", 0.90)
                door_height = door_info.get("height", 2.10)

                # Find the wall this door sits in
                target_wall = None
                target_ek = None

                for ek, wall in ifc_walls.items():
                    wp1, wp2 = ek
                    if abs(wp1[0] - wp2[0]) < 0.01:
                        # Vertical wall (constant X)
                        if abs(pos[0] - wp1[0]) < 0.01:
                            min_y = min(wp1[1], wp2[1])
                            max_y = max(wp1[1], wp2[1])
                            if min_y - 0.01 <= pos[1] <= max_y + 0.01:
                                target_wall = wall
                                target_ek = ek
                                break
                    elif abs(wp1[1] - wp2[1]) < 0.01:
                        # Horizontal wall (constant Y)
                        if abs(pos[1] - wp1[1]) < 0.01:
                            min_x = min(wp1[0], wp2[0])
                            max_x = max(wp1[0], wp2[0])
                            if min_x - 0.01 <= pos[0] <= max_x + 0.01:
                                target_wall = wall
                                target_ek = ek
                                break

                if not target_wall:
                    print(f"  Warning: No wall found for door at {pos}")
                    continue

                is_interior = len(all_edges.get(target_ek, [])) > 1
                wall_thick = INTERIOR_WALL_THICKNESS if is_interior else EXTERIOR_WALL_THICKNESS

                # Create opening element
                opening = ifcopenshell.api.run(
                    "root.create_entity",
                    model,
                    ifc_class="IfcOpeningElement",
                    name=f"Opening-{len(doors_created)}",
                )

                opening_depth = wall_thick + 0.10
                opening_rep = ifcopenshell.api.run(
                    "geometry.add_wall_representation",
                    model,
                    context=body,
                    length=door_width,
                    height=door_height,
                    thickness=opening_depth,
                )
                ifcopenshell.api.run(
                    "geometry.assign_representation",
                    model,
                    product=opening,
                    representation=opening_rep,
                )

                # Position opening on the wall (API handles meter-to-mm conversion)
                wp1, wp2 = target_ek
                angle = wall_angle(wp1, wp2)
                cos_a = math.cos(angle)
                sin_a = math.sin(angle)
                ox = pos[0] - sin_a * opening_depth / 2
                oy = pos[1] + cos_a * opening_depth / 2

                opening_matrix = [
                    [cos_a, -sin_a, 0.0, ox],
                    [sin_a, cos_a, 0.0, oy],
                    [0.0, 0.0, 1.0, 0.0],
                    [0.0, 0.0, 0.0, 1.0],
                ]
                ifcopenshell.api.run(
                    "geometry.edit_object_placement",
                    model,
                    product=opening,
                    matrix=opening_matrix,
                )

                # Void the wall
                ifcopenshell.api.run(
                    "feature.add_feature",
                    model,
                    feature=opening,
                    element=target_wall,
                )

                # Create door
                door = ifcopenshell.api.run(
                    "root.create_entity",
                    model,
                    ifc_class="IfcDoor",
                    name=f"Door-{len(doors_created)}",
                )
                door.OverallWidth = door_width
                door.OverallHeight = door_height

                door_rep = ifcopenshell.api.run(
                    "geometry.add_door_representation",
                    model,
                    context=body,
                    overall_width=door_width,
                    overall_height=door_height,
                )
                ifcopenshell.api.run(
                    "geometry.assign_representation",
                    model,
                    product=door,
                    representation=door_rep,
                )

                # Place door at same position as opening
                ifcopenshell.api.run(
                    "geometry.edit_object_placement",
                    model,
                    product=door,
                    matrix=opening_matrix,
                )

                # Fill opening with door
                ifcopenshell.api.run(
                    "feature.add_filling",
                    model,
                    opening=opening,
                    element=door,
                )

                # Assign door to storey
                for sk, storey in storeys.items():
                    ifcopenshell.api.run(
                        "spatial.assign_container",
                        model,
                        relating_structure=storey,
                        products=[door],
                    )
                    break

    # ---- Create zones -------------------------------------------------------
    for zone_data in sbm.get("entities", {}).get("zones", []):
        zone_id = zone_data["id"]
        zone_name = zone_data.get("zoneName", zone_id)
        global_id = zone_data.get("ifcMapping", {}).get("globalId")

        ifc_zone = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcZone", name=zone_name
        )
        if global_id:
            ifc_zone.GlobalId = global_id

        member_spaces = []
        for sid in zone_data.get("spaceIds", []):
            if sid in ifc_spaces:
                member_spaces.append(ifc_spaces[sid])

        if member_spaces:
            ifcopenshell.api.run(
                "group.assign_group",
                model,
                group=ifc_zone,
                products=member_spaces,
            )

        zone_props = {
            "SBM_ID": zone_id,
            "SBM_ZoneName": zone_name,
            "SBM_ZoneType": zone_data.get("zoneType", ""),
            "SBM_SpaceIds": "; ".join(zone_data.get("spaceIds", [])),
        }

        props = zone_data.get("properties", {})
        for key, val in props.items():
            if isinstance(val, (int, float)):
                zone_props[f"SBM_{key}"] = val
            elif isinstance(val, str):
                zone_props[f"SBM_{key}"] = val

        pset = ifcopenshell.api.run(
            "pset.add_pset", model, product=ifc_zone, name="Pset_SBM_Zone"
        )
        ifcopenshell.api.run(
            "pset.edit_pset", model, pset=pset, properties=zone_props
        )

    return model


def main():
    parser = argparse.ArgumentParser(
        description="Convert SBM JSON to IFC4 file"
    )
    parser.add_argument(
        "--input",
        required=True,
        help="Path to compiled sbm.json",
    )
    parser.add_argument(
        "--output",
        required=True,
        help="Output .ifc file path",
    )
    args = parser.parse_args()

    print(f"Loading SBM data from {args.input}...")
    sbm = load_sbm(args.input)

    project_name = sbm.get("project", {}).get("name", "Unknown")
    spaces = sbm.get("entities", {}).get("spaces", [])
    zones = sbm.get("entities", {}).get("zones", [])

    print(f"  Project: {project_name}")
    print(f"  Spaces: {len(spaces)}")
    print(f"  Zones: {len(zones)}")

    geo_count = sum(1 for s in spaces if s.get("geometry", {}).get("outline"))
    if geo_count:
        print(f"  Geometry: {geo_count}/{len(spaces)} spaces with polygon outlines")
    else:
        print("  Geometry: bounding-box mode (no polygon outlines in data)")

    print("Generating IFC4 model...")
    model = create_ifc_model(sbm)

    print(f"Writing IFC file to {args.output}...")
    model.write(args.output)

    # Summary
    print(f"\n  IFC file generated successfully:")
    print(f"  Buildings:  {len(model.by_type('IfcBuilding'))}")
    print(f"  Storeys:    {len(model.by_type('IfcBuildingStorey'))}")
    print(f"  Spaces:     {len(model.by_type('IfcSpace'))}")
    print(f"  Zones:      {len(model.by_type('IfcZone'))}")
    print(f"  Walls:      {len(model.by_type('IfcWall'))}")
    print(f"  Slabs:      {len(model.by_type('IfcSlab'))}")
    print(f"  Doors:      {len(model.by_type('IfcDoor'))}")
    print(f"\n  Output: {args.output}")
    print(f"  Open in BIMvision, BlenderBIM, or https://openifcviewer.com/")


if __name__ == "__main__":
    main()
