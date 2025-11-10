# DreamZilla Curriculum - Quick Start Guide

## 📁 File Locations

### Core Modules (src/curriculum:/)
- `life_skills_manager.py.rtf` - 6-week life skills curriculum
- `career_development.py.rtf` - Career exploration & job matching
- `cognitive_partner.py.rtf` - Conversational AI interface
- `__init__.py.rtf` - Module initialization

### Configuration
- `config/curriculum_config.yaml.rtf` - Curriculum settings

### Documentation
- `docs/guides:/curriculum_guide.md.rtf` - Complete guide

## 🔍 Ways to View Files Locally

### Option 1: Direct Terminal View
```bash
# View life skills manager
cat src/curriculum:/life_skills_manager.py.rtf

# View career development
cat src/curriculum:/career_development.py.rtf

# View cognitive partner
cat src/curriculum:/cognitive_partner.py.rtf

# View configuration
cat config/curriculum_config.yaml.rtf

# View documentation
cat docs/guides:/curriculum_guide.md.rtf
```

### Option 2: Use the Viewer Script
```bash
./scripts/view_curriculum.sh
```

### Option 3: Use less for Scrolling
```bash
# Scroll through files with less
less src/curriculum:/life_skills_manager.py.rtf

# Use arrow keys to scroll
# Press 'q' to quit
```

### Option 4: Use grep to Search
```bash
# Search for specific content
grep -n "CognitiveDiscoveryGPT" src/curriculum:/life_skills_manager.py.rtf

# Search all curriculum files
grep -r "WeekModule" src/curriculum:/
```

### Option 5: Open in Text Editor
```bash
# Open with nano
nano src/curriculum:/life_skills_manager.py.rtf

# Open with vim
vim src/curriculum:/life_skills_manager.py.rtf

# Open with any editor you have installed
```

### Option 6: View File Structure
```bash
# See file sizes and info
ls -lh src/curriculum:/

# Count lines in each file
wc -l src/curriculum:/*.rtf
```

## 📊 File Overview

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| life_skills_manager.py.rtf | ~26KB | ~800 | 6-week curriculum implementation |
| career_development.py.rtf | ~24KB | ~750 | Career exploration & matching |
| cognitive_partner.py.rtf | ~25KB | ~750 | Conversational AI interface |
| __init__.py.rtf | ~1KB | ~30 | Module exports |
| curriculum_config.yaml.rtf | ~5KB | ~400 | Configuration settings |
| curriculum_guide.md.rtf | ~15KB | ~700 | Complete documentation |

## 🎯 Quick Navigation Commands

### View specific modules in Life Skills Manager:
```bash
# Week 1: Cognitive Discovery
grep -A 30 "cognitive_discovery_gpt" src/curriculum:/life_skills_manager.py.rtf

# Week 2: Executive Function
grep -A 30 "executive_function_coach_gpt" src/curriculum:/life_skills_manager.py.rtf

# Week 3: Reset Routine
grep -A 30 "reset_routine_builder_gpt" src/curriculum:/life_skills_manager.py.rtf

# Week 4: Energy Audit
grep -A 30 "energy_audit_and_boundary_gpt" src/curriculum:/life_skills_manager.py.rtf

# Week 5: Self-Advocacy
grep -A 30 "self_advocacy_trainer_gpt" src/curriculum:/life_skills_manager.py.rtf

# Week 6: Sustainability
grep -A 30 "sustainability_planner_gpt" src/curriculum:/life_skills_manager.py.rtf
```

### View Career Development Features:
```bash
# Job Discovery
grep -A 20 "job_discovery_gpt" src/curriculum:/career_development.py.rtf

# AI Disruption Analysis
grep -A 20 "ai_disruption_analysis" src/curriculum:/career_development.py.rtf

# Learning Paths
grep -A 20 "generate_learning_path" src/curriculum:/career_development.py.rtf

# AI Literacy
grep -A 20 "ai_literacy_trainer" src/curriculum:/career_development.py.rtf
```

### View Cognitive Partner Features:
```bash
# Conversation modes
grep -A 20 "start_conversation" src/curriculum:/cognitive_partner.py.rtf

# User input processing
grep -A 20 "process_user_input" src/curriculum:/cognitive_partner.py.rtf

# Weekly check-ins
grep -A 20 "weekly_check_in" src/curriculum:/cognitive_partner.py.rtf

# Progress reports
grep -A 20 "generate_progress_report" src/curriculum:/cognitive_partner.py.rtf
```

## 💻 Using the Files in Code

### Import Example:
```python
from src.curriculum import LifeSkillsManager, WeekModule
from src.curriculum import CareerDevelopmentManager
from src.curriculum import CognitivePartner, ConversationMode

# Initialize
config = {...}
life_skills = LifeSkillsManager(config)
career = CareerDevelopmentManager(config)
partner = CognitivePartner(config)
```

## 🔗 Related Files

Your curriculum integrates with these existing modules:
- `src/core:/accessibility_manager.py.rtf` - Dyslexic-friendly formatting
- `src/core:/processing_manager.py.rtf` - Content processing
- `src/ml:/cognitive_processor.py.rtf` - Cognitive load analysis

## 📝 Notes

- All files use RTF format to match your existing codebase
- Content is readable in any text editor
- RTF markup is just formatting - the Python/YAML code is preserved
- Files follow the same structure as your existing modules

## 🆘 Need Help?

Run the interactive viewer:
```bash
./scripts/view_curriculum.sh
```

Or view the complete guide:
```bash
cat docs/guides:/curriculum_guide.md.rtf | less
```
