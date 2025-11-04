"""
Example usage of the Dyslexic AI Prompt Library

This file demonstrates various ways to use the prompt library
for different user types and scenarios.
"""

import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.prompts import PromptManager


def example_1_basic_usage():
    """Example 1: Basic usage - getting and using a prompt"""
    print("=" * 60)
    print("EXAMPLE 1: Basic Usage")
    print("=" * 60)

    # Initialize the manager
    manager = PromptManager()

    # Get a specific prompt by ID
    prompt = manager.get_prompt("read_no_remember")

    print(f"\nPrompt Title: {prompt.title}")
    print(f"Category: {prompt.category}")
    print(f"Type: {prompt.prompt_type}")
    print(f"\nWhen to use: {prompt.when_to_use}")

    # See what placeholders this prompt needs
    placeholders = prompt.get_placeholders()
    print(f"\nThis prompt needs these inputs: {placeholders}")

    # Fill in the template
    filled = prompt.fill_template(
        number="10",
        material_type="biology textbook on cells",
        paste="Cells are the basic units of life. They contain DNA..."
    )

    print(f"\nFilled prompt:\n{filled}")


def example_2_student_searching():
    """Example 2: Student searching for help with writing"""
    print("\n" + "=" * 60)
    print("EXAMPLE 2: Student Searching for Writing Help")
    print("=" * 60)

    manager = PromptManager()

    # Student wants help with writing
    results = manager.search_prompts(
        user_type="Students",
        category="Writing Challenges",
        prompt_type="Strategic"
    )

    print(f"\nFound {len(results)} prompts for students with writing challenges:\n")

    for i, prompt in enumerate(results, 1):
        print(f"{i}. {prompt.title}")
        print(f"   When to use: {prompt.when_to_use}")
        print(f"   Tags: {', '.join(prompt.tags)}\n")


def example_3_parent_advocacy():
    """Example 3: Parent needs help advocating for their child"""
    print("\n" + "=" * 60)
    print("EXAMPLE 3: Parent Advocacy")
    print("=" * 60)

    manager = PromptManager()

    # Find parent-specific advocacy prompts
    results = manager.search_prompts(
        user_type="Parents",
        tags=["#Advocacy", "#School"]
    )

    print(f"\nFound {len(results)} advocacy prompts for parents:\n")

    for prompt in results:
        print(f"• {prompt.title}")
        print(f"  {prompt.when_to_use}\n")

    # Use a specific prompt
    iep_prompt = manager.get_prompt("prepare_iep_meeting")
    if iep_prompt:
        print("\n--- Using IEP Meeting Preparation Prompt ---")
        filled = iep_prompt.fill_template(
            date="March 15th, 2025",
            specific_support="extended time on tests, text-to-speech software, and preferential seating"
        )
        print(f"\n{filled}")


def example_4_professional_email():
    """Example 4: Professional needs to write an important email"""
    print("\n" + "=" * 60)
    print("EXAMPLE 4: Professional Writing Email")
    print("=" * 60)

    manager = PromptManager()

    # Get the email writing prompt
    prompt = manager.get_prompt("crucial_email")

    print(f"Prompt: {prompt.title}")
    print(f"Type: {prompt.prompt_type}\n")

    # Professional fills it in
    filled = prompt.fill_template(
        recipient="my department head",
        topic="requesting accommodations for my dyslexia"
    )

    print(f"Filled prompt:\n{filled}")

    # Track that this prompt was used
    manager.record_usage("crucial_email")
    print(f"\n✓ Usage recorded (now used {prompt.uses + 1} times)")


def example_5_teacher_accessibility():
    """Example 5: Teacher making lessons accessible"""
    print("\n" + "=" * 60)
    print("EXAMPLE 5: Teacher Creating Accessible Materials")
    print("=" * 60)

    manager = PromptManager()

    # Find all teacher prompts related to accessibility
    results = manager.search_prompts(
        user_type="Teachers",
        tags=["#Accessibility"]
    )

    print(f"\nFound {len(results)} accessibility prompts for teachers:\n")

    for prompt in results:
        print(f"• {prompt.title}")

    # Use one
    prompt = manager.get_prompt("create_accessible_materials")
    if prompt:
        print(f"\n--- Using: {prompt.title} ---\n")
        filled = prompt.fill_template(
            materials="worksheets and reading assignments",
            describe="5th grade science unit on the solar system with vocabulary lists and comprehension questions"
        )
        print(filled)


def example_6_browsing_by_category():
    """Example 6: Browse all prompts in a category"""
    print("\n" + "=" * 60)
    print("EXAMPLE 6: Browsing by Category")
    print("=" * 60)

    manager = PromptManager()

    # Get all categories
    categories = manager.get_all_categories()
    print(f"\nAvailable categories ({len(categories)}):\n")

    for i, category in enumerate(categories, 1):
        prompts = manager.get_prompts_by_category(category)
        print(f"{i:2d}. {category:40s} ({len(prompts)} prompts)")

    # Browse a specific category
    print("\n--- Confidence & Self-Esteem Prompts ---\n")
    confidence_prompts = manager.get_prompts_by_category("Confidence Self Esteem")

    for prompt in confidence_prompts:
        print(f"• {prompt.title}")
        print(f"  Type: {prompt.prompt_type} | Users: {', '.join(prompt.user_type)}")


