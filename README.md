# Video Conference Application

A full-stack video conferencing application built with React (Vite) frontend and Node.js/Express backend with real-time communication using Socket.io.

---

## 📋 Project Structure

```
Video Conference/
├── frontend/
│   └── vite-project/          # React Vite application
├── backend/                    # Node.js/Express server
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (for database) - [Download](https://www.mongodb.com/try/download/community)
- **Git** (optional) - [Download](https://git-scm.com/)

---

##  Installation & Setup

### 1. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
npm install
```

**Configure Environment Variables:**

Create or update the `.env` file in the `backend` directory with the following:

```
DB_PASSWORD=videocon123
```

Add other necessary environment variables as needed:
```
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/video-conference
```

**Start the Backend Server:**

- Development mode (with auto-reload):
  ```bash
  npm run dev
  ```

- Production mode:
  ```bash
  npm start
  ```

The backend server will run on `http://localhost:5000` (or your configured PORT).

---

### 2. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd frontend/vite-project
npm install
```

**Start the Frontend Development Server:**

```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173` (Vite default port).

---

##  Running the Project

To run the complete application:

### Option 1: Two Terminal Instances

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend/vite-project
npm run dev
```

### Option 2: Using IDE Terminal

Most modern IDEs (VS Code, WebStorm, etc.) allow split terminals:
1. Open the project root folder in your IDE
2. Open two terminals side-by-side
3. Run the backend in one terminal and frontend in another

---

## 🛠️ Available Scripts

### Backend Scripts

- `npm run dev` - Run backend in development mode with nodemon (auto-reload)
- `npm start` - Run backend in production mode
- `npm run prod` - Run with PM2 (for production deployment)

### Frontend Scripts

- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run lint` - Run ESLint code quality checks
- `npm run preview` - Preview production build locally

---

##  Features

- Real-time video conferencing using WebRTC
- Socket.io for real-time communication
- User authentication with bcrypt password hashing
- User management and meeting history
- Responsive UI with Material-UI (MUI)

---

##  Tech Stack

### Frontend
- React 19
- Vite (build tool)
- React Router v7
- Socket.io Client
- Material-UI (MUI)
- Axios (HTTP client)

### Backend
- Node.js with Express
- MongoDB (via Mongoose)
- Socket.io (real-time communication)
- Bcrypt (password hashing)
- CORS (for cross-origin requests)

---

##  Key Files & Directories

### Backend
- `src/app.js` - Main Express application
- `src/controllers/socketManager.js` - Socket.io connection management
- `src/controllers/user.controller.js` - User-related logic
- `src/models/` - Database models (User, Meeting)
- `src/routes/` - API route definitions

### Frontend
- `src/main.jsx` - Application entry point
- `src/App.jsx` - Root component
- `src/pages/` - Page components (Landing, Authentication, Home, Videomeet, History)
- `src/context/Authcontext.jsx` - Authentication context
- `src/utils/WithAuth.jsx` - Authentication wrapper/HOC

---

##  Accessing the Application

1. Ensure both backend and frontend servers are running
2. Open your browser and navigate to `http://localhost:5173`
3. The frontend will automatically connect to the backend API

---

## 🐛 Troubleshooting

### Backend Won't Start
- Ensure MongoDB is running
- Check if port 5000 is already in use
- Verify `.env` file is correctly configured
- Run `npm install` to ensure all dependencies are installed

### Frontend Won't Start
- Clear node_modules: `rm -rf node_modules && npm install`
- Check if port 5173 is available
- Ensure backend URL is correctly configured in frontend

### Connection Issues
- Verify backend is running and accessible
- Check browser console for errors
- Ensure Socket.io is properly configured
- Check firewall settings

---

## 📝 Environment Configuration

### Backend (.env)
```
DB_PASSWORD=videocon123
PORT=5000
NODE_ENV=development
MONGODB_URL=mongodb://localhost:27017/video-conference
```

