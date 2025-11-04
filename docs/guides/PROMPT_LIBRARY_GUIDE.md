# Dyslexic AI Prompt Library Guide

## Overview

The Dyslexic AI Prompt Library is a comprehensive collection of over 100 carefully crafted prompts designed specifically for individuals with dyslexia, their families, educators, and professionals. These prompts are based on real-world questions and challenges faced by the dyslexic community.

## What's Inside

### 12 Categories of Prompts

1. **Reading Struggles** - Help with comprehension, speed, anxiety
2. **Writing Challenges** - Spelling, organization, professional writing
3. **Organization & Executive Function** - Time management, task completion, memory
4. **Confidence & Self-Esteem** - Overcoming imposter syndrome, building confidence
5. **Social & Disclosure** - When and how to tell others about dyslexia
6. **Accommodations & Advocacy** - Requesting and securing support at school/work
7. **Tools & Strategies** - Finding and using assistive technology
8. **Understanding Dyslexia** - Learning about dyslexia itself
9. **Parent Prompts** - Supporting dyslexic children
10. **Student Prompts** - School-specific challenges
11. **Professional/Adult Prompts** - Workplace challenges
12. **Teacher/Educator Prompts** - Teaching dyslexic students effectively

### Two Types of Prompts

- **Strategic Prompts** 🎯 - Action-oriented, problem-solving prompts that help you DO something
  - Example: "Help me organize my essay/story/report"

- **Socratic Prompts** 🧠 - Understanding-focused prompts that help you LEARN something
  - Example: "Why do I skip words or read sentences out of order?"

## Getting Started

### Installation

The prompt library is included with the Dyslexic AI system:

```python
from src.prompts import PromptManager

# Initialize the prompt manager
manager = PromptManager()
```

### Basic Usage

#### 1. Browse All Prompts

```python
# Get all available prompts
all_prompts = manager.get_all_prompts()

# See how many prompts are available
print(f"Total prompts: {len(manager)}")
```

#### 2. Search by User Type

```python
# For students
student_prompts = manager.get_prompts_by_user_type("Students")

# For parents
parent_prompts = manager.get_prompts_by_user_type("Parents")

# For professionals
professional_prompts = manager.get_prompts_by_user_type("Professionals")

# For teachers
teacher_prompts = manager.get_prompts_by_user_type("Teachers")
```

#### 3. Browse by Category

```python
# Get all categories
categories = manager.get_all_categories()
print("Available categories:", categories)

# Get prompts from a specific category
reading_prompts = manager.get_prompts_by_category("Reading Struggles")
writing_prompts = manager.get_prompts_by_category("Writing Challenges")
```

#### 4. Filter by Prompt Type

```python
# Get all strategic (action) prompts
strategic_prompts = manager.get_prompts_by_type("Strategic")

# Get all socratic (understanding) prompts
socratic_prompts = manager.get_prompts_by_type("Socratic")
```

#### 5. Search by Tags

```python
# Find prompts related to specific topics
reading_tagged = manager.get_prompts_by_tag("#Reading")
confidence_tagged = manager.get_prompts_by_tag("#Confidence")
adhd_related = manager.get_prompts_by_tag("#ADHD")
```

#### 6. Advanced Search

```python
# Combine multiple filters
results = manager.search_prompts(
    user_type="Students",
    prompt_type="Strategic",
    category="Writing Challenges",
    tags=["#Organization"],
    search_term="essay",
    limit=10
)
```

#### 7. Get a Specific Prompt

```python
# Get a prompt by its ID
prompt = manager.get_prompt("read_no_remember")

# View prompt details
print(f"Title: {prompt.title}")
print(f"When to use: {prompt.when_to_use}")
print(f"Full prompt: {prompt.full_prompt}")
```

#### 8. Use a Prompt Template

```python
# Get a prompt
prompt = manager.get_prompt("break_down_text")

# See what placeholders it needs
placeholders = prompt.get_placeholders()
print(f"This prompt needs: {placeholders}")

# Fill in the template
filled_prompt = prompt.fill_template(
    text_type="academic paper",
    paste="[Your text here...]"
)

# Use the filled prompt with your AI model
response = your_ai_model.generate(filled_prompt)
```

## Practical Examples

### Example 1: Student Needs Help with Reading

