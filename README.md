<h1 align="center">✨ AI Email Generator ✨</h1>

A fully responsive, AI-driven communication platform designed to accelerate and enhance professional email creation. The system leverages a modern frontend architecture with an intuitive UI, integrates secure authentication flows, and utilizes streamlined global state management for consistent user experiences. On the backend, a lightweight yet robust orchestration layer manages prompt generation and LLM interactions, delivering accurate, context-aware emails in real time. The result is an end-to-end solution that simplifies communication workflows and empowers users to produce high-quality emails with minimal effort.


## 🚀 **Tech Stack**

### **Frontend**
- ⚛️ React
- 🎨 Ant Design
- 🌐 Zustand

### **Backend**
- 🚂 Express.js
- 🔐 Supabase Authentication
- 🤖 Grok API

### **Other**
- ⚡ Vite
- 🟢 Node.js
- 🔌 REST APIs

---

## 📌 **Key Features**
- 📱 Fully responsive UI optimized for all devices
- 🤖 AI-powered email generation with dynamic prompts
- 🧩 Clean and modern UI with Ant Design
- ⚡ Lightweight global state using Zustand
- 🔒 Secure authentication with Supabase
- 🔧 Express.js backend for routing and business logic

---

## ▶️ **How It Works**
- User inputs email context
- Frontend triggers backend API
- API builds structured prompt
- AI model generates the email
- Response displayed in UI

---

## ⚙️ **Installation & Setup**
```sh

1. Clone the repository
git clone https://github.com/your-username/ai-email-generator.git
cd ai-email-generator

2. Frontend Setup
cd frontend
npm install

Create a .env file in /frontend:
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
VITE_BASE_URL=http://localhost:5173 (frontend server url)
VITE_API_BASE_URL=http://localhost:5000 (backend server url)

Run the frontend:
npm run dev

3. Backend Setup
cd ../backend
npm install


Create a .env file in /backend:
AI_API_KEY=your-ai-api-key
SUPABASE_URL=your-url
SUPABASE_SERVICE_ROLE_KEY=your-key
SUPABASE_ANON_KEY=your-key
DAILY_LIMIT=3

Run the backend:
npm run dev
```

---
