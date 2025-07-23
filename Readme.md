🗳️ Real-Time Polling System (Backend + HTML Testing Interface)
A complete real-time polling system that allows users to:

Register, login, logout, and manage sessions (REST)

Create, fetch, and manage polls (REST)

Vote and toggle poll status (via Socket.IO)

Test everything using a minimal HTML/CSS/JS interface

🧩 Tech Stack
🔧 Backend:
Node.js + Express

MongoDB + Mongoose

JWT-based authentication with refresh tokens

Cookies for secure session management

REST API + Socket.IO for real-time interactions

💻 Frontend Tester:
HTML + CSS + JavaScript (vanilla)

Socket.IO Client

Interactive testing UI for API & sockets

🚀 Features Overview
✅ Authentication (REST)
POST /api/users/register

POST /api/users/login

POST /api/users/logout

POST /api/users/refresh-token

GET /api/users/me

📋 Poll Management (REST)
POST /api/users/create-new-poll

GET /api/users/get-all-polls

GET /api/users/get-active-polls

GET /api/users/get-your-polls

🔁 Real-Time Features (Socket.IO)
Connect via access token: socket.auth.token

vote: Vote for an option

togglePoll: Change poll status (active/inactive)

Emits:

voteUpdate

pollStatusChanged

error on auth failure or logic error

🧪 Testing Interface (Frontend)
Includes:
Register/Login/Logout UI

Create poll form

Fetch and display polls

Vote with option ID

Toggle poll status with poll ID

All interactions are cookie/session-based

No build tools, React, or frameworks — just run index.html in your browser.

⚙️ Getting Started
1️⃣ Clone the Project

git clone https://github.com/Ravjot-Singh/polling-app.git
cd FOLDER/DIRECTORY_NAME

2️⃣ Setup Backend

cd server
npm install
Create a .env file:

PORT= Port number e.g. 8000
MONGODB_URI=YOUR_DATABASE_LINK
ACCESS_TOKEN_SECRET=your-access-secret
REFRESH_TOKEN_SECRET=your-refresh-secret

Then start the server:

node src/index.js