#!/bin/bash
# Curriculum File Viewer
# Quick script to view curriculum files in the terminal

echo "========================================="
echo "   DreamZilla Curriculum Viewer"
echo "========================================="
echo ""
echo "Available Files:"
echo ""
echo "1. Life Skills Manager (life_skills_manager.py.rtf)"
echo "2. Career Development (career_development.py.rtf)"
echo "3. Cognitive Partner (cognitive_partner.py.rtf)"
echo "4. Module Init (__init__.py.rtf)"
echo "5. Configuration (curriculum_config.yaml.rtf)"
echo "6. Documentation (curriculum_guide.md.rtf)"
echo "7. View all files"
echo "8. Exit"
echo ""
read -p "Select a file to view (1-8): " choice

case $choice in
    1)
        echo ""
        echo "=== Life Skills Manager ==="
        echo ""
        cat src/curriculum:/life_skills_manager.py.rtf
        ;;
    2)
        echo ""
        echo "=== Career Development ==="
        echo ""
        cat src/curriculum:/career_development.py.rtf
        ;;
    3)
        echo ""
        echo "=== Cognitive Partner ==="
        echo ""
        cat src/curriculum:/cognitive_partner.py.rtf
        ;;
    4)
        echo ""
        echo "=== Module Init ==="
        echo ""
        cat src/curriculum:/__init__.py.rtf
        ;;
    5)
        echo ""
        echo "=== Configuration ==="
        echo ""
        cat config/curriculum_config.yaml.rtf
        ;;
    6)
        echo ""
        echo "=== Documentation ==="
        echo ""
        cat docs/guides:/curriculum_guide.md.rtf
        ;;
    7)
        echo ""
        echo "=== All Curriculum Files ==="
        echo ""
        ls -lah src/curriculum:/
        ls -lah config/curriculum_config.yaml.rtf
        ls -lah docs/guides:/curriculum_guide.md.rtf
        ;;
    8)
        echo "Exiting..."
        exit 0
        ;;
    *)
        echo "Invalid choice"
        ;;
esac
