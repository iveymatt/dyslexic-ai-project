# Brand Colors

## Core Brand Palette

This document defines the official brand colors for the Dyslexic AI project, designed specifically for neurodivergent users with accessibility in mind.

### Primary Colors

**Pink**
- Hex: `#FF66CC`
- RGB: `rgb(255, 102, 204)`
- Usage: Primary brand color, main UI elements, headings

**Baby Blue**
- Hex: `#66CCFF`
- RGB: `rgb(102, 204, 255)`
- Usage: Secondary brand color, supporting UI elements, links

### Accent Colors

**Neon Green**
- Hex: `#19EF22`
- RGB: `rgb(25, 239, 34)`
- Usage: Occasional highlight/accent alongside pink and baby blue, success states

**Orange (Highlight)**
- Hex: `#FF5C00`
- RGB: `rgb(255, 92, 0)`
- Usage: Important highlights, call-to-action elements, warnings

## Color Schemes

The application provides multiple color schemes to accommodate different user preferences and accessibility needs:

### Brand Pink Light
- Background: `#FFFFFF` (White)
- Text: `#000000` (Black)
- Primary: `#FF66CC` (Pink)
- Secondary: `#66CCFF` (Baby Blue)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

### Brand Blue Light
- Background: `#FFFFFF` (White)
- Text: `#000000` (Black)
- Primary: `#66CCFF` (Baby Blue)
- Secondary: `#FF66CC` (Pink)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

### Brand Pink Dark
- Background: `#1A1A1A` (Dark Gray)
- Text: `#FFFFFF` (White)
- Primary: `#FF66CC` (Pink)
- Secondary: `#66CCFF` (Baby Blue)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

### Brand Blue Dark
- Background: `#1A1A1A` (Dark Gray)
- Text: `#FFFFFF` (White)
- Primary: `#66CCFF` (Baby Blue)
- Secondary: `#FF66CC` (Pink)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

### High Contrast Pink
- Background: `#000000` (Black)
- Text: `#FFFFFF` (White)
- Primary: `#FF66CC` (Pink)
- Secondary: `#66CCFF` (Baby Blue)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

### High Contrast Blue
- Background: `#FFFFFF` (White)
- Text: `#000000` (Black)
- Primary: `#66CCFF` (Baby Blue)
- Secondary: `#FF66CC` (Pink)
- Accent: `#19EF22` (Neon Green)
- Highlight: `#FF5C00` (Orange)

## Accessibility Guidelines

All color combinations have been designed to meet WCAG AA standards:
- Minimum contrast ratio: 4.5:1
- Text remains readable against all background colors
- Color is not the only means of conveying information

## Implementation

Color schemes are defined in `/config/default_config.yaml.rtf` under the `accessibility.color_schemes` section. Users can select their preferred color scheme through their accessibility preferences.

## Usage Examples

```python
# Example: Setting user preferences
preferences = {
    "color_scheme": "Brand Pink Light",  # or any other scheme name
    "font_family": "OpenDyslexic",
    "line_spacing": 1.5
}
```

## Notes for Developers

- **Pink** and **Baby Blue** are the core brand colors and should be used prominently
- **Neon Green** should be used sparingly as an accent
- **Orange** is reserved for important highlights and attention-grabbing elements
- Always test color combinations for accessibility compliance
- Consider color blindness when designing UI elements
