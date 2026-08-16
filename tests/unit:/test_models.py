# tests/unit/test_models.py

import pytest
from dyslexic_ai.ml import ModelManager

def test_model_initialization():
    """Test model initialization"""
    model = ModelManager()
    assert model is not None
    assert model.is_initialized()

def test_model_processing():
    """Test basic model processing"""
    model = ModelManager()
    result = model.process("Test input")
    assert result is not None
    assert isinstance(result, dict)
