# Glamour Studio AI Receptionist

An AI-powered virtual receptionist for hair salons that handles voice calls (Twilio) and WhatsApp messages (Meta Cloud API). Features a high-impact React dashboard for real-time lead analytics.

## 🚀 Tech Stack
- **Backend**: Python, Flask, Google Gemini AI, Supabase.
- **Frontend**: React.js, Vite, Recharts, Lucide-React.
- **Infrastructure**: Twilio, Meta Cloud API, Ngrok.

## 📁 Structure
- `/backend`: Flask API and AI conversation logic.
- `/frontend`: React dashboard source code.

## 🛠️ Setup & Installation

### 1. Backend Setup
1. Navigate to `/backend`.
2. Install dependencies: `pip install -r requirements.txt`.
3. Create a `.env` file with your credentials (see example in code).
4. Run the server: `python app.py`.

### 2. Frontend Setup
1. Navigate to `/frontend`.
2. Install dependencies: `npm install`.
3. Build the dashboard: `npm run build`.
4. The backend will automatically serve the dashboard from the `dist` folder.

## 📊 Features
- AI Voice booking confirmation.
- WhatsApp automation.
- Real-time dashboard with charts.
- Supabase integration for lead persistence.
