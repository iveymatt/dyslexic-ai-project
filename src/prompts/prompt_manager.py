"""
Prompt Manager for Dyslexic AI system.

This module manages loading, filtering, and accessing prompts from the prompt library.
"""

import json
import os
from pathlib import Path
from typing import List, Optional, Dict
from collections import defaultdict

from .prompt_templates import PromptTemplate, PromptType, UserType, Category


class PromptManager:
    """
    Manages the dyslexia prompt library.

    Provides methods to load, search, filter, and retrieve prompts for
    different user types, categories, and use cases.
    """

    def __init__(self, library_path: Optional[str] = None):
        """
        Initialize the PromptManager.

        Args:
            library_path: Path to the prompt library JSON file.
                         If None, uses the default library location.
        """
        if library_path is None:
            # Default to the library file in the same directory
            current_dir = Path(__file__).parent
            library_path = current_dir / "library" / "dyslexia_prompt_library.json"

        self.library_path = Path(library_path)
        self.prompts: Dict[str, PromptTemplate] = {}
        self.categories: Dict[str, List[PromptTemplate]] = defaultdict(list)
        self.metadata: Dict = {}

        # Load the library
        self.load_library()

    def load_library(self):
        """Load the prompt library from the JSON file."""
        if not self.library_path.exists():
            raise FileNotFoundError(
                f"Prompt library not found at: {self.library_path}"
            )

        with open(self.library_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # Store metadata
        self.metadata = {
            'version': data.get('version'),
            'last_updated': data.get('last_updated'),
            'total_prompts': data.get('total_prompts'),
            'categories': data.get('categories', [])
        }

        # Load all prompts from each category
        prompts_data = data.get('prompts', {})
        for category_key, prompt_list in prompts_data.items():
            # Convert category key to readable name
            category_name = self._key_to_category_name(category_key)

            for prompt_dict in prompt_list:
                prompt = PromptTemplate.from_dict(prompt_dict, category=category_name)
                self.prompts[prompt.id] = prompt
                self.categories[category_name].append(prompt)

    def _key_to_category_name(self, key: str) -> str:
        """Convert a category key to a readable category name."""
        # Convert snake_case to Title Case
        return ' '.join(word.capitalize() for word in key.replace('_', ' ').split())

    def get_prompt(self, prompt_id: str) -> Optional[PromptTemplate]:
        """
        Get a specific prompt by its ID.

        Args:
            prompt_id: The unique identifier for the prompt

        Returns:
            The PromptTemplate if found, None otherwise
        """
        return self.prompts.get(prompt_id)

    def get_all_prompts(self) -> List[PromptTemplate]:
        """
        Get all prompts in the library.

        Returns:
            List of all PromptTemplate objects
        """
        return list(self.prompts.values())

    def get_prompts_by_category(self, category: str) -> List[PromptTemplate]:
        """
        Get all prompts in a specific category.

        Args:
            category: Category name (e.g., "Reading Struggles")

        Returns:
            List of prompts in that category
        """
        return self.categories.get(category, [])

    def search_prompts(
        self,
        user_type: Optional[str] = None,
        prompt_type: Optional[str] = None,
        category: Optional[str] = None,
        tags: Optional[List[str]] = None,
        search_term: Optional[str] = None,
        limit: Optional[int] = None
    ) -> List[PromptTemplate]:
        """
        Search for prompts matching the given criteria.

        Args:
            user_type: Filter by user type (e.g., "Students", "Professionals")
            prompt_type: Filter by prompt type ("Strategic" or "Socratic")
            category: Filter by category
            tags: Filter by tags (any match)
            search_term: Search term to find in title/description/prompt
            limit: Maximum number of results to return

        Returns:
            List of matching PromptTemplate objects

        Example:
            >>> manager.search_prompts(
            ...     user_type="Students",
            ...     prompt_type="Strategic",
            ...     tags=["#Reading"]
            ... )
        """
        # Start with all prompts or prompts from a specific category
        if category:
            candidates = self.get_prompts_by_category(category)
        else:
            candidates = self.get_all_prompts()

        # Apply filters
        results = [
            prompt for prompt in candidates
            if prompt.matches_filter(user_type, prompt_type, tags, search_term)
        ]

        # Apply limit if specified
        if limit:
            results = results[:limit]

        return results

    def get_popular_prompts(self, limit: int = 10) -> List[PromptTemplate]:
        """
        Get the most popular prompts based on usage.

        Args:
            limit: Maximum number of prompts to return

        Returns:
            List of most popular prompts
        """
        sorted_prompts = sorted(
            self.prompts.values(),
            key=lambda p: (p.uses, p.popularity),
            reverse=True
        )
        return sorted_prompts[:limit]

    def get_prompts_by_user_type(self, user_type: str) -> List[PromptTemplate]:
        """
        Get all prompts for a specific user type.

        Args:
            user_type: User type (e.g., "Students", "Parents", "Teachers")

        Returns:
            List of prompts for that user type
        """
        return [
            prompt for prompt in self.prompts.values()
            if user_type in prompt.user_type
        ]

    def get_prompts_by_type(self, prompt_type: str) -> List[PromptTemplate]:
        """
        Get all prompts of a specific type.

        Args:
            prompt_type: "Strategic" or "Socratic"

        Returns:
            List of prompts of that type
        """
        return [
            prompt for prompt in self.prompts.values()
            if prompt.prompt_type == prompt_type
        ]

    def get_prompts_by_tag(self, tag: str) -> List[PromptTemplate]:
        """
        Get all prompts with a specific tag.

        Args:
            tag: Tag to search for (with or without #)

        Returns:
            List of prompts with that tag
        """
        if not tag.startswith('#'):
            tag = f'#{tag}'

        return [
            prompt for prompt in self.prompts.values()
            if tag in prompt.tags
        ]

    def get_all_categories(self) -> List[str]:
        """
        Get list of all available categories.

        Returns:
            List of category names
        """
        return list(self.categories.keys())

    def get_all_tags(self) -> List[str]:
        """
        Get list of all unique tags used in prompts.

        Returns:
            Sorted list of all tags
        """
        all_tags = set()
        for prompt in self.prompts.values():
            all_tags.update(prompt.tags)
        return sorted(list(all_tags))

    def get_all_user_types(self) -> List[str]:
        """
        Get list of all user types.

        Returns:
            Sorted list of user types
        """
        all_types = set()
        for prompt in self.prompts.values():
            all_types.update(prompt.user_type)
        return sorted(list(all_types))

    def record_usage(self, prompt_id: str):
        """
        Record usage of a prompt (increments use counter).

        Args:
            prompt_id: ID of the prompt that was used
        """
        prompt = self.get_prompt(prompt_id)
        if prompt:
            prompt.increment_usage()

    def get_statistics(self) -> Dict:
        """
        Get statistics about the prompt library.

        Returns:
            Dictionary containing library statistics
        """
        total_uses = sum(prompt.uses for prompt in self.prompts.values())

        return {
            'total_prompts': len(self.prompts),
            'total_uses': total_uses,
            'categories': len(self.categories),
            'total_tags': len(self.get_all_tags()),
            'user_types': len(self.get_all_user_types()),
            'version': self.metadata.get('version'),
            'last_updated': self.metadata.get('last_updated'),
            'prompts_by_category': {
                category: len(prompts)
                for category, prompts in self.categories.items()
            },
            'prompts_by_type': {
                'Strategic': len(self.get_prompts_by_type('Strategic')),
                'Socratic': len(self.get_prompts_by_type('Socratic'))
            }
        }

    def export_prompts(
        self,
        output_path: str,
        user_type: Optional[str] = None,
        category: Optional[str] = None
    ):
        """
        Export prompts to a JSON file.

        Args:
            output_path: Path to save the exported prompts
            user_type: Optional filter by user type
            category: Optional filter by category
        """
        prompts = self.search_prompts(user_type=user_type, category=category)

        export_data = {
            'version': self.metadata.get('version'),
            'exported_date': self.metadata.get('last_updated'),
            'filters': {
                'user_type': user_type,
                'category': category
            },
            'prompts': [prompt.to_dict() for prompt in prompts]
        }

        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(export_data, f, indent=2, ensure_ascii=False)

    def __len__(self) -> int:
        """Return the number of prompts in the library."""
        return len(self.prompts)

    def __repr__(self) -> str:
        """String representation of the PromptManager."""
        return (
            f"PromptManager("
            f"prompts={len(self.prompts)}, "
            f"categories={len(self.categories)}, "
            f"version={self.metadata.get('version')}"
            f")"
        )
