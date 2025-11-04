# Integration Guide: Prompt Library + LLM System

This guide shows how to integrate the Dyslexic AI Prompt Library with your LLM system to create a powerful, neurodivergent-friendly AI assistant.

## Overview

The prompt library provides specialized, ready-to-use prompts for common dyslexia-related challenges. When integrated with an LLM (Large Language Model), it creates a complete AI assistant that understands and supports neurodivergent users.

```
User Input → Prompt Selection → Template Filling → LLM Processing → Adapted Response
```

## Architecture

### Components

1. **Prompt Library** (`src/prompts/`)
   - 107+ specialized prompts
   - Search and filtering
   - Template management
   - Usage tracking

2. **LLM Integration** (`src/core/model_integration.py`)
   - Model communication
   - Response adaptation
   - Context management

3. **Processing Manager** (`src/core/processing_manager.py`)
   - Content simplification
   - Complexity analysis
   - Output formatting

4. **Accessibility Manager** (`src/core/accessibility_manager.py`)
   - Dyslexia-friendly formatting
   - Visual optimization
   - Cognitive load management

### Data Flow

```
┌─────────────────┐
│   User Input    │
│ "I need help    │
│ with reading"   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Prompt Selector │
│ Finds relevant  │
│ prompts based   │
│ on user needs   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Template Filler │
│ Inserts user's  │
│ specific info   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  LLM Processor  │
│ Generates       │
│ response using  │
│ filled prompt   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Response Adapter│
│ Formats for     │
│ accessibility   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ User Receives   │
│ Dyslexia-       │
│ friendly output │
└─────────────────┘
```

## Basic Integration

### Step 1: Initialize Components

```python
from src.prompts import PromptManager
from src.core.model_integration import ModelIntegrationManager
from src.core.accessibility_manager import AccessibilityManager

# Initialize managers
prompt_manager = PromptManager()
model_manager = ModelIntegrationManager()
accessibility_manager = AccessibilityManager()
```

### Step 2: Select Appropriate Prompt

```python
def select_prompt_for_user(user_input, user_type="General"):
    """
    Analyze user input and select the most appropriate prompt.
    """
    # Option 1: Direct ID if user selects from menu
    if user_has_selected_prompt:
        return prompt_manager.get_prompt(prompt_id)

    # Option 2: Search based on keywords
    keywords = extract_keywords(user_input)
    results = prompt_manager.search_prompts(
        user_type=user_type,
        search_term=" ".join(keywords),
        limit=5
    )

    # Return best match or let user choose
    return results[0] if results else None
```

### Step 3: Fill Template with User Data

```python
def prepare_prompt(prompt, user_details):
    """
    Fill prompt template with user's specific information.
    """
    # Get required placeholders
    placeholders = prompt.get_placeholders()

    # Extract values from user details
    values = {}
    for placeholder in placeholders:
        if placeholder in user_details:
            values[placeholder] = user_details[placeholder]
        else:
            # Prompt user to provide missing info
            values[placeholder] = ask_user_for(placeholder)

    # Fill the template
    filled_prompt = prompt.fill_template(**values)

    return filled_prompt
```

### Step 4: Process with LLM

```python
def process_with_llm(filled_prompt, user_preferences=None):
    """
    Send prompt to LLM and get response.
    """
    # Add system context for dyslexia support
    system_prompt = """
    You are an AI assistant specializing in supporting individuals with dyslexia.
    Provide clear, structured responses. Use simple language when possible.
    Be empathetic and empowering. Focus on strengths as well as solutions.
    """

    # Generate response
    response = model_manager.generate(
        system_prompt=system_prompt,
        user_prompt=filled_prompt,
        temperature=0.7,
        max_tokens=2048
    )

    return response
```

### Step 5: Format for Accessibility

```python
def format_response(response, preferences):
    """
    Format response for dyslexia-friendly display.
    """
    formatted = accessibility_manager.format_content(
        content=response,
        font=preferences.get('font', 'OpenDyslexic'),
        font_size=preferences.get('font_size', 14),
        line_spacing=preferences.get('line_spacing', 1.5),
        color_scheme=preferences.get('color_scheme', 'high_contrast')
    )

    return formatted
```

### Step 6: Complete Integration Function

```python
def dyslexic_ai_assistant(user_input, user_type="General", user_preferences=None):
    """
    Complete pipeline: input → prompt selection → LLM → formatted output
    """
    # 1. Select prompt
    prompt = select_prompt_for_user(user_input, user_type)

    if not prompt:
        return "I couldn't find a good prompt for that. Can you be more specific?"

    # 2. Collect user details for template
    user_details = collect_user_details(prompt)

    # 3. Fill template
    filled_prompt = prepare_prompt(prompt, user_details)

    # 4. Process with LLM
    response = process_with_llm(filled_prompt, user_preferences)

    # 5. Format for accessibility
    formatted_response = format_response(response, user_preferences or {})

    # 6. Track usage
    prompt_manager.record_usage(prompt.id)

    return formatted_response
```

## Advanced Integration Patterns

