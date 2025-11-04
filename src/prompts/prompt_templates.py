"""
Prompt template classes for the Dyslexic AI system.
"""

from dataclasses import dataclass, field
from typing import List, Optional
from enum import Enum


class PromptType(Enum):
    """Types of prompts available in the library."""
    STRATEGIC = "Strategic"  # Action-oriented, problem-solving prompts
    SOCRATIC = "Socratic"    # Understanding, exploration, guidance prompts


class UserType(Enum):
    """Target user types for prompts."""
    STUDENTS = "Students"
    PROFESSIONALS = "Professionals"
    PARENTS = "Parents"
    TEACHERS = "Teachers"
    GENERAL = "General"


class Category(Enum):
    """Prompt categories."""
    READING_STRUGGLES = "Reading Struggles"
    WRITING_CHALLENGES = "Writing Challenges"
    ORGANIZATION_EXECUTIVE = "Organization & Executive Function"
    CONFIDENCE_SELF_ESTEEM = "Confidence & Self-Esteem"
    SOCIAL_DISCLOSURE = "Social & Disclosure"
    ACCOMMODATIONS_ADVOCACY = "Accommodations & Advocacy"
    TOOLS_STRATEGIES = "Tools & Strategies"
    UNDERSTANDING_DYSLEXIA = "Understanding Dyslexia"
    PARENT_PROMPTS = "Parent Prompts"
    STUDENT_PROMPTS = "Student Prompts"
    PROFESSIONAL_ADULT = "Professional/Adult Prompts"
    TEACHER_EDUCATOR = "Teacher/Educator Prompts"


@dataclass
class PromptTemplate:
    """
    Represents a single prompt template in the library.

    Attributes:
        id: Unique identifier for the prompt
        title: Human-readable title with emoji
        user_type: List of user types this prompt is designed for
        prompt_type: Strategic (action) or Socratic (understanding)
        when_to_use: Description of when to use this prompt
        full_prompt: The complete prompt template with placeholders
        tags: List of tags for filtering and search
        popularity: Popularity score (calculated from usage)
        uses: Number of times this prompt has been used
        verified: Whether this prompt has been verified/tested
        category: The category this prompt belongs to
    """
    id: str
    title: str
    user_type: List[str]
    prompt_type: str
    when_to_use: str
    full_prompt: str
    tags: List[str]
    popularity: int = 0
    uses: int = 0
    verified: bool = True
    category: Optional[str] = None

    def matches_filter(
        self,
        user_type: Optional[str] = None,
        prompt_type: Optional[str] = None,
        tags: Optional[List[str]] = None,
        search_term: Optional[str] = None
    ) -> bool:
        """
        Check if this prompt matches the given filters.

        Args:
            user_type: Filter by user type
            prompt_type: Filter by prompt type (Strategic/Socratic)
            tags: Filter by tags (any match)
            search_term: Search in title, when_to_use, and full_prompt

        Returns:
            True if prompt matches all provided filters
        """
        # Check user type
        if user_type and user_type not in self.user_type:
            return False

        # Check prompt type
        if prompt_type and self.prompt_type != prompt_type:
            return False

        # Check tags (any match)
        if tags:
            prompt_tags_lower = [tag.lower() for tag in self.tags]
            if not any(tag.lower() in prompt_tags_lower for tag in tags):
                return False

        # Check search term
        if search_term:
            search_lower = search_term.lower()
            searchable_text = f"{self.title} {self.when_to_use} {self.full_prompt}".lower()
            if search_lower not in searchable_text:
                return False

        return True

    def fill_template(self, **kwargs) -> str:
        """
        Fill in the prompt template with provided values.

        Args:
            **kwargs: Key-value pairs for template substitution

        Returns:
            Filled prompt string

        Example:
            >>> prompt.fill_template(material="textbook", number="5")
        """
        filled_prompt = self.full_prompt
        for key, value in kwargs.items():
            # Replace both [key] and [key: description] patterns
            filled_prompt = filled_prompt.replace(f"[{key}]", str(value))
            # Handle patterns like [key: description]
            import re
            pattern = f"\\[{key}:?[^\\]]*\\]"
            filled_prompt = re.sub(pattern, str(value), filled_prompt)
        return filled_prompt

    def get_placeholders(self) -> List[str]:
        """
        Extract all placeholders from the prompt template.

        Returns:
            List of placeholder names found in the template
        """
        import re
        # Match both [placeholder] and [placeholder: description] patterns
        pattern = r'\[([^\]:]+)(?::[^\]]+)?\]'
        placeholders = re.findall(pattern, self.full_prompt)
        return list(set(placeholders))  # Remove duplicates

    def increment_usage(self):
        """Increment the usage counter for this prompt."""
        self.uses += 1

    def to_dict(self) -> dict:
        """Convert prompt template to dictionary format."""
        return {
            'id': self.id,
            'title': self.title,
            'user_type': self.user_type,
            'prompt_type': self.prompt_type,
            'when_to_use': self.when_to_use,
            'full_prompt': self.full_prompt,
            'tags': self.tags,
            'popularity': self.popularity,
            'uses': self.uses,
            'verified': self.verified,
            'category': self.category
        }

    @classmethod
    def from_dict(cls, data: dict, category: Optional[str] = None) -> 'PromptTemplate':
        """Create a PromptTemplate from dictionary data."""
        return cls(
            id=data['id'],
            title=data['title'],
            user_type=data['user_type'],
            prompt_type=data['prompt_type'],
            when_to_use=data['when_to_use'],
            full_prompt=data['full_prompt'],
            tags=data['tags'],
            popularity=data.get('popularity', 0),
            uses=data.get('uses', 0),
            verified=data.get('verified', True),
            category=category or data.get('category')
        )
