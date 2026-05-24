# SyncTalk – Real-Time Chat Application

## Overview

SyncTalk is a full-stack real-time messaging platform built using modern web technologies. The application enables users to communicate instantly through WebSocket-based real-time messaging while maintaining secure authentication and persistent message storage.

This project demonstrates concepts such as:

- Real-time communication using Socket.io
- JWT-based authentication
- REST API development
- MongoDB database design
- Full-stack architecture
- Event-driven systems

---

# Features

## Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Password Hashing using bcrypt

## Real-Time Messaging
- Instant message delivery
- WebSocket communication using Socket.io
- Online user tracking
- Persistent socket connections

## Chat System
- One-to-one chats
- Chat history storage
- Fetch previous messages
- Last message preview

## Additional Features
- Read receipts
- Typing indicators
- Group chat support
- File sharing support

---

# Tech Stack

## Frontend
- React
- Vite
- Axios
- Socket.io Client

## Backend
- Node.js
- Express.js
- Socket.io

## Database
- MongoDB
- Mongoose

## Authentication & Security
- JWT (JSON Web Tokens)
- bcryptjs

---

# System Architecture

```text
React Frontend
       │
       │ REST APIs
       ▼
Express Backend
       │
       │ Socket.io
       ▼
Real-Time Communication Layer
       │
       ▼
MongoDB Database
```

---

# Database Design

## Users Collection

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "hashed_password",
  "profilePic": ""
}
```

## Chats Collection

```json
{
  "participants": ["user1", "user2"],
  "isGroup": false,
  "lastMessage": "Hello"
}
```

## Messages Collection

```json
{
  "chatId": "chat_id",
  "senderId": "user_id",
  "message": "Hello",
  "readBy": ["user_id"]
}
```

---

# Folder Structure

## Backend

```text
synctalk-backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── sockets/
│   └── server.js
│
├── .env
├── package.json
```

## Frontend

```text
synctalk-frontend/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── context/
│   └── App.jsx
│
├── package.json
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

---

## Users

### Get User Profile

```http
GET /api/users/profile
```

---

## Chats

### Create or Fetch Chat

```http
POST /api/chats
```

### Get User Chats

```http
GET /api/chats
```

---

## Messages

### Send Message

```http
POST /api/messages
```

### Get Chat Messages

```http
GET /api/messages/:chatId
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd synctalk-backend
```

## Install dependencies

```bash
npm install
```

## Create .env file

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Start backend server

```bash
npm run dev
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd synctalk-frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

---

# Real-Time Communication Flow

```text
User sends message
        │
        ▼
Frontend emits socket event
        │
        ▼
Socket.io server receives event
        │
        ▼
Message stored in MongoDB
        │
        ▼
Server broadcasts message
        │
        ▼
Receiver gets message instantly
```

---

# Security Features

- JWT authentication
- Password hashing using bcrypt
- Protected API routes
- Secure token verification
- Environment variable protection

---

# Future Enhancements

- Voice and video calling
- Message reactions
- Media uploads
- Push notifications
- End-to-end encryption
- Message editing and deletion
- Dark mode UI

---

# Learning Outcomes

This project helped in understanding:

- Real-time systems
- Event-driven architecture
- Backend API design
- Authentication systems
- WebSocket communication
- MongoDB schema design
- Full-stack application development
