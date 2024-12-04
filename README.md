# Vibes Web Application

Vibes is a cutting-edge real-time chat application designed to enhance user communication through seamless interaction and modern design. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO, Vibes offers a robust platform for messaging, complete with real-time updates and a sleek user interface.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Setup and Installation](#setup-and-installation)
5. [Running the Application](#running-the-application)
6. [Contributing](#contributing)
7. [License](#license)

## Project Overview

Vibes is a feature-rich chat application that supports real-time messaging, user authentication, group chats, and more. The frontend is developed using React.js with Material-UI for a sleek and responsive design. Redux is used for state management, ensuring efficient data flow across the application. The backend is powered by Node.js and Express.js, with MongoDB as the database to store user data and chat history. Socket.IO is integrated for real-time communication, enabling instant updates and notifications.

## Features

- **Real-Time Messaging**: Instant message delivery using Socket.IO.
- **User Authentication**: Secure login and registration with JWT.
- **Group Chats**: Create and manage group conversations.
- **Typing Indicators**: Real-time feedback when users are typing.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Profile Management**: Customize user profiles with avatars and status messages.

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   ├── dialogs/         # Dialog components for modals and popups
│   │   ├── layout/          # Layout components like headers and footers
│   │   ├── shared/          # Reusable components across the app
│   │   ├── specific/        # Page-specific components
│   │   └── styles/          # Styled components and CSS
│   ├── constants/           # Constant values and configurations
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Library utilities
│   ├── pages/               # Main pages of the application
│   ├── redux/               # Redux setup and slices
│   ├── utils/               # Utility functions
│   ├── App.jsx              # Main application component
│   ├── global.css           # Global styles
│   └── main.jsx             # Entry point for React
├── public/                  # Public assets and files
├── .env                     # Environment variables
├── package.json             # Project dependencies and scripts
└── vite.config.js           # Vite configuration for development
```

## Setup and Installation

To set up the Vibes application locally, follow these steps:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/vibes.git
   cd vibes/frontend
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm installed. Then, run:
   ```bash
   npm install
   ```

3. **Environment Variables**:
   Create a [.env](cci:7://file:///Users/mohammedisa/Development/Web/Vibes/frontend/.env:0:0-0:0) file in the root directory and configure the necessary environment variables. An example [.env](cci:7://file:///Users/mohammedisa/Development/Web/Vibes/frontend/.env:0:0-0:0) file might look like:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

## Running the Application

To start the application, use the following command:

```bash
npm run dev
```

This will start the development server, and you can access the application at `http://localhost:3000`.

### Backend Setup

Ensure the backend server is running to handle API requests and socket connections. Follow the backend setup instructions in the corresponding repository.

## Contributing

We welcome contributions to improve Vibes. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch to your fork.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
