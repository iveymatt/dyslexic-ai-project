from dyslexic_ai import DyslexicAI

async def main():
    # Initialize system
    ai = DyslexicAI(
        config_path="config/config.yaml",
        user_preferences={
            "font_family": "OpenDyslexic",
            "text_spacing": 1.5,
            "color_scheme": "high_contrast"
        }
    )

    # Process text content
    result = await ai.process_content(
        content="Your text content here",
        user_id="user123",
        context={
            "content_type": "article",
            "adaptation_level": "high"
        }
    )

    print(f"Processed content: {result.content}")
    print(f"Adaptations applied: {result.adaptations}")