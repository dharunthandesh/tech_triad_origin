import os
from dotenv import load_dotenv
import requests

load_dotenv()
key = os.environ.get("OPENROUTER_API_KEY")
headers = {"Authorization": f"Bearer {key}"}
r = requests.get("https://openrouter.ai/api/v1/models", headers=headers)
models = r.json().get("data", [])
free = [m["id"] for m in models if ":free" in m["id"]]
print(f"Found {len(free)} free models:")
for m in free[:30]:
    print(" -", m)