```python
from src.prompts import PromptManager

manager = PromptManager()

# Find prompts for students with reading issues
prompts = manager.search_prompts(
    user_type="Students",
    category="Reading Struggles",
    prompt_type="Strategic"
)

# Display options
for i, prompt in enumerate(prompts, 1):
    print(f"{i}. {prompt.title}")
    print(f"   Use when: {prompt.when_to_use}\n")

# User selects: "I read the whole page but don't remember anything"
selected = prompts[0]

# Fill in the template
filled = selected.fill_template(
    number="10",
    material_type="biology textbook",
    paste="[Chapter 3: Cell Division...]"
)

# Track usage
manager.record_usage(selected.id)
```

### Example 2: Parent Seeking School Advocacy Help

```python
# Search for parent-specific advocacy prompts
prompts = manager.search_prompts(
    user_type="Parents",
    tags=["#Advocacy", "#School"]
)

# Find the IEP meeting preparation prompt
iep_prompt = manager.get_prompt("prepare_iep_meeting")

# Fill it in with specifics
filled = iep_prompt.fill_template(
    date="March 15th",
    specific_support="extended time on tests and audiobook access"
)
```

### Example 3: Professional Needs to Write an Email

```python
# Find professional writing prompts
prompt = manager.get_prompt("crucial_email")

# Use the template
filled = prompt.fill_template(
    recipient="my supervisor",
    topic="requesting accommodations for dyslexia"
)

# Send to AI for help
```

### Example 4: Teacher Wants to Make Lessons Accessible

```python
# Get teacher-specific prompts
teacher_prompts = manager.search_prompts(
    user_type="Teachers",
    prompt_type="Strategic"
)

# Find how to create accessible materials
accessible_prompt = manager.get_prompt("create_accessible_materials")

# Fill in details
filled = accessible_prompt.fill_template(
    materials="worksheets",
    describe="math word problems for 5th grade"
)
```

## Understanding Prompt Metadata

Each prompt includes rich metadata:

```python
prompt = manager.get_prompt("feel_stupid")

# Basic info
print(prompt.title)           # "😞 I feel stupid but I know I'm not..."
print(prompt.id)              # "feel_stupid"
print(prompt.category)        # "Confidence & Self-Esteem"

# Usage info
print(prompt.user_type)       # ["Students", "Professionals", "General"]
print(prompt.prompt_type)     # "Socratic"
print(prompt.when_to_use)     # "You're struggling with imposter syndrome..."

# The actual prompt
print(prompt.full_prompt)     # "I'm intelligent but because of dyslexia..."

# Tags for filtering
print(prompt.tags)            # ["#Confidence", "#Mental-Health", ...]

# Usage statistics
print(prompt.uses)            # Number of times used
print(prompt.verified)        # True/False - expert verified
```

## Advanced Features

### Get Popular Prompts

```python
# Find the most-used prompts
popular = manager.get_popular_prompts(limit=10)

for prompt in popular:
    print(f"{prompt.title} - Used {prompt.uses} times")
```

### Library Statistics

```python
# Get comprehensive statistics
stats = manager.get_statistics()

print(f"Total prompts: {stats['total_prompts']}")
print(f"Total uses: {stats['total_uses']}")
print(f"Categories: {stats['categories']}")
print(f"Prompts by category: {stats['prompts_by_category']}")
print(f"Strategic vs Socratic: {stats['prompts_by_type']}")
```

### Export Prompts

```python
# Export all student prompts to a file
manager.export_prompts(
    output_path="./student_prompts.json",
    user_type="Students"
)

# Export a specific category
manager.export_prompts(
    output_path="./reading_prompts.json",
    category="Reading Struggles"
)
```

### Browse All Tags

```python
# See all available tags
all_tags = manager.get_all_tags()
print("Available tags:", all_tags)

# See all user types
user_types = manager.get_all_user_types()
print("User types:", user_types)
```

## Integration with Dyslexic AI System

### Using Prompts in Your Application

```python
from src.prompts import PromptManager
from src.core.model_integration import ModelIntegrationManager

# Initialize managers
prompt_mgr = PromptManager()
model_mgr = ModelIntegrationManager()

# User selects a prompt
prompt = prompt_mgr.get_prompt("ideas_to_paper")

# Fill in user's specific details
filled = prompt.fill_template(
    type="email",
    explain="I need to tell my team about the project delay..."
)

# Send to AI model
response = model_mgr.process_request(filled)

# Track usage
prompt_mgr.record_usage(prompt.id)
```