### Pattern 1: Interactive Prompt Selection

```python
def interactive_prompt_selection(user_type):
    """
    Guide user through selecting the right prompt.
    """
    print(f"\n🎯 What do you need help with?\n")

    # Show categories
    categories = prompt_manager.get_all_categories()
    for i, category in enumerate(categories, 1):
        count = len(prompt_manager.get_prompts_by_category(category))
        print(f"{i}. {category} ({count} prompts)")

    # User selects category
    cat_choice = int(input("\nSelect category: "))
    selected_category = categories[cat_choice - 1]

    # Show prompts in category
    prompts = prompt_manager.search_prompts(
        category=selected_category,
        user_type=user_type
    )

    print(f"\n📝 Available prompts:\n")
    for i, prompt in enumerate(prompts, 1):
        print(f"{i}. {prompt.title}")
        print(f"   {prompt.when_to_use}\n")

    # User selects prompt
    prompt_choice = int(input("Select prompt: "))
    return prompts[prompt_choice - 1]
```

### Pattern 2: Smart Prompt Suggestions

```python
def suggest_prompts(user_history, current_situation):
    """
    Suggest prompts based on user's history and current needs.
    """
    # Get user's most-used categories
    common_categories = analyze_usage_patterns(user_history)

    # Get popular prompts in those categories
    suggestions = []
    for category in common_categories[:3]:
        prompts = prompt_manager.get_prompts_by_category(category)
        # Sort by popularity and usage
        prompts.sort(key=lambda p: (p.popularity, p.uses), reverse=True)
        suggestions.extend(prompts[:2])

    # Also add prompts relevant to current situation
    keyword_matches = prompt_manager.search_prompts(
        search_term=current_situation,
        limit=3
    )
    suggestions.extend(keyword_matches)

    return deduplicate(suggestions)
```

### Pattern 3: Multi-Step Conversations

```python
class ConversationManager:
    """
    Manage multi-turn conversations with context.
    """

    def __init__(self):
        self.prompt_manager = PromptManager()
        self.context = []
        self.current_prompt = None

    def start_conversation(self, user_type):
        """Begin a new conversation."""
        self.context = []
        self.user_type = user_type

        return "Hi! I'm here to help. What do you need support with today?"

    def process_turn(self, user_input):
        """Process one turn of the conversation."""
        # If we don't have a prompt yet, find one
        if not self.current_prompt:
            self.current_prompt = self.select_prompt(user_input)

            # Ask for template details
            placeholders = self.current_prompt.get_placeholders()
            if placeholders and not self.has_all_details(placeholders):
                return self.ask_for_details(placeholders)

        # If we have all details, generate response
        if self.has_all_details():
            filled_prompt = self.fill_current_prompt()
            response = self.generate_response(filled_prompt)
            self.context.append({
                'prompt': self.current_prompt,
                'response': response
            })
            self.current_prompt = None  # Reset for next question
            return response

        # Otherwise, collect more details
        return self.collect_details(user_input)
```

### Pattern 4: Batch Processing

```python
def batch_process_assignments(assignments, user_preferences):
    """
    Process multiple assignments using appropriate prompts.
    """
    results = []

    for assignment in assignments:
        # Determine assignment type
        assignment_type = classify_assignment(assignment)

        # Select appropriate prompt
        if assignment_type == "reading":
            prompt = prompt_manager.get_prompt("break_down_text")
        elif assignment_type == "writing":
            prompt = prompt_manager.get_prompt("organize_essay")
        elif assignment_type == "studying":
            prompt = prompt_manager.get_prompt("study_better")

        # Process
        filled = prompt.fill_template(**assignment)
        response = process_with_llm(filled, user_preferences)

        results.append({
            'assignment': assignment['name'],
            'prompt_used': prompt.id,
            'result': response
        })

    return results
```

## API Integration

### REST API Example

```python
from flask import Flask, request, jsonify
from src.prompts import PromptManager

app = Flask(__name__)
prompt_manager = PromptManager()

@app.route('/api/prompts/search', methods=['POST'])
def search_prompts():
    """Search for prompts."""
    data = request.json

    results = prompt_manager.search_prompts(
        user_type=data.get('user_type'),
        category=data.get('category'),
        tags=data.get('tags'),
        search_term=data.get('search_term'),
        limit=data.get('limit', 10)
    )

    return jsonify([prompt.to_dict() for prompt in results])

@app.route('/api/prompts/<prompt_id>', methods=['GET'])
def get_prompt(prompt_id):
    """Get a specific prompt."""
    prompt = prompt_manager.get_prompt(prompt_id)

    if not prompt:
        return jsonify({'error': 'Prompt not found'}), 404

    return jsonify(prompt.to_dict())

@app.route('/api/assistant', methods=['POST'])
def assistant():
    """Main assistant endpoint."""
    data = request.json

    # Process request
    result = dyslexic_ai_assistant(
        user_input=data['input'],
        user_type=data.get('user_type', 'General'),
        user_preferences=data.get('preferences')
    )

    return jsonify({'response': result})
```

### WebSocket Integration

