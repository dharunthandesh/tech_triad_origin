import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

key = os.environ.get("GEMINI_API_KEY")
print(f"Testing key: {key[:5]}...{key[-5:]}")

genai.configure(api_key=key)

try:
    model = genai.GenerativeModel('gemini-2.5-flash')
    response = model.generate_content("Hello")
    print("Success:", response.text)
except Exception as e:
    print("Failed!")
    print(e)
