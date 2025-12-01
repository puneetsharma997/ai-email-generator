AI Email Generator

A fully responsive, AI-powered email generation platform engineered to elevate communication workflows. This solution integrates a modern React interface, secure Supabase authentication, state management powered by Zustand, and a lightweight Express.js backend that orchestrates prompt generation. The system delivers a seamless, end-to-end experience for generating high-quality emails with minimal manual effort.

🚀 Tech Stack

Frontend

React

Ant Design

Zustand

Backend

Express.js

Supabase Authentication

Google Generative AI (or any LLM API)

Other

Vite

Node.js

REST APIs

📌 Key Features

Fully responsive UI across all devices

AI-powered email generation with custom prompts

Clean and modern UI using Ant Design

Zustand for lightweight global state management

Supabase for authentication and user management

Express.js backend for routing and prompt generation

Usage tracking and toast-based notifications

Modular, scalable architecture

📁 Project Structure
ai-email-generator/
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   ├── hooks/
│   │   └── assets/
│   └── public/
│
│── backend/
│   ├── routes/
│   ├── controllers/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
└── README.md

⚙️ Installation & Setup
1. Clone the repository
git clone https://github.com/your-username/ai-email-generator.git
cd ai-email-generator

2. Frontend Setup
cd frontend
npm install


Create a .env file in /frontend:

VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
VITE_API_URL=http://localhost:5000


Run the frontend:

npm run dev

3. Backend Setup
cd ../backend
npm install


Create a .env file in /backend:

PORT=5000
SUPABASE_URL=your-url
SUPABASE_SERVICE_KEY=your-key
GOOGLE_GENAI_API_KEY=your-key


Run the backend:

npm start

▶️ How It Works

User inputs email context

Frontend triggers backend API

API builds structured prompt

AI model generates the email

Response displayed in UI