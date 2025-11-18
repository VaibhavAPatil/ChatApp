# ChatApp

Modern full-stack messaging experience that combines a responsive React/Vite frontend with an Express, MongoDB, and Socket.IO backend. ChatApp ships with JWT authentication, reusable UI components, and scaffolding for one-to-one and group conversations.

---

## Features

- **Authentication** – Secure registration and login powered by bcrypt-hashed passwords, JWT-issued access tokens, and an `Authorization` middleware that protects chat and message routes.
- **Chat experience** – Flowbite/Tailwind UI kit for chat layout (`Navbar.chat`, `Sidebar.chat`, `ChatBox.chat`) plus helper components such as `ChatBubble` for message rendering.
- **Real-time ready** – Socket.IO client/server dependencies are in place with a dedicated `socket/socket.js` entry point for wiring live message delivery.
- **Stateful messaging models** – Mongoose schemas for users, one-to-one chats, groups, and multi-type messages (text, images, files, etc.) with audit timestamps and read receipts (`seenBy`).
- **API-friendly frontend** – Centralized Axios instance with auth interceptors, route-based views (`Home`, `Login`, `Register`, `ChatPage`), and React Router navigation.

---

## Tech Stack

| Layer    | Technology                                                                         |
| -------- | ---------------------------------------------------------------------------------- |
| Frontend | React 19, Vite 6, React Router 7, Axios, Socket.IO Client, TailwindCSS 4, Flowbite |
| Backend  | Node.js, Express 4, Socket.IO 4, Mongoose 8, JWT, bcryptjs, cookie-parser          |
| Database | MongoDB                                                                            |

---

## Project Structure

```
ChatApp/
├── Backend/           # Express API, Socket.IO server, Mongo models
│   ├── config/        # Database connection helper
│   ├── controllers/   # Auth, chat, message handlers
│   ├── middleware/    # JWT auth middleware
│   ├── models/        # User, Chat, Group, Message schemas
│   ├── routes/        # REST endpoints (auth, chat, message)
│   └── socket/        # Socket.IO bootstrap file
├── Frontend/          # React/Vite client
│   ├── src/
│   │   ├── components/    # Marketing + chat UI components
│   │   ├── pages/         # Home, Login, Register, ChatPage
│   │   └── config/        # Axios client with JWT interceptor
└── Readme.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+
- MongoDB instance (local or hosted)

### 1. Clone and install dependencies

```bash
git clone <repo-url>
cd ChatApp

# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 2. Configure environment variables

Create `Backend/.env`:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=super-secret-key
```

Optional frontend `.env` (Vite naming):

```
VITE_API_URL=http://localhost:5000/api
```

Update `src/config/axios.config.js` to read from `import.meta.env.VITE_API_URL` if needed.

### 3. Run the stack locally

```bash
# Backend
cd Backend
npm start          # runs nodemon index.js at PORT or 5000

# Frontend
cd ../Frontend
npm run dev        # Vite dev server (defaults to http://localhost:5173)
```

Visit `http://localhost:5173` to access the UI. Login/Register use `http://localhost:5000/api/auth/*` via Axios.

---

## Available Scripts

**Backend**

- `npm start` – Starts Nodemon-powered Express server.

**Frontend**

- `npm run dev` – Launches Vite dev server with hot module reloading.
- `npm run build` – Creates production bundle in `Frontend/dist`.
- `npm run preview` – Serves the production bundle locally.
- `npm run lint` – Runs ESLint (`eslint.config.js`).

---

## API Overview

Base URL: `http://localhost:5000/api`

| Endpoint           | Method | Description              | Auth |
| ------------------ | ------ | ------------------------ | ---- |
| `/auth/register`   | POST   | Creates a new user       | ✅   |
| `/auth/login`      | POST   | Issues JWT + auth cookie | ✅   |
| `/chat`            | GET    | List user chats          | ✅   |
| `/chat`            | POST   | Create/find direct chat  | ✅   |
| `/message`         | POST   | Send a chat message      | ✅   |
| `/message/:chatId` | GET    | Fetch chat history       | ✅   |

> Protected routes require the `Authorization: Bearer <token>` header injected by the Axios interceptor once a user logs in.

---

## Production Notes

- **Security** – Passwords are hashed with `bcryptjs`. JWTs are signed with `JWT_SECRET`; rotate and store secrets via a vault or CI secrets store in production.
- **CORS & cookies** – `cors()` is enabled globally and `cookie-parser` is configured; set `secure: true` on cookies (HTTPS) before deploying.
- **Sockets** – Server/client dependencies exist; implement listeners in `Backend/socket/socket.js` and mount to the HTTP server to unlock live chat.
- **Validation & testing** – Add schema validation (Joi/Zod) and automated tests before going live.

---

## Deployment Tips

- **Backend** – Deploy to services like Render, Railway, or AWS. Configure environment variables and connect to a managed MongoDB (Atlas).
- **Frontend** – Run `npm run build` and serve `dist/` through a CDN (Netlify, Vercel, S3 + CloudFront). Point frontend env to the deployed API base URL.
- **Process management** – Use PM2 or a similar process manager for the Node server in production.

---

## License

This project is released under the ISC license (see `Backend/package.json`). Update as needed for your organization.

---

Happy building! 🚀
