"""
Unit tests for the Prompt Manager and Prompt Library
"""

import unittest
import sys
import os
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent.parent))

from src.prompts import PromptManager, PromptTemplate


class TestPromptManager(unittest.TestCase):
    """Test cases for PromptManager"""

    @classmethod
    def setUpClass(cls):
        """Set up test fixtures"""
        cls.manager = PromptManager()

    def test_initialization(self):
        """Test that manager initializes correctly"""
        self.assertIsNotNone(self.manager)
        self.assertGreater(len(self.manager), 0)

    def test_load_library(self):
        """Test that library loads successfully"""
        self.assertGreater(len(self.manager.prompts), 0)
        self.assertGreater(len(self.manager.categories), 0)
        self.assertIsNotNone(self.manager.metadata)

    def test_get_prompt_by_id(self):
        """Test retrieving a prompt by ID"""
        prompt = self.manager.get_prompt("read_no_remember")
        self.assertIsNotNone(prompt)
        self.assertEqual(prompt.id, "read_no_remember")
        self.assertIn("read", prompt.title.lower())

    def test_get_nonexistent_prompt(self):
        """Test that getting nonexistent prompt returns None"""
        prompt = self.manager.get_prompt("nonexistent_id_12345")
        self.assertIsNone(prompt)

    def test_get_all_prompts(self):
        """Test getting all prompts"""
        all_prompts = self.manager.get_all_prompts()
        self.assertIsInstance(all_prompts, list)
        self.assertGreater(len(all_prompts), 100)

    def test_get_prompts_by_category(self):
        """Test filtering by category"""
        reading_prompts = self.manager.get_prompts_by_category("Reading Struggles")
        self.assertIsInstance(reading_prompts, list)
        self.assertGreater(len(reading_prompts), 0)

        # Verify all returned prompts are from the correct category
        for prompt in reading_prompts:
            self.assertIn("Reading", prompt.category)

    def test_get_prompts_by_user_type(self):
        """Test filtering by user type"""
        student_prompts = self.manager.get_prompts_by_user_type("Students")
        self.assertIsInstance(student_prompts, list)
        self.assertGreater(len(student_prompts), 0)

        # Verify all returned prompts include the user type
        for prompt in student_prompts:
            self.assertIn("Students", prompt.user_type)

    def test_get_prompts_by_type(self):
        """Test filtering by prompt type"""
        strategic = self.manager.get_prompts_by_type("Strategic")
        socratic = self.manager.get_prompts_by_type("Socratic")

        self.assertGreater(len(strategic), 0)
        self.assertGreater(len(socratic), 0)

        # Verify types
        for prompt in strategic:
            self.assertEqual(prompt.prompt_type, "Strategic")

        for prompt in socratic:
            self.assertEqual(prompt.prompt_type, "Socratic")

    def test_get_prompts_by_tag(self):
        """Test filtering by tag"""
        reading_tagged = self.manager.get_prompts_by_tag("#Reading")
        self.assertIsInstance(reading_tagged, list)
        self.assertGreater(len(reading_tagged), 0)

        # Verify tag is present
        for prompt in reading_tagged:
            self.assertIn("#Reading", prompt.tags)

    def test_search_prompts_single_filter(self):
        """Test search with a single filter"""
        results = self.manager.search_prompts(user_type="Students")
        self.assertIsInstance(results, list)
        self.assertGreater(len(results), 0)

    def test_search_prompts_multiple_filters(self):
        """Test search with multiple filters"""
        results = self.manager.search_prompts(
            user_type="Students",
            prompt_type="Strategic",
            tags=["#Reading"]
        )
        self.assertIsInstance(results, list)

        # Verify all filters are applied
        for prompt in results:
            self.assertIn("Students", prompt.user_type)
            self.assertEqual(prompt.prompt_type, "Strategic")
            self.assertIn("#Reading", prompt.tags)

    def test_search_prompts_with_limit(self):
        """Test search with result limit"""
        results = self.manager.search_prompts(
            user_type="Students",
            limit=5
        )
        self.assertLessEqual(len(results), 5)

    def test_get_all_categories(self):
        """Test getting all categories"""
        categories = self.manager.get_all_categories()
        self.assertIsInstance(categories, list)
        self.assertGreater(len(categories), 10)

    def test_get_all_tags(self):
        """Test getting all tags"""
        tags = self.manager.get_all_tags()
        self.assertIsInstance(tags, list)
        self.assertGreater(len(tags), 10)

        # Verify tags start with #
        for tag in tags:
            self.assertTrue(tag.startswith('#'))

    def test_get_all_user_types(self):
        """Test getting all user types"""
        user_types = self.manager.get_all_user_types()
        self.assertIsInstance(user_types, list)
        self.assertIn("Students", user_types)
        self.assertIn("Parents", user_types)
        self.assertIn("Professionals", user_types)
        self.assertIn("Teachers", user_types)

    def test_get_statistics(self):
        """Test getting library statistics"""
        stats = self.manager.get_statistics()
        self.assertIsInstance(stats, dict)
        self.assertIn('total_prompts', stats)
        self.assertIn('categories', stats)
        self.assertIn('prompts_by_category', stats)
        self.assertIn('prompts_by_type', stats)
        self.assertGreater(stats['total_prompts'], 100)

    def test_record_usage(self):
        """Test recording prompt usage"""
        prompt = self.manager.get_prompt("read_no_remember")
        initial_uses = prompt.uses

        self.manager.record_usage("read_no_remember")

        # Usage should increment
        self.assertEqual(prompt.uses, initial_uses + 1)


