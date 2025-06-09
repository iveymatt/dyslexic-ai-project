#!/bin/bash
# Dyslexic AI Installation Script
echo "Starting Dyslexic AI Installation..."

# Create virtual environment
python3 -m venv dyslexic_ai_env

# Activate virtual environment
source dyslexic_ai_env/bin/activate

# Install core dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Setup configuration
mkdir -p config
cp config/default_config.yaml config/config.yaml

# Initialize database
python scripts/init_db.py

# Run initial tests
pytest tests/

echo "Installation complete! Please configure config/config.yaml before proceeding."
