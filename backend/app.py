import os
import requests
from flask import Flask, request, jsonify, Response, send_from_directory
from twilio.twiml.voice_response import VoiceResponse, Gather
from bot import get_ai_response
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = Flask(__name__)

# ─── Config ───────────────────────────────────────────────────────────────────
VERIFY_TOKEN    = os.environ.get("WEBHOOK_VERIFY_TOKEN", "salon_secret_123")
NGROK_URL       = os.environ.get("NGROK_URL", "").rstrip("/")

def log(message):
    print(message)
    with open("debug_log.txt", "a", encoding="utf-8") as f:
        f.write(f"[{datetime.now()}] {message}\n")

def abs_url(path):
    return f"{NGROK_URL}{path}" if NGROK_URL else path

# ─── Dashboard Routes ──────────────────────────────────────────────────────────
@app.route("/", methods=["GET"])
def index():
    return send_from_directory('../frontend/dist', 'index.html')

@app.route("/assets/<path:path>")
def serve_assets(path):
    return send_from_directory('../frontend/dist/assets', path)

@app.route("/api/stats", methods=["GET"])
def get_stats():
    # This can be made dynamic later to pull from Supabase/Excel
    return jsonify({
        "total_leads": 842,
        "bookings_today": 47,
        "missed_calls_recovered": 156,
        "conversion_rate": 68
    })

# ─── Voice: Entry ─────────────────────────────────────────────────────────────
@app.route("/voice", methods=["POST"])
def voice_callback():
    resp = VoiceResponse()
    gather = Gather(input="speech", action=abs_url("/handle-speech"),
                    method="POST", timeout=5, speechTimeout="auto")
    gather.say("Hello! Thank you for calling Glamour Studio. How can I help you today?",
               voice="alice", language="en-IN")
    resp.append(gather)
    resp.say("I didn't hear anything. Goodbye!", voice="alice", language="en-IN")
    log("[CALL] Incoming call - sent greeting TwiML")
    return Response(str(resp), mimetype="text/xml")

# ─── Voice: Handle Each Turn ──────────────────────────────────────────────────
@app.route("/handle-speech", methods=["POST"])
def handle_speech():
    speech = request.form.get("SpeechResult", "").strip()
    caller = request.form.get("From", "unknown")
    log(f"[SPEECH] [{caller}] Said: '{speech}'")

    resp = VoiceResponse()

    if speech:
        try:
            ai_reply = get_ai_response(speech, caller, channel="Voice")
        except Exception as e:
            log(f"[ERROR] AI Error: {e}")
            ai_reply = "I'm sorry, I had a small issue. Could you please repeat that?"

        log(f"[AI] [{caller}] AI: {ai_reply}")
        gather = Gather(input="speech", action=abs_url("/handle-speech"),
                        method="POST", timeout=5, speechTimeout="auto")
        gather.say(ai_reply, voice="alice", language="en-IN")
        resp.append(gather)
        resp.say("Are you still there? Please go ahead.", voice="alice", language="en-IN")
    else:
        gather = Gather(input="speech", action=abs_url("/handle-speech"),
                        method="POST", timeout=5, speechTimeout="auto")
        gather.say("Sorry, I didn't catch that. Please say it again.",
                   voice="alice", language="en-IN")
        resp.append(gather)

    return Response(str(resp), mimetype="text/xml")

# ─── WhatsApp Webhook ─────────────────────────────────────────────────────────
@app.route("/whatsapp", methods=["GET", "POST"])
def whatsapp_webhook():
    if request.method == "GET":
        mode      = request.args.get("hub.mode")
        token     = request.args.get("hub.verify_token")
        challenge = request.args.get("hub.challenge")
        if mode == "subscribe" and token == VERIFY_TOKEN:
            log("[SUCCESS] Meta Webhook VERIFIED!")
            return challenge, 200
        return "Forbidden", 403

    data = request.get_json()
    log(f"[WHATSAPP_RAW] {data}")

    if data and data.get("object") == "whatsapp_business_account":
        for entry in data.get("entry", []):
            for change in entry.get("changes", []):
                value = change.get("value", {})
                if "messages" in value:
                    msg    = value["messages"][0]
                    sender = msg["from"]
                    if msg["type"] == "text":
                        text = msg["text"]["body"]
                        log(f"[MESSAGE_RCV] From {sender}: {text}")
                        try:
                            reply = get_ai_response(text, sender, channel="WhatsApp")
                        except Exception as e:
                            log(f"[ERROR] AI Error: {e}")
                            reply = "I'm sorry, I'm having a little trouble right now! Please try again."
                        log(f"[MESSAGE_SND] Reply to {sender}: {reply}")
                        send_whatsapp_message(sender, reply)
        return jsonify({"status": "ok"}), 200
    return "Not Found", 404

# ─── Send WhatsApp ────────────────────────────────────────────────────────────
def send_whatsapp_message(to, text):
    load_dotenv(override=True)
    token    = os.environ.get("WHATSAPP_ACCESS_TOKEN")
    phone_id = os.environ.get("WHATSAPP_PHONE_NUMBER_ID")
    if not token or not phone_id:
        log("[ERROR] Missing WhatsApp credentials")
        return
    r = requests.post(
        f"https://graph.facebook.com/v18.0/{phone_id}/messages",
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
        json={"messaging_product": "whatsapp", "to": to, "type": "text", "text": {"body": text}}
    )
    log(f"[META_API] {r.status_code} - {r.text}")

# ─── Run ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    app.run(port=4000, debug=False, use_reloader=False)
