# Dyslexic AI Prompt Library

A comprehensive collection of 107+ prompts designed specifically for the dyslexic community, their families, educators, and support professionals.

## Quick Start

```python
from src.prompts import PromptManager

# Initialize the manager
manager = PromptManager()

# Get a prompt
prompt = manager.get_prompt("read_no_remember")

# Use it
filled_prompt = prompt.fill_template(
    number="5",
    material_type="textbook",
    paste="Your text here..."
)
```

## What's Inside

- **107 Prompts** across 12 categories
- **Strategic Prompts** - Action-oriented problem solving
- **Socratic Prompts** - Understanding and exploration
- **5 User Types** - Students, Parents, Professionals, Teachers, General
- **Rich Metadata** - Tags, categories, usage tracking

## Structure

```
src/prompts/
├── __init__.py                      # Module exports
├── prompt_manager.py                # Main manager class
├── prompt_templates.py              # Template classes
├── library/
│   └── dyslexia_prompt_library.json # 107 prompts
└── README.md                        # This file
```

## Categories

1. Reading Struggles
2. Writing Challenges
3. Organization & Executive Function
4. Confidence & Self-Esteem
5. Social & Disclosure
6. Accommodations & Advocacy
7. Tools & Strategies
8. Understanding Dyslexia
9. Parent Prompts
10. Student Prompts
11. Professional/Adult Prompts
12. Teacher/Educator Prompts

## Features

- 🔍 **Advanced Search** - Filter by user type, category, tags, keywords
- 📊 **Usage Tracking** - Track which prompts are most helpful
- 🎯 **Smart Matching** - Find the right prompt for your situation
- 📝 **Template System** - Easy placeholder replacement
- 📤 **Export** - Export filtered prompts to JSON
- 📈 **Analytics** - Library statistics and insights

## Examples

### For Students

```python
# Find help with reading assignments
prompts = manager.search_prompts(
    user_type="Students",
    category="Reading Struggles"
)
```

### For Parents

```python
# Get IEP meeting preparation help
prompt = manager.get_prompt("prepare_iep_meeting")
filled = prompt.fill_template(date="March 15", specific_support="extended time")
```

### For Professionals

```python
# Write a professional email
prompt = manager.get_prompt("crucial_email")
filled = prompt.fill_template(recipient="boss", topic="project update")
```

### For Teachers

```python
# Make lessons accessible
prompts = manager.search_prompts(
    user_type="Teachers",
    tags=["#Accessibility"]
)
```

## Documentation

Full documentation available at: `docs/guides/PROMPT_LIBRARY_GUIDE.md`

## Configuration

Configure via `config/prompts.yaml`:
- Library settings
- Default filters
- Analytics
- Custom prompts
- Integration options

## API Overview

```python
manager = PromptManager()

# Browse
manager.get_all_prompts()
manager.get_all_categories()
manager.get_all_tags()

# Search
manager.get_prompt(id)
manager.get_prompts_by_category(category)
manager.get_prompts_by_user_type(user_type)
manager.search_prompts(**filters)

# Analytics
manager.get_popular_prompts(limit=10)
manager.get_statistics()
manager.record_usage(prompt_id)

# Export
manager.export_prompts(path, **filters)
```

## Contributing

To add new prompts:

1. Add to `library/dyslexia_prompt_library.json`
2. Follow the existing structure
3. Include all metadata
4. Test with `PromptManager`
5. Update documentation

## License

Part of the Dyslexic AI project

## Version

**1.0.0** - 2025-11-04 - Initial release with 107 prompts
