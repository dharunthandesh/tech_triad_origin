import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

try:
    print("Listing models...")
    for m in genai.list_models():
        print(f"Name: {m.name}, Supported: {m.supported_generation_methods}")
except Exception as e:
    print("Error listing models:", e)
