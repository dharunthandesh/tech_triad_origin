# 💇‍♂️ GlamourStudio AI

> **AI Business Autopilot** — A 24/7 intelligent multi-channel assistant that automates WhatsApp messaging and Voice call handling for local businesses, capturing leads and managing bookings with human-like contextual intelligence.

![License](https://img.shields.io/badge/license-MIT-blue)
![Stack](https://img.shields.io/badge/stack-Flask%20%7C%20React%20%7C%20Gemini-orange)
![Status](https://img.shields.io/badge/status-MVP--Ready-brightgreen)

---

## 📌 Problem Statement

**AI Business Autopilot — Intelligent Multi-Channel Assistant for Local Businesses**

Local businesses across India struggle with limited manpower, leading to missed calls, delayed responses to WhatsApp messages, and lost revenue. Hiring dedicated staff is financially unviable, and current chatbot solutions are often too generic or complex for non-technical users. There is a critical need for an easy-to-deploy, cost-effective system that qualifies leads and manages appointments in real-time across multiple channels.

---

## 🚀 Features

| Feature | Description |
|---|---|
| 🎙️ Text-based IVR | Automated logic that answers voice calls via Twilio, interacts using speech, and captures intent. |
| 💬 WhatsApp Automation | 24/7 intelligent replies to customer queries on WhatsApp using business-specific context. |
| 📅 Slot Booking | AI-driven appointment scheduling that extracts date, time, and service details automatically. |
| 📊 Admin Dashboard | A high-impact React interface showing total leads, conversion rates, and recent interactions. |
| 🗄️ Multi-Layer Storage | Leads are persisted to Supabase (Cloud SQL) for reliability and Excel for local accessibility. |
| 🚨 Lead Qualification | Automatically categorizes incoming messages and flags high-value potential bookings. |

---

## 🏗️ Tech Stack

### Frontend
- **React.js 18** — Component-based stateful UI.
- **Vite** — Optimized build-pipeline and bundling.
- **Recharts** — SVG-based interactive data visualization.
- **Lucide Icons** — Consistent, minimal iconography.

### Backend
- **Python / Flask** — Core microservice handling webhooks and routing.
- **Google Gemini 1.5 Flash** — Large Language Model for human-like reasoning and data extraction.
- **Supabase (Postgres)** — Secure, cloud-hosted relational lead storage.
- **Twilio API** — Programmable Telephony for voice interaction.
- **Meta Cloud API** — Official WhatsApp Business integration.

---

## 📂 Project Structure

```
GlamourStudio_AI/
├── backend/
│   ├── app.py              # Flask server, route logic, and API endpoints
│   ├── bot.py              # Gemini AI integration and Lead extraction logic
│   ├── .env                # API Credentials (Gemini, Twilio, Supabase)
│   ├── requirements.txt    # Backend dependencies
│   └── bookings.xlsx       # Local fail-safe Excel database
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Multi-view React Dashboard logic
│   │   ├── index.css       # Premium 'Weblynk' design system
│   │   └── main.jsx        # React DOM mounting
│   ├── dist/               # Minified production assets
│   └── package.json        # Frontend scripts and dependencies
│
└── README.md               # Hackathon Documentation
```

---

## ⚙️ Installation & Setup

### 1. Repository Setup
```bash
git clone https://github.com/dharunthandesh/tech_triad_origin.git
cd tech_triad_origin
```

### 2. Backend Initialization
```bash
cd backend
pip install -r requirements.txt
# Update .env with your GEMINI_API_KEY and SUPABASE context
python app.py
```

### 3. Frontend Initialization
```bash
cd frontend
npm install
npm run build
# The backend automatically serves the build at http://localhost:4000
```

---

## 🧠 How It Works

### Unified Lead Capture Flow
1. **Interaction**: A customer sends a WhatsApp message or calls the salon number (via Twilio).
2. **Contextual Processing**: The raw audio (transcribed) or text is sent to the Flask backend. 
3. **AI Reasoning**: Gemini 1.5 Flash analyzes the message against business-specific rules. It identifies the customer's name, requested service (e.g., Haircut), and time.
4. **Structured Output**: AI returns a JSON string: `DATA:{"name": "Dharun", "service": "Haircut", "time": "5PM"}`.
5. **Database Sync**: The backend parses this JSON and simultaneously inserts a row into **Supabase** and appends to the **Excel** backup.
6. **Dashboard Refresh**: The React frontend polls the `/api/stats` endpoint, updating the "Total Leads" count and Charts in real-time.

---

## 📈 Scalability
*   **Asynchronous Processing**: By offloading data extraction to Gemini's highly efficient Flash model, the system handles concurrent requests with sub-dual-second latency.
*   **Database Scalability**: Supabase provides an auto-scaling PostgreSQL instance that can handle millions of concurrent rows for enterprise expansion.
*   **Multi-Industry Ready**: The system prompt is modular; it can be "reskinned" from a Salon bot to a Clinic or Restaurant bot by changing a single variable in `bot.py`.

---

## 💡 Feasibility
GlamourStudio AI is highly feasible for the Indian market because it utilizes **WhatsApp**, the primary communication channel in the region. By avoiding expensive local servers and using cloud-native tools (Supabase, Gemini), the operational cost per lead is negligible (less than ₹0.10/query), making it a viable SaaS product for local businesses.

---

## 🌟 Novelty
Most chatbots require users to follow strict "button" flows. GlamourStudio AI uses **Zero-Shot Entity Extraction**. A user can say, "Hey, can I come in for a quick trim tomorrow around noon? My name is Dharun," and the system correctly extracts the service, date, and name from a single natural sentence, updating the professional dashboard instantly.

---

## 🔧 Feature Depth
*   **Graceful Degradation**: If the Gemini API is rate-limited, the system automatically sends a "technical issue" fallback message to maintain professional continuity.
*   **Zero-Config UI**: The dashboard is fully responsive; salon owners can monitor leads on their phone as easily as on a desktop.
*   **ASCII Stability**: All backend logging was scrubbed to be ASCII-safe, preventing crashes on Windows-based terminal environments—a common issue in local Indian business setups.

---

## 📜 License
Licensed under the [MIT License](LICENSE).

---

## 👥 Authors
*   **Dharun Thandesh** — [dharunthandesh4@gmail.com](mailto:dharunthandesh4@gmail.com) | [GitHub](https://github.com/dharunthandesh)
*   **Jagadish S** — [jagadishsoundar07@gmail.com](mailto:jagadishsoundar07@gmail.com)
*   **Dharan J S** — [dharanjs07@gmail.com](mailto:dharanjs07@gmail.com)