```python
import asyncio
import websockets
import json

async def handle_client(websocket, path):
    """Handle WebSocket client connection."""
    prompt_manager = PromptManager()
    conversation = ConversationManager()

    # Send welcome message
    await websocket.send(json.dumps({
        'type': 'welcome',
        'message': 'Connected to Dyslexic AI Assistant'
    }))

    async for message in websocket:
        data = json.loads(message)

        if data['type'] == 'search_prompts':
            results = prompt_manager.search_prompts(**data['filters'])
            await websocket.send(json.dumps({
                'type': 'search_results',
                'prompts': [p.to_dict() for p in results]
            }))

        elif data['type'] == 'process':
            response = conversation.process_turn(data['input'])
            await websocket.send(json.dumps({
                'type': 'response',
                'content': response
            }))

# Start WebSocket server
start_server = websockets.serve(handle_client, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
```

## Testing Integration

```python
import unittest
from src.prompts import PromptManager

class TestIntegration(unittest.TestCase):
    """Test prompt library + LLM integration."""

    def setUp(self):
        self.prompt_manager = PromptManager()

    def test_complete_pipeline(self):
        """Test complete pipeline from prompt to response."""
        # Get prompt
        prompt = self.prompt_manager.get_prompt("read_no_remember")
        self.assertIsNotNone(prompt)

        # Fill template
        filled = prompt.fill_template(
            number="5",
            material_type="textbook",
            paste="Test content"
        )

        # Verify filled
        self.assertNotIn("[number]", filled)
        self.assertIn("5", filled)

        # Process (mock LLM)
        response = mock_llm_process(filled)
        self.assertIsNotNone(response)

        # Record usage
        self.prompt_manager.record_usage(prompt.id)
        self.assertGreater(prompt.uses, 0)
```

## Performance Optimization

### Caching Prompts

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_cached_prompt(prompt_id):
    """Cache frequently accessed prompts."""
    return prompt_manager.get_prompt(prompt_id)
```

### Async Processing

```python
import asyncio

async def process_async(filled_prompt):
    """Process multiple prompts concurrently."""
    response = await model_manager.generate_async(filled_prompt)
    return response

async def batch_process_async(prompts):
    """Process multiple prompts in parallel."""
    tasks = [process_async(p) for p in prompts]
    return await asyncio.gather(*tasks)
```

## Deployment Considerations

### Environment Variables

```bash
# .env file
PROMPT_LIBRARY_PATH=/path/to/prompts/library
LLM_API_KEY=your_api_key
LLM_MODEL=claude-3-sonnet
CACHE_ENABLED=true
ANALYTICS_ENABLED=true
```

### Configuration Management

```python
import os
from src.prompts import PromptManager

# Load from environment
library_path = os.getenv('PROMPT_LIBRARY_PATH')
prompt_manager = PromptManager(library_path=library_path)

# Load configuration
config = load_yaml_config('config/prompts.yaml')
```

## Monitoring & Analytics

```python
def track_prompt_usage():
    """Generate usage reports."""
    stats = prompt_manager.get_statistics()

    # Log to monitoring system
    log_metrics({
        'total_prompts': stats['total_prompts'],
        'total_uses': stats['total_uses'],
        'popular_prompts': prompt_manager.get_popular_prompts(5)
    })

def analyze_user_patterns(user_id):
    """Analyze individual user patterns."""
    history = get_user_history(user_id)

    # Most used categories
    categories = Counter([h['prompt'].category for h in history])

    # Most used prompts
    prompts = Counter([h['prompt'].id for h in history])

    return {
        'favorite_categories': categories.most_common(3),
        'favorite_prompts': prompts.most_common(5)
    }
```

## Troubleshooting

### Common Issues

1. **Prompt not found**: Check prompt ID and ensure library is loaded
2. **Missing placeholders**: Verify all required fields are provided
3. **LLM timeout**: Increase timeout or reduce max_tokens
4. **Format errors**: Check template syntax and escape special characters

### Debug Mode

```python
# Enable debug logging
import logging
logging.basicConfig(level=logging.DEBUG)

# Test prompt loading
prompt = prompt_manager.get_prompt("test_id")
if not prompt:
    logging.error("Prompt not found. Available IDs:")
    for p_id in prompt_manager.prompts.keys():
        logging.debug(f"  - {p_id}")
```

## Best Practices

1. **Always validate user input** before filling templates
2. **Cache prompts** that are accessed frequently
3. **Track usage** to understand what works
4. **Test with real users** from the dyslexic community
5. **Provide fallbacks** when prompts don't match
6. **Monitor performance** and optimize bottlenecks
7. **Keep prompts updated** based on user feedback

## Next Steps

- Explore the [Prompt Library Guide](PROMPT_LIBRARY_GUIDE.md)
- Try the [Example Integration](../../examples/prompt_library_examples.py)
- Review [API Documentation](../technical/api_documentation.md.rtf)
- Join our [Community Discussions](https://github.com/iveymatt/dyslexic-ai-project/discussions)

---

*Last Updated: 2025-11-04*
