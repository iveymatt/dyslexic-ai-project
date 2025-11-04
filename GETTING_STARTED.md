# Getting Started with Dyslexic AI

Welcome! This guide will help you get up and running with the Dyslexic AI LLM Clone for Neurodivergent Users in just a few minutes.

## 🎯 What Is This?

Dyslexic AI is an AI assistant specifically designed for people with dyslexia, their families, educators, and professionals. It provides:

- **107+ specialized prompts** for common dyslexia challenges
- **LLM integration** for personalized AI responses
- **Dyslexia-friendly formatting** and accessibility features
- **Evidence-based strategies** from the dyslexic community

## 🚀 Quick Start (3 Steps)

### Step 1: Installation

```bash
# Clone the repository
git clone https://github.com/iveymatt/dyslexic-ai-project.git
cd dyslexic-ai-project

# Set up the environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies (when requirements.txt is available)
# pip install -r requirements.txt
```

### Step 2: Try the Interactive Demo

```bash
# Run the full interactive demo
python examples/dyslexic_ai_demo.py
```

This will start an interactive assistant where you can:
- Browse 107+ prompts by category
- Search for specific help
- Get personalized suggestions
- See what's popular in the community

### Step 3: Explore the Prompt Library

```bash
# Run prompt library examples
python examples/prompt_library_examples.py
```

This shows 11 different ways to use the prompt library programmatically.

## 💡 Your First Prompt

Try this simple example:

```python
from src.prompts import PromptManager

# Initialize
manager = PromptManager()

# Get a prompt
prompt = manager.get_prompt("read_no_remember")

# Use it
filled = prompt.fill_template(
    number="5",
    material_type="history textbook",
    paste="Your text here..."
)

print(filled)
```

## 📚 Common Use Cases

### For Students

**Problem**: "I read 10 pages but can't remember anything"

```python
# Get help with reading comprehension
prompt = manager.get_prompt("read_no_remember")

# Or search for reading help
results = manager.search_prompts(
    user_type="Students",
    category="Reading Struggles"
)
```

**Problem**: "I need to write an essay but my ideas are jumbled"

```python
prompt = manager.get_prompt("organize_essay")
```

**Problem**: "I can't finish assignments on time"

```python
prompt = manager.get_prompt("cant_finish_assignments")
```

### For Parents

**Problem**: "My child says they're stupid because of reading struggles"

```python
prompt = manager.get_prompt("child_says_stupid")
```

**Problem**: "I have an IEP meeting coming up"

```python
prompt = manager.get_prompt("prepare_iep_meeting")
```

**Problem**: "Homework is a nightly battle"

```python
prompt = manager.get_prompt("homework_battle")
```

### For Professionals

**Problem**: "I need to write an important email without errors"

```python
prompt = manager.get_prompt("crucial_email")
```

**Problem**: "I made a mistake at work and I'm spiraling"

```python
prompt = manager.get_prompt("handle_work_mistakes")
```

**Problem**: "Should I tell my boss about my dyslexia?"

```python
prompt = manager.get_prompt("tell_boss")
```

### For Teachers

**Problem**: "How do I make my lessons accessible to dyslexic students?"

```python
prompt = manager.get_prompt("teach_dyslexic_students")
```

**Problem**: "A student won't read aloud - is it anxiety or attitude?"

```python
prompt = manager.get_prompt("student_wont_read")
```

**Problem**: "I want to build strengths, not just fix weaknesses"

```python
prompt = manager.get_prompt("build_strengths_not_fix")
```

## 🔍 Finding the Right Prompt

### Browse by Category

```python
# See all categories
categories = manager.get_all_categories()

# Get prompts in a category
reading_prompts = manager.get_prompts_by_category("Reading Struggles")
```

### Search by Keywords

```python
# Find prompts about organization
results = manager.search_prompts(search_term="organize")

# Find prompts about confidence
results = manager.search_prompts(search_term="confidence")
```

### Filter by User Type

```python
# Get all student prompts
student_prompts = manager.get_prompts_by_user_type("Students")

# Get all parent prompts
parent_prompts = manager.get_prompts_by_user_type("Parents")
```

