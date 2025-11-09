# tests/integration/test_api.py

import pytest
from dyslexic_ai.api import APIManager

@pytest.mark.asyncio
async def test_api_endpoints():
    """Test API endpoint functionality"""
    api = APIManager()
    response = await api.process_request({
        "content": "Test content",
        "user_id": "test_user"
    })
    assert response.status_code == 200
    assert "content" in response.data

@pytest.mark.asyncio
async def test_api_authentication():
    """Test API authentication"""
    api = APIManager()
    auth_result = await api.authenticate({
        "user_id": "test_user",
        "token": "test_token"
    })
    assert auth_result.authenticated