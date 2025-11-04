# Dyslexic AI - LLM Clone for Neurodivergent Users

An AI-powered assistant specifically designed to support neurodivergent individuals, with a focus on dyslexia and ADHD. This project provides accessible, empowering AI interactions tailored to the unique cognitive strengths and challenges of neurodivergent minds.

## 🌟 Project Vision

To create an LLM-powered tool that understands and adapts to neurodivergent communication styles, provides dyslexia-friendly formatting, and offers specialized prompts and strategies for common challenges faced by dyslexic individuals and their support networks.

## ✨ Key Features

### 🎯 **Comprehensive Prompt Library** (NEW!)
- **107+ specialized prompts** designed for the dyslexic community
- **12 categories** covering reading, writing, organization, confidence, advocacy, and more
- **Strategic & Socratic prompts** for both action and understanding
- **5 user types** - Students, Parents, Professionals, Teachers, General
- **Advanced search & filtering** - Find exactly what you need
- **Usage analytics** - Track what works best

### 🧠 **Cognitive Processing**
- Adaptive content simplification
- Complexity analysis
- Cognitive load optimization
- Context-aware responses

### ♿ **Accessibility Features**
- Dyslexia-friendly fonts (OpenDyslexic)
- Customizable spacing and contrast
- Text-to-speech integration
- Visual stress reduction
- Format adaptation

### 🔒 **Privacy & Security**
- Data protection for sensitive information
- Secure authentication
- Privacy-first design

### 📊 **Monitoring & Analytics**
- Performance tracking
- Error monitoring
- Usage analytics
- System health monitoring

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/iveymatt/dyslexic-ai-project.git
cd dyslexic-ai-project

# Run setup script
./scripts/setup.sh
```

### Using the Prompt Library

```python
from src.prompts import PromptManager

# Initialize the prompt manager
manager = PromptManager()

# Example 1: Student needs help with reading
prompt = manager.get_prompt("read_no_remember")
filled = prompt.fill_template(
    number="5",
    material_type="biology textbook",
    paste="[Your text here...]"
)

# Example 2: Parent preparing for IEP meeting
iep_prompt = manager.get_prompt("prepare_iep_meeting")
filled = iep_prompt.fill_template(
    date="March 15th",
    specific_support="extended time and audiobooks"
)

# Example 3: Professional writing an important email
email_prompt = manager.get_prompt("crucial_email")
filled = email_prompt.fill_template(
    recipient="my supervisor",
    topic="requesting accommodations"
)
```

### Integration with LLM

```python
from src.prompts import PromptManager
from src.core.model_integration import ModelIntegrationManager

# Initialize managers
prompt_mgr = PromptManager()
model_mgr = ModelIntegrationManager()

# Get a prompt for the user's situation
prompt = prompt_mgr.get_prompt("ideas_to_paper")

# Fill in user's specific details
filled_prompt = prompt.fill_template(
    type="email",
    explain="I need to tell my team about the project delay"
)

# Process with the LLM
response = model_mgr.process_request(filled_prompt)

# Track usage
prompt_mgr.record_usage(prompt.id)
```

## 📚 Documentation

- **[Prompt Library Guide](docs/guides/PROMPT_LIBRARY_GUIDE.md)** - Complete guide to using the 107+ prompts
- **[Technical Architecture](docs/technical/architecture.md.rtf)** - System design and components
- **[API Documentation](docs/technical/api_documentation.md.rtf)** - API reference
- **[Developer Guide](docs/guides/developer_guide.md.rtf)** - Contributing and development

## 🗂️ Project Structure

```
dyslexic-ai-project/
├── src/
│   ├── prompts/                   # 🆕 Prompt Library System
│   │   ├── library/
│   │   │   └── dyslexia_prompt_library.json
│   │   ├── prompt_manager.py
│   │   ├── prompt_templates.py
│   │   └── README.md
│   ├── core/                      # Core AI functionality
│   │   ├── model_integration.py
│   │   ├── processing_manager.py
│   │   ├── accessibility_manager.py
│   │   └── system_config.py
│   ├── ml/                        # Machine Learning components
│   │   ├── model_manager.py
│   │   ├── adaptation_engine.py
│   │   └── cognitive_processor.py
│   ├── api/                       # API layer
│   │   ├── api_manager.py
│   │   └── response_formatter.py
│   ├── security/                  # Security components
│   └── monitoring/                # Monitoring & analytics
├── config/                        # Configuration files
│   ├── prompts.yaml              # 🆕 Prompt library config
│   ├── config.yaml
│   └── default_config.yaml
├── docs/                          # Documentation
│   ├── guides/
│   │   └── PROMPT_LIBRARY_GUIDE.md  # 🆕
│   └── technical/
├── examples/                      # Usage examples
│   └── prompt_library_examples.py   # 🆕
├── tests/                         # Test suites
│   └── prompts/                  # 🆕 Prompt library tests
└── scripts/                       # Utility scripts
```

## 🎯 Use Cases

### For Students
- **Reading assistance** - Break down complex texts, improve comprehension
- **Writing support** - Organize ideas, fix spelling, professional communication
- **Study strategies** - Create effective study methods for dyslexic brains
- **Time management** - Track assignments, manage deadlines
- **Confidence building** - Overcome imposter syndrome, recognize strengths

### For Parents
- **School advocacy** - Navigate IEPs/504s, communicate with teachers
- **Homework help** - Make assignments manageable, reduce stress
- **Understanding dyslexia** - Learn about your child's needs
- **Finding resources** - Identify tutors, programs, tools
- **Emotional support** - Help build your child's confidence

### For Professionals
- **Workplace accommodations** - Request and implement support
- **Professional communication** - Write emails, reports, presentations
- **Error management** - Systems to catch and prevent mistakes
- **Disclosure decisions** - When and how to share about dyslexia
- **Career confidence** - Overcome workplace challenges

### For Teachers
- **Accessible lesson design** - Make materials dyslexia-friendly
- **Differentiated instruction** - Teach to neurodivergent strengths
- **Accommodation implementation** - Provide effective support
- **Student understanding** - Recognize dyslexia behaviors
- **Strength-based teaching** - Build confidence, not just fix weaknesses

## 🔧 Configuration

The system is highly configurable via YAML files:

### Prompt Library Configuration (`config/prompts.yaml`)
- Library path and loading
- Default filters and search settings
- Usage tracking and analytics
- Custom prompts support
- Display and accessibility settings

### Main System Configuration (`config/config.yaml`)
- Accessibility preferences (fonts, spacing, colors)
- Model settings (temperature, tokens, etc.)
- Processing options
- Security settings

## 📊 Prompt Library Categories

1. **Reading Struggles** - Comprehension, speed, reading anxiety
2. **Writing Challenges** - Spelling, organization, professional writing
3. **Organization & Executive Function** - Time management, task completion
4. **Confidence & Self-Esteem** - Imposter syndrome, building confidence
5. **Social & Disclosure** - When/how to tell others about dyslexia
6. **Accommodations & Advocacy** - Requesting support at school/work
7. **Tools & Strategies** - Finding and using assistive technology
8. **Understanding Dyslexia** - Learning about dyslexia itself
9. **Parent Prompts** - Supporting dyslexic children
10. **Student Prompts** - School-specific challenges
11. **Professional/Adult Prompts** - Workplace challenges
12. **Teacher/Educator Prompts** - Teaching dyslexic students effectively

## 🔬 Technical Stack

- **Language**: Python 3.8+
- **LLM Integration**: Claude AI (Anthropic)
- **Data Storage**: JSON-based prompt library
- **Configuration**: YAML
- **Testing**: unittest
- **Monitoring**: Custom analytics engine

## 🤝 Contributing

We welcome contributions from the neurodivergent community and allies!

### Ways to Contribute:
- **Add prompts** - Share prompts that have worked for you
- **Improve documentation** - Help others understand the system
- **Report bugs** - Help us improve reliability
- **Suggest features** - Share ideas for new functionality
- **Share stories** - Help us understand real-world needs

### Contribution Guidelines:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Update documentation
6. Submit a pull request

## 🛣️ Roadmap

### Current (v1.0)
- ✅ Comprehensive prompt library (107+ prompts)
- ✅ Advanced search and filtering
- ✅ Usage analytics
- ✅ Template system

### Planned (v1.1)
- [ ] Web interface for prompt browsing
- [ ] User accounts and favorites
- [ ] Community-contributed prompts
- [ ] Prompt suggestions based on usage patterns
- [ ] Mobile app

### Future (v2.0)
- [ ] Real-time LLM integration
- [ ] Voice interface
- [ ] Multi-language support
- [ ] Personalized prompt recommendations
- [ ] Integration with assistive technology tools

## 📈 Research & Evidence

This project is informed by:
- Research on dyslexia and cognitive processing
- Input from the dyslexic community
- Evidence-based educational practices
- Accessibility standards (WCAG, Section 508)
- User-centered design principles

## 📝 License

[Specify your license here]

## 🙏 Acknowledgments

- The dyslexic community for sharing their experiences and needs
- Educators and researchers in learning differences
- Contributors and supporters of neurodiversity

## 📬 Contact & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/iveymatt/dyslexic-ai-project/issues)
- **Discussions**: [Join the conversation](https://github.com/iveymatt/dyslexic-ai-project/discussions)
- **Documentation**: [Full docs](docs/guides/PROMPT_LIBRARY_GUIDE.md)

## 🌈 About Neurodiversity

This project embraces the neurodiversity paradigm - the understanding that neurological differences like dyslexia are natural variations of human cognition, not deficits to be "fixed." Our goal is to provide tools that work WITH neurodivergent minds, leveraging their unique strengths while providing support for challenges.

---

**Built with 💜 for the neurodivergent community**

*Version 1.0.0 - Last Updated: 2025-11-04*