### Building a Prompt Selector UI

```python
def display_prompt_menu():
    """Interactive prompt selector"""
    manager = PromptManager()

    # Get user type
    print("Who are you?")
    print("1. Student")
    print("2. Parent")
    print("3. Professional")
    print("4. Teacher")

    user_types = {
        "1": "Students",
        "2": "Parents",
        "3": "Professionals",
        "4": "Teachers"
    }

    choice = input("Select: ")
    user_type = user_types.get(choice, "General")

    # Get prompts for this user
    prompts = manager.get_prompts_by_user_type(user_type)

    # Display by category
    categories = {}
    for prompt in prompts:
        if prompt.category not in categories:
            categories[prompt.category] = []
        categories[prompt.category].append(prompt)

    # Show categories
    print(f"\nAvailable categories for {user_type}:")
    for i, category in enumerate(categories.keys(), 1):
        count = len(categories[category])
        print(f"{i}. {category} ({count} prompts)")

    # ... continue with selection logic
```

## Tips for Using the Library

### 1. **Start with Your Role**
   - Filter by user type first to see prompts relevant to you
   - Students, Parents, Teachers, and Professionals each have specialized prompts

### 2. **Use Categories to Navigate**
   - Categories group prompts by topic area
   - Great for exploring related prompts

### 3. **Search When You Know What You Need**
   - Use search terms to find specific issues
   - Combine filters for precise results

### 4. **Understand Prompt Types**
   - **Strategic** = You want to DO something (write, organize, solve)
   - **Socratic** = You want to UNDERSTAND something (why, how, what)

### 5. **Fill in Placeholders Carefully**
   - Prompts contain placeholders like [topic], [date], [material]
   - Replace these with your specific details for best results

### 6. **Track What Works**
   - Usage statistics help identify the most helpful prompts
   - Popular prompts often work well for similar situations

## Troubleshooting

### Prompt Not Found

```python
prompt = manager.get_prompt("unknown_id")
if prompt is None:
    print("Prompt not found. Check the ID.")
    # Browse available prompts
    all_ids = [p.id for p in manager.get_all_prompts()]
    print("Available IDs:", all_ids)
```

### No Results from Search

```python
results = manager.search_prompts(
    user_type="Students",
    category="Reading Struggles"
)

if not results:
    print("No prompts found. Try:")
    print("- Different user type")
    print("- Different category")
    print("- Fewer filters")
```

### Finding the Right Prompt

```python
# If you're not sure what you need, search by description
results = manager.search_prompts(
    search_term="organize"  # Searches title, description, and prompt text
)

# Or browse tags
tags = manager.get_all_tags()
print("Available topics:", tags)
```

## Configuration

The prompt library can be configured via `config/prompts.yaml`:

- Library path
- Default filters
- Usage tracking
- Display settings
- Analytics
- Custom prompts
- Integration settings

See `config/prompts.yaml` for full configuration options.

## API Reference

### PromptManager

- `get_prompt(id)` - Get specific prompt by ID
- `get_all_prompts()` - Get all prompts
- `get_prompts_by_category(category)` - Filter by category
- `get_prompts_by_user_type(user_type)` - Filter by user type
- `get_prompts_by_type(prompt_type)` - Filter by Strategic/Socratic
- `get_prompts_by_tag(tag)` - Filter by tag
- `search_prompts(**filters)` - Advanced search with multiple filters
- `get_popular_prompts(limit)` - Most-used prompts
- `record_usage(prompt_id)` - Track prompt usage
- `get_statistics()` - Library statistics
- `export_prompts(path, **filters)` - Export prompts to file

### PromptTemplate

- `fill_template(**kwargs)` - Fill prompt with your details
- `get_placeholders()` - See what placeholders are needed
- `matches_filter(**filters)` - Check if prompt matches criteria
- `increment_usage()` - Track usage
- `to_dict()` - Convert to dictionary

## Support & Feedback

For questions, issues, or to suggest new prompts:

1. Check existing prompts with `search_prompts()`
2. Review documentation
3. Open an issue on the project repository
4. Contribute your own prompts via pull request

## Version

Current Library Version: **1.0.0**
Last Updated: **2025-11-04**
Total Prompts: **107**
