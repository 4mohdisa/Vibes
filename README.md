# Chat Application

A modern, full-featured chat application with real-time communication and comprehensive messaging capabilities.

![Chat Application Screenshot](Chat-App-08-09-2025_07_33_PM.png)

## 🌟 Key Features

### Frontend
- Real-time messaging with live updates
- Responsive and adaptive design
- Group and private chat support
- File and media sharing
- Intuitive typing indicators

### Backend
- Secure WebSocket communication
- User authentication
- Persistent message storage
- Comprehensive API endpoints
- Admin management dashboard

## 🛠 Tech Stack

### Frontend
- React.js
- Material-UI
- Socket.io
- Redux Toolkit
- React Router

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io

### DevOps
- Docker
- Git
- Postman

## 🚀 Quick Setup

### Prerequisites
- Node.js (v16+)
- MongoDB
- Docker (optional)

### Installation Steps

1. Clone the repository
```bash
git clone https://github.com/yourusername/chat-application.git
cd chat-application
```

2. Install dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
```

3. Configure environment
Create a `.env` file in the `backend` folder:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the application
```bash
# Start backend
cd backend
npm start

# Start frontend
cd frontend
npm start
```

5. Access the app at `http://localhost:3000`

## 📂 Project Structure
```
chat-application/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── styles/
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    └── utils/
```

## 🔌 Key API Endpoints

### Authentication
| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| POST   | `/api/login`    | User login           |
| POST   | `/api/register` | User registration    |

### Chats
| Method | Endpoint               | Description                  |
|--------|------------------------|------------------------------|
| GET    | `/api/chats`           | Retrieve user chats          |
| POST   | `/api/chats/create`    | Create new chat              |
| GET    | `/api/chats/:chatId`   | Get chat messages            |

## 🎨 Customization

- Adjust themes in `src/theme.js`
- Customize scrollbars in `src/styles/GlobalStyles.css`

## 🚧 Roadmap
- [ ] Video and audio call support
- [ ] Message reactions
- [ ] Push notifications

## 👥 Contributors
- Uzair (Frontend)
- Isa (Backend)

## 📄 License
MIT License - See `LICENSE` file for details.
