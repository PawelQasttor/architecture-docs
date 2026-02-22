#!/usr/bin/env python3
"""
SBM-to-IFC Generator
Converts compiled SBM JSON (sbm.json) to a valid IFC4 file.

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


def load_sbm(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def create_ifc_model(sbm):
    """Create an IFC4 model from SBM JSON data."""
    project_name = sbm.get("project", {}).get("name", "SBM Project")

    # Create blank IFC4 model
    model = ifcopenshell.api.run("project.create_file", version="IFC4")

    # Project
    project = ifcopenshell.api.run(
        "root.create_entity", model, ifc_class="IfcProject", name=project_name
    )

    # Units - metric (meters, m², m³)
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

    # Create spaces with geometry
    ifc_spaces = {}
    x_offset = 0.0

    for space_data in sbm.get("entities", {}).get("spaces", []):
        space_id = space_data["id"]
        space_name = space_data.get("spaceName", space_id)
        area = space_data.get("designArea", 10.0)
        height = space_data.get("designHeight", 2.7)
        global_id = space_data.get("ifcMapping", {}).get("globalId")

        # Create IfcSpace
        ifc_space = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcSpace", name=space_name
        )

        # Set globalId if available
        if global_id:
            ifc_space.GlobalId = global_id

        ifc_space.LongName = space_name
        ifc_space.CompositionType = "ELEMENT"

        # Geometry: extruded rectangle from area
        side = math.sqrt(area)

        # Place at offset
        matrix = [
            [1.0, 0.0, 0.0, x_offset],
            [0.0, 1.0, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0],
        ]
        ifcopenshell.api.run(
            "geometry.edit_object_placement", model, product=ifc_space, matrix=matrix
        )

        # Create extruded rectangle representation
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

        # Assign to storey (spaces use aggregation, not containment)
        bid = space_data.get("buildingId")
        lid = space_data.get("levelId")
        storey_key = (bid, lid)
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
        x_offset += side + 0.5  # gap between spaces

    # Create zones
    for zone_data in sbm.get("entities", {}).get("zones", []):
        zone_id = zone_data["id"]
        zone_name = zone_data.get("zoneName", zone_id)
        global_id = zone_data.get("ifcMapping", {}).get("globalId")

        ifc_zone = ifcopenshell.api.run(
            "root.create_entity", model, ifc_class="IfcZone", name=zone_name
        )
        if global_id:
            ifc_zone.GlobalId = global_id

        # Assign member spaces to zone
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

        # Property set: Pset_SBM_Zone
        zone_props = {
            "SBM_ID": zone_id,
            "SBM_ZoneName": zone_name,
            "SBM_ZoneType": zone_data.get("zoneType", ""),
            "SBM_SpaceIds": "; ".join(zone_data.get("spaceIds", [])),
        }

        # Add zone-specific properties
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

    print("Generating IFC4 model...")
    model = create_ifc_model(sbm)

    print(f"Writing IFC file to {args.output}...")
    model.write(args.output)

    # Summary
    ifc_spaces = model.by_type("IfcSpace")
    ifc_zones = model.by_type("IfcZone")
    ifc_storeys = model.by_type("IfcBuildingStorey")
    ifc_buildings = model.by_type("IfcBuilding")

    print(f"\n  IFC file generated successfully:")
    print(f"  Buildings:  {len(ifc_buildings)}")
    print(f"  Storeys:    {len(ifc_storeys)}")
    print(f"  Spaces:     {len(ifc_spaces)}")
    print(f"  Zones:      {len(ifc_zones)}")
    print(f"\n  Output: {args.output}")
    print(f"  Open in BIMvision, BlenderBIM, or https://openifcviewer.com/")


if __name__ == "__main__":
    main()
