# tests/core/test_accessibility.py

import pytest
from dyslexic_ai.core import AccessibilityManager

@pytest.mark.asyncio
async def test_accessibility_processing():
    """Test accessibility processing features"""
    manager = AccessibilityManager()
    result = await manager.process_content(
        content="Test content",
        user_preferences={"font_size": "large"}
    )
    assert result is not None
    assert "font_size" in result.adaptations

@pytest.mark.asyncio
async def test_user_preferences():
    """Test user preference handling"""
    manager = AccessibilityManager()
    preferences = {
        "font_family": "OpenDyslexic",
        "line_spacing": 1.5
    }
    result = await manager.apply_preferences(preferences)
    assert result.success
