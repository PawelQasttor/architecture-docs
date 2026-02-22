#!/usr/bin/env python3
"""
IFC to Markdown Converter
Extracts building element data from IFC files and generates markdown documentation

Usage:
    python ifc-to-markdown.py <ifc_file> [options]

Examples:
    python ifc-to-markdown.py building.ifc
    python ifc-to-markdown.py building.ifc --entity IfcWall
    python ifc-to-markdown.py building.ifc --output ./docs/
"""

import sys
import os
import argparse
import yaml
from datetime import datetime
from pathlib import Path

try:
    import ifcopenshell
    import ifcopenshell.util.element
    import ifcopenshell.util.shape
except ImportError:
    print("ERROR: ifcopenshell not installed")
    print("Install with: pip install ifcopenshell")
    sys.exit(1)


class IFCToMarkdown:
    """Convert IFC building elements to markdown documentation"""

    def __init__(self, config_path="config.yaml"):
        """Initialize converter with configuration"""
        self.config = self.load_config(config_path)
        self.ifc_file = None

    def load_config(self, config_path):
        """Load configuration from YAML file"""
        if not os.path.exists(config_path):
            print(f"Warning: Config file not found: {config_path}")
            return self.default_config()

        with open(config_path, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    def default_config(self):
        """Return default configuration if config file not found"""
        return {
            'entity_mappings': {
                'IfcWall': {
                    'document_type': 'element_specification',
                    'extract_properties': [
                        'Pset_WallCommon.LoadBearing',
                        'Pset_WallCommon.IsExternal',
                        'Pset_WallCommon.FireRating',
                        'Pset_WallCommon.ThermalTransmittance'
                    ]
                }
            },
            'output': {
                'output_directory': './output/',
                'filename_pattern': '{entity_type}-{reference}.md'
            }
        }

    def open_ifc(self, ifc_path):
        """Open IFC file"""
        print(f"Opening IFC file: {ifc_path}")
        try:
            self.ifc_file = ifcopenshell.open(ifc_path)
            print(f"✓ IFC file opened successfully")
            print(f"  IFC Schema: {self.ifc_file.schema}")
            return True
        except Exception as e:
            print(f"✗ Error opening IFC file: {e}")
            return False

    def get_elements_by_type(self, entity_type):
        """Get all elements of a specific IFC entity type"""
        if not self.ifc_file:
            return []

        elements = self.ifc_file.by_type(entity_type)
        print(f"Found {len(elements)} {entity_type} elements")
        return elements

    def extract_properties(self, element):
        """Extract property sets from an IFC element"""
        try:
            psets = ifcopenshell.util.element.get_psets(element)
            return psets
        except Exception as e:
            print(f"Warning: Could not extract properties: {e}")
            return {}

    def extract_quantities(self, element):
        """Extract quantity sets from an IFC element"""
        try:
            # Get quantity sets (similar to psets)
            qtos = {}
            for definition in element.IsDefinedBy:
                if definition.is_a('IfcRelDefinesByProperties'):
                    if definition.RelatingPropertyDefinition.is_a('IfcElementQuantity'):
                        qto_name = definition.RelatingPropertyDefinition.Name
                        qtos[qto_name] = {}
                        for quantity in definition.RelatingPropertyDefinition.Quantities:
                            qtos[qto_name][quantity.Name] = {
                                'value': quantity[3],  # The actual value
                                'unit': quantity.Unit.Name if hasattr(quantity, 'Unit') and quantity.Unit else None
                            }
            return qtos
        except Exception as e:
            print(f"Warning: Could not extract quantities: {e}")
            return {}

    def extract_material_layers(self, element):
        """Extract material layer information"""
        try:
            layers = []
            material = ifcopenshell.util.element.get_material(element)

            if material and hasattr(material, 'MaterialLayers'):
                for i, layer in enumerate(material.MaterialLayers):
                    layer_info = {
                        'number': i + 1,
                        'material': layer.Material.Name if layer.Material else 'Unknown',
                        'thickness': layer.LayerThickness if hasattr(layer, 'LayerThickness') else None,
                        'category': layer.Category if hasattr(layer, 'Category') else None
                    }
                    layers.append(layer_info)

            return layers
        except Exception as e:
            print(f"Warning: Could not extract material layers: {e}")
            return []

    def generate_frontmatter(self, element, entity_type):
        """Generate YAML frontmatter for markdown document"""
        psets = self.extract_properties(element)

        # Extract basic info
        frontmatter = {
            'documentType': 'element_specification',
            'elementType': entity_type.replace('Ifc', '').lower(),
            'ifcMapping': {
                'ifcEntity': entity_type,
                'objectType': element.ObjectType if hasattr(element, 'ObjectType') else None,
                'globalId': element.GlobalId,
            },
            'bimLOD': 'LOD_400',
            'version': '1.0.0',
            'lastReviewed': datetime.now().strftime('%Y-%m-%d'),
            'generatedFrom': 'IFC Export'
        }

        # Add properties if available
        if 'Pset_WallCommon' in psets or 'Pset_SlabCommon' in psets:
            pset_common = psets.get('Pset_WallCommon') or psets.get('Pset_SlabCommon')

            # Thermal performance
            if 'ThermalTransmittance' in pset_common:
                frontmatter['thermalPerformance'] = {
                    'calculatedUValue': pset_common['ThermalTransmittance'],
                    'unit': 'W/(m²·K)'
                }

            # Fire resistance
            if 'FireRating' in pset_common:
                frontmatter['fireResistance'] = {
                    'designRating': pset_common['FireRating']
                }

        return frontmatter

    def generate_markdown_content(self, element, entity_type):
        """Generate markdown content for an element"""
        psets = self.extract_properties(element)
        qtos = self.extract_quantities(element)
        layers = self.extract_material_layers(element)

        # Get element name or type
        element_name = element.Name if element.Name else f"{entity_type} Element"

        content = f"# {element_name}\n\n"

        # IFC Information section
        content += "## IFC Information\n\n"
        content += f"**Entity:** `{entity_type}`\n"
        content += f"**Global ID:** {element.GlobalId}\n"
        if hasattr(element, 'ObjectType') and element.ObjectType:
            content += f"**Object Type:** {element.ObjectType}\n"
        content += "\n"

        # Properties section
        if psets:
            content += "## Properties\n\n"
            for pset_name, properties in psets.items():
                if properties:  # Only show non-empty property sets
                    content += f"### {pset_name}\n\n"
                    content += "| Property | Value | Unit |\n"
                    content += "|----------|-------|------|\n"

                    for prop_name, prop_value in properties.items():
                        # Format value
                        if isinstance(prop_value, bool):
                            value_str = "Yes" if prop_value else "No"
                        elif isinstance(prop_value, float):
                            value_str = f"{prop_value:.2f}"
                        else:
                            value_str = str(prop_value) if prop_value else "-"

                        content += f"| {prop_name} | {value_str} | - |\n"

                    content += "\n"

        # Quantities section
        if qtos:
            content += "## Quantities\n\n"
            for qto_name, quantities in qtos.items():
                if quantities:
                    content += f"### {qto_name}\n\n"
                    content += "| Quantity | Value | Unit |\n"
                    content += "|----------|-------|------|\n"

                    for qty_name, qty_data in quantities.items():
                        value = qty_data.get('value', '-')
                        unit = qty_data.get('unit', '-')
                        if isinstance(value, float):
                            value = f"{value:.2f}"
                        content += f"| {qty_name} | {value} | {unit} |\n"

                    content += "\n"

        # Material layers section
        if layers:
            content += "## Material Layers\n\n"
            content += "| Layer | Material | Thickness |\n"
            content += "|-------|----------|----------|\n"

            for layer in layers:
                layer_num = layer['number']
                material = layer['material']
                thickness = f"{layer['thickness']} mm" if layer['thickness'] else "-"
                content += f"| {layer_num} | {material} | {thickness} |\n"

            content += "\n"

        # Add compliance section placeholder
        content += "## Regulatory Compliance\n\n"
        content += "*To be completed based on project requirements*\n\n"
        content += "- [ ] Verify thermal performance compliance\n"
        content += "- [ ] Verify fire safety compliance\n"
        content += "- [ ] Verify structural compliance\n\n"

        return content

    def save_markdown(self, frontmatter, content, output_path):
        """Save markdown file with frontmatter"""
        try:
            # Ensure directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            with open(output_path, 'w', encoding='utf-8') as f:
                # Write frontmatter
                f.write('---\n')
                yaml.dump(frontmatter, f, default_flow_style=False, allow_unicode=True)
                f.write('---\n\n')

                # Write content
                f.write(content)

            print(f"✓ Generated: {output_path}")
            return True

        except Exception as e:
            print(f"✗ Error saving file: {e}")
            return False

    def convert_element(self, element, entity_type, output_dir):
        """Convert a single IFC element to markdown"""
        # Generate frontmatter and content
        frontmatter = self.generate_frontmatter(element, entity_type)
        content = self.generate_markdown_content(element, entity_type)

        # Determine output filename
        reference = element.Name if element.Name else element.GlobalId[:8]
        filename = f"{entity_type.lower()}-{reference}.md"
        filename = filename.replace(' ', '-').replace('/', '-')

        output_path = os.path.join(output_dir, entity_type, filename)

        # Save markdown file
        return self.save_markdown(frontmatter, content, output_path)

    def convert_all(self, ifc_path, entity_types=None, output_dir='./output'):
        """Convert all elements of specified types to markdown"""
        if not self.open_ifc(ifc_path):
            return False

        # Default entity types if none specified
        if not entity_types:
            entity_types = ['IfcWall', 'IfcSlab', 'IfcWindow', 'IfcDoor']

        print(f"\nConverting elements to markdown...")
        print(f"Output directory: {output_dir}\n")

        total_converted = 0

        for entity_type in entity_types:
            elements = self.get_elements_by_type(entity_type)

            if not elements:
                print(f"No {entity_type} elements found\n")
                continue

            print(f"\nProcessing {entity_type}:")
            for i, element in enumerate(elements, 1):
                print(f"  [{i}/{len(elements)}] ", end='')
                if self.convert_element(element, entity_type, output_dir):
                    total_converted += 1

            print()

        print(f"\n{'='*50}")
        print(f"Conversion complete!")
        print(f"Total elements converted: {total_converted}")
        print(f"Output directory: {output_dir}")
        print(f"{'='*50}\n")

        return True


def main():
    """Main entry point"""
    parser = argparse.ArgumentParser(
        description='Convert IFC building elements to markdown documentation'
    )
    parser.add_argument('ifc_file', help='Path to IFC file')
    parser.add_argument('--entity', '-e', action='append',
                        help='IFC entity type to extract (can be specified multiple times)')
    parser.add_argument('--output', '-o', default='./output',
                        help='Output directory for markdown files')
    parser.add_argument('--config', '-c', default='config.yaml',
                        help='Path to configuration file')

    args = parser.parse_args()

    # Check if IFC file exists
    if not os.path.exists(args.ifc_file):
        print(f"Error: IFC file not found: {args.ifc_file}")
        sys.exit(1)

    # Initialize converter
    converter = IFCToMarkdown(args.config)

    # Convert
    success = converter.convert_all(
        args.ifc_file,
        entity_types=args.entity,
        output_dir=args.output
    )

    sys.exit(0 if success else 1)


if __name__ == '__main__':
    main()
