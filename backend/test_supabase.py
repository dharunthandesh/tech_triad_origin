import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv(override=True)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_KEY")

print(f"Connecting to: {url}")
supabase = create_client(url, key)

try:
    data = {
        "customer_name": "Test User",
        "service": "Test Service",
        "appointment_time": "12:00 PM",
        "phone_number": "1234567890"
    }
    result = supabase.table("bookings").insert(data).execute()
    print("Success! Row inserted.")
    print(result.data)
except Exception as e:
    print("Failed!")
    print(e)