class TestPromptTemplate(unittest.TestCase):
    """Test cases for PromptTemplate"""

    def setUp(self):
        """Set up test fixtures"""
        self.template = PromptTemplate(
            id="test_prompt",
            title="Test Prompt",
            user_type=["Students"],
            prompt_type="Strategic",
            when_to_use="Test scenario",
            full_prompt="Help me with [task] on [date]",
            tags=["#Test", "#Example"],
            category="Test Category"
        )

    def test_initialization(self):
        """Test prompt template initialization"""
        self.assertEqual(self.template.id, "test_prompt")
        self.assertEqual(self.template.title, "Test Prompt")
        self.assertEqual(self.template.prompt_type, "Strategic")

    def test_get_placeholders(self):
        """Test extracting placeholders from template"""
        placeholders = self.template.get_placeholders()
        self.assertIn("task", placeholders)
        self.assertIn("date", placeholders)

    def test_fill_template(self):
        """Test filling in template with values"""
        filled = self.template.fill_template(
            task="reading",
            date="Monday"
        )
        self.assertIn("reading", filled)
        self.assertIn("Monday", filled)
        self.assertNotIn("[task]", filled)
        self.assertNotIn("[date]", filled)

    def test_matches_filter_user_type(self):
        """Test filtering by user type"""
        self.assertTrue(self.template.matches_filter(user_type="Students"))
        self.assertFalse(self.template.matches_filter(user_type="Teachers"))

    def test_matches_filter_prompt_type(self):
        """Test filtering by prompt type"""
        self.assertTrue(self.template.matches_filter(prompt_type="Strategic"))
        self.assertFalse(self.template.matches_filter(prompt_type="Socratic"))

    def test_matches_filter_tags(self):
        """Test filtering by tags"""
        self.assertTrue(self.template.matches_filter(tags=["#Test"]))
        self.assertFalse(self.template.matches_filter(tags=["#Other"]))

    def test_matches_filter_search_term(self):
        """Test filtering by search term"""
        self.assertTrue(self.template.matches_filter(search_term="test"))
        self.assertTrue(self.template.matches_filter(search_term="Help"))
        self.assertFalse(self.template.matches_filter(search_term="xyz123"))

    def test_increment_usage(self):
        """Test incrementing usage counter"""
        initial = self.template.uses
        self.template.increment_usage()
        self.assertEqual(self.template.uses, initial + 1)

    def test_to_dict(self):
        """Test converting to dictionary"""
        data = self.template.to_dict()
        self.assertIsInstance(data, dict)
        self.assertEqual(data['id'], "test_prompt")
        self.assertEqual(data['title'], "Test Prompt")

    def test_from_dict(self):
        """Test creating from dictionary"""
        data = {
            'id': 'new_prompt',
            'title': 'New Prompt',
            'user_type': ['Parents'],
            'prompt_type': 'Socratic',
            'when_to_use': 'When needed',
            'full_prompt': 'This is a test',
            'tags': ['#Tag1']
        }

        prompt = PromptTemplate.from_dict(data, category="Test")
        self.assertEqual(prompt.id, 'new_prompt')
        self.assertEqual(prompt.title, 'New Prompt')
        self.assertEqual(prompt.category, 'Test')


def run_tests():
    """Run all tests"""
    unittest.main(verbosity=2)


if __name__ == '__main__':
    run_tests()