def example_7_popular_prompts():
    """Example 7: Find the most popular prompts"""
    print("\n" + "=" * 60)
    print("EXAMPLE 7: Most Popular Prompts")
    print("=" * 60)

    manager = PromptManager()

    # Get popular prompts
    popular = manager.get_popular_prompts(limit=5)

    print("\nTop 5 Most Used Prompts:\n")

    for i, prompt in enumerate(popular, 1):
        print(f"{i}. {prompt.title}")
        print(f"   Used: {prompt.uses} times")
        print(f"   Category: {prompt.category}")
        print(f"   Users: {', '.join(prompt.user_type)}\n")


def example_8_statistics():
    """Example 8: Get library statistics"""
    print("\n" + "=" * 60)
    print("EXAMPLE 8: Library Statistics")
    print("=" * 60)

    manager = PromptManager()

    stats = manager.get_statistics()

    print(f"\n📊 Prompt Library Statistics\n")
    print(f"Version: {stats['version']}")
    print(f"Last Updated: {stats['last_updated']}")
    print(f"Total Prompts: {stats['total_prompts']}")
    print(f"Total Uses: {stats['total_uses']}")
    print(f"Categories: {stats['categories']}")
    print(f"Total Tags: {stats['total_tags']}")
    print(f"User Types: {stats['user_types']}")

    print(f"\n--- Prompts by Category ---\n")
    for category, count in stats['prompts_by_category'].items():
        print(f"{category:40s} {count:3d} prompts")

    print(f"\n--- Prompts by Type ---\n")
    for ptype, count in stats['prompts_by_type'].items():
        print(f"{ptype:15s} {count:3d} prompts")


def example_9_advanced_search():
    """Example 9: Advanced search with multiple filters"""
    print("\n" + "=" * 60)
    print("EXAMPLE 9: Advanced Search")
    print("=" * 60)

    manager = PromptManager()

    # Complex search: Students who need strategic help with reading and organization
    results = manager.search_prompts(
        user_type="Students",
        prompt_type="Strategic",
        tags=["#Reading", "#Organization"],
        limit=5
    )

    print("\nSearching for:")
    print("  User Type: Students")
    print("  Prompt Type: Strategic")
    print("  Tags: #Reading OR #Organization")
    print(f"\nFound {len(results)} matching prompts:\n")

    for prompt in results:
        print(f"• {prompt.title}")
        print(f"  Category: {prompt.category}")
        print(f"  Tags: {', '.join(prompt.tags)}\n")


def example_10_export():
    """Example 10: Export prompts to a file"""
    print("\n" + "=" * 60)
    print("EXAMPLE 10: Export Prompts")
    print("=" * 60)

    manager = PromptManager()

    # Export all student prompts
    output_file = "/tmp/student_prompts_export.json"

    manager.export_prompts(
        output_path=output_file,
        user_type="Students"
    )

    print(f"\n✓ Exported student prompts to: {output_file}")

    # Export a specific category
    output_file2 = "/tmp/reading_prompts_export.json"

    manager.export_prompts(
        output_path=output_file2,
        category="Reading Struggles"
    )

    print(f"✓ Exported reading prompts to: {output_file2}")


def example_11_tags_and_types():
    """Example 11: Explore all tags and user types"""
    print("\n" + "=" * 60)
    print("EXAMPLE 11: Exploring Tags and User Types")
    print("=" * 60)

    manager = PromptManager()

    # Get all tags
    all_tags = manager.get_all_tags()
    print(f"\nAll Tags ({len(all_tags)}):")
    print(", ".join(all_tags))

    # Get all user types
    user_types = manager.get_all_user_types()
    print(f"\n\nUser Types ({len(user_types)}):")
    for user_type in user_types:
        count = len(manager.get_prompts_by_user_type(user_type))
        print(f"  • {user_type:15s} - {count} prompts")

    # Show prompts for each tag
    print("\n\nMost Common Tags:\n")
    tag_counts = {}
    for prompt in manager.get_all_prompts():
        for tag in prompt.tags:
            tag_counts[tag] = tag_counts.get(tag, 0) + 1

    # Sort by frequency
    sorted_tags = sorted(tag_counts.items(), key=lambda x: x[1], reverse=True)

    for tag, count in sorted_tags[:10]:
        print(f"  {tag:30s} {count:3d} prompts")


def run_all_examples():
    """Run all examples"""
    print("\n" + "=" * 60)
    print(" DYSLEXIC AI PROMPT LIBRARY - USAGE EXAMPLES")
    print("=" * 60)

    examples = [
        example_1_basic_usage,
        example_2_student_searching,
        example_3_parent_advocacy,
        example_4_professional_email,
        example_5_teacher_accessibility,
        example_6_browsing_by_category,
        example_7_popular_prompts,
        example_8_statistics,
        example_9_advanced_search,
        example_10_export,
        example_11_tags_and_types
    ]

    for example_func in examples:
        try:
            example_func()
        except Exception as e:
            print(f"\n❌ Error in {example_func.__name__}: {e}")

    print("\n" + "=" * 60)
    print("Examples complete!")
    print("=" * 60)


if __name__ == "__main__":
    # Run all examples
    run_all_examples()

    # Or run individual examples:
    # example_1_basic_usage()
    # example_2_student_searching()
    # example_8_statistics()
