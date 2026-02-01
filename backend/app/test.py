import os
from dotenv import load_dotenv
from pathlib import Path
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY") 

# Debugging print
if api_key is None:
    print("CRITICAL: GEMINI_API_KEY not found in environment!")
else:
    print(f"API Key found: {api_key[:5]}...") # Prints first 5 chars for safety