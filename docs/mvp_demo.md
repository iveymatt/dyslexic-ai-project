# MVP Demo

This demo showcases a minimal dyslexic-friendly chat experience.  The
script connects to OpenAI's API, chunks responses into shorter lines and
speaks them aloud when the optional `pyttsx3` package is available.

## Requirements
- Python 3.8+
- `openai` package
- `pyttsx3` for text-to-speech (optional)
- An `OPENAI_API_KEY` environment variable

## Usage
```bash
pip install openai pyttsx3  # optional
export OPENAI_API_KEY="YOUR_KEY"
python examples/mvp_demo.py
```

Type your question at the prompt and the assistant will answer with
short, clear sentences.  Type `exit` to quit.
