import os

try:
    import openai
except ImportError:  # pragma: no cover - minimal example
    openai = None


def chunk_text(text: str, width: int = 80) -> str:
    """Split text into lines of at most ``width`` characters."""
    return "\n".join(text[i:i + width] for i in range(0, len(text), width))


def speak_text(text: str) -> None:
    """Attempt to speak ``text`` using ``pyttsx3``.

    If the library is not installed, falls back to printing a notice
    alongside the plain text output.
    """
    try:
        import pyttsx3
    except Exception:  # pragma: no cover - optional dependency
        print("[speech unavailable]" )
        print(text)
        return

    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()


def run_chat() -> None:
    """Simple dyslexia-friendly chat loop using OpenAI's API.

    The assistant responds with concise sentences. Responses are
    chunked to reduce visual overload and optionally spoken aloud.
    """
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY environment variable is required")

    if openai is None:
        raise RuntimeError("The 'openai' package is required to run the demo")

    openai.api_key = api_key

    print("Dyslexic-friendly Chat MVP. Type 'exit' to quit.\n")
    while True:
        user_text = input("You: ")
        if user_text.strip().lower() in {"exit", "quit"}:
            break

        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful assistant that supports dyslexic "
                        "thinkers. Use clear, short sentences."
                    ),
                },
                {"role": "user", "content": user_text},
            ],
        )
        reply = completion["choices"][0]["message"]["content"].strip()
        print("\nAssistant:\n" + chunk_text(reply) + "\n")
        speak_text(reply)


if __name__ == "__main__":
    run_chat()