### Find Popular Prompts

```python
# See what's helping others
popular = manager.get_popular_prompts(limit=10)
```

## 📖 Documentation

Once you're comfortable with the basics, dive deeper:

1. **[Prompt Library Guide](docs/guides/PROMPT_LIBRARY_GUIDE.md)** - Complete guide with all features
2. **[Integration Guide](docs/guides/INTEGRATION_GUIDE.md)** - Connect prompt library to your LLM
3. **[README](README.md)** - Full project overview

## 🎨 The Two Types of Prompts

### Strategic Prompts 🎯
**Action-oriented. Help you DO something.**

Examples:
- "Help me write this essay"
- "Break down this confusing text"
- "Create a study plan"

Use these when you need to **solve a problem** or **complete a task**.

### Socratic Prompts 🧠
**Understanding-oriented. Help you LEARN something.**

Examples:
- "Why do I skip words when reading?"
- "Is dyslexia actually a superpower?"
- "How do I explain dyslexia to others?"

Use these when you want to **understand** something or **explore** an idea.

## 🌟 Key Features to Explore

### 1. Template System
Prompts use placeholders that you fill in:

```python
# Prompt template
"I need to write [type] about [topic]..."

# Fill it in
filled = prompt.fill_template(
    type="email",
    topic="project update"
)
```

### 2. Search & Filtering
Combine multiple filters:

```python
results = manager.search_prompts(
    user_type="Students",
    prompt_type="Strategic",
    category="Writing Challenges",
    tags=["#Organization"],
    search_term="essay"
)
```

### 3. Usage Tracking
See what works:

```python
# Record when you use a prompt
manager.record_usage(prompt.id)

# See popular prompts
popular = manager.get_popular_prompts(10)
```

### 4. Statistics
Understand the library:

```python
stats = manager.get_statistics()
print(f"Total prompts: {stats['total_prompts']}")
print(f"Categories: {stats['categories']}")
```

## 🎯 Next Steps

1. ✅ **Try the interactive demo**: `python examples/dyslexic_ai_demo.py`
2. ✅ **Run the examples**: `python examples/prompt_library_examples.py`
3. ✅ **Read the full guide**: [PROMPT_LIBRARY_GUIDE.md](docs/guides/PROMPT_LIBRARY_GUIDE.md)
4. ✅ **Explore integration**: [INTEGRATION_GUIDE.md](docs/guides/INTEGRATION_GUIDE.md)
5. ✅ **Try it with your own use case**

## 🤔 Common Questions

**Q: Do I need an LLM API key?**
A: The prompt library works standalone. For full LLM integration, you'll need an API key for Claude, GPT-4, or similar.

**Q: Can I add my own prompts?**
A: Yes! Edit `src/prompts/library/dyslexia_prompt_library.json` or configure custom prompts in `config/prompts.yaml`.

**Q: How do I know which prompt to use?**
A: Start with the interactive demo (`python examples/dyslexic_ai_demo.py`) - it guides you through selection. Or search by keywords related to your challenge.

**Q: Are these prompts evidence-based?**
A: Yes! They're reverse-engineered from real questions asked by the dyslexic community and incorporate research-backed strategies.

**Q: Can I use this for other learning differences?**
A: While designed for dyslexia, many prompts are helpful for ADHD, dyscalculia, and other neurodivergent profiles.

## 💬 Get Help

- **GitHub Issues**: [Report bugs or request features](https://github.com/iveymatt/dyslexic-ai-project/issues)
- **Documentation**: Check the [docs/guides](docs/guides/) folder
- **Examples**: See [examples/](examples/) for code samples

## 🎉 You're Ready!

You now know enough to start using Dyslexic AI. Remember:

- 107+ prompts available
- Browse, search, or filter to find what you need
- Two types: Strategic (do) and Socratic (understand)
- Templates make prompts reusable
- Track what works with usage analytics

**Welcome to the neurodivergent-friendly AI revolution!** 🌈

---

*Built with 💜 for the neurodivergent community*
