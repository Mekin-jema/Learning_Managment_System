# LMS - Learning Management System (Full Stack)

Welcome to the LMS (Learning Management System) project! This repository contains the code and resources for building an industrial-level LMS platform using the **MERN stack** (MongoDB, Express, React, Node.js), **Next.js 13**, **TypeScript**, **Socket.io**, and various other technologies.

The LMS platform provides a robust framework for managing courses, users, and interactive features. It includes user authentication, real-time notifications, secure payment processing, and an admin dashboard for centralized management.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

---

## Technologies Used

This project is built using the following technologies:

- **Frontend:**

  - **React.js** with **Next.js 13** for SSR/SSG (Server-Side Rendering/Static Site Generation).
  - **TypeScript** for strong typing and maintainability.
  - **RTK Query** for efficient API data fetching.
  - **Tailwind CSS** for a modern, responsive UI.
  - **Socket.io** for real-time communication (e.g., notifications).

- **Backend:**

  - **Node.js** and **Express.js** for API and server logic.
  - **MongoDB** for database storage.
  - **Redis** for caching and session management.
  - **Cloudinary** for image and media hosting.
  - **JWT** for secure authentication.

- **Other:**
  - **Axios** for HTTP requests.
  - **Bcrypt.js** for password hashing.
  - **Node-cron** for scheduled tasks.

---

## Features

- **User Registration & Authentication:**

  - Email-based registration and login.
  - JWT for session handling.
  - Password recovery and avatar upload.

- **Course Management:**

  - Create, edit, delete, and manage courses.
  - Multimedia course content, including video and quizzes.
  - Review and rating system for courses.

- **Payment & Notification System:**

  - Payment integration with **Stripe**.
  - Real-time notifications using **Socket.io**.

- **Admin Dashboard:**

  - User, course, and order management.
  - View platform statistics and logs.

- **Advanced Features:**
  - Scheduled tasks for data cleanup.
  - Optimized performance with caching.
  - Dynamic FAQ and Hero banners.

---

## Project Structure

````plaintext
lms-project/
├── client/ (Frontend: React/Next.js)
│   ├── components/ (Reusable React components)
│   ├── pages/ (Next.js pages for routing)
│   ├── public/ (Static files like images and fonts)
│   ├── styles/ (CSS styles using Tailwind)
│   └── store/ (Redux store and slices)
├── server/ (Backend: Node.js/Express)
│   ├── models/ (MongoDB schemas and models)
│   ├── routes/ (API endpoints)
│   ├── controllers/ (Business logic for APIs)
│   ├── middleware/ (Authentication and error handling)
│   └── config/ (Environment and external services configuration)
├── README.md
└── .env (Environment variables configuration)


## Installation & Setup

Follow these steps to set up and run the LMS project locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project
````

### 2. Install dependencies

#### Backend

Navigate to the server folder and install dependencies:

```bash
cd backend
npm install
```

#### Frontend

Navigate to the client folder and install dependencies:

```bash
cd frontend
npm install
```

### 3. Set up environment variables

Create a backend `.env` file in the backend folder and add your MongoDB URI, JWT secret, Redis config, and other required environment variables.

Example `.env`:

```env
# Server Configuration
PORT=                     # The port on which the server runs
ORIGIN=                  # Allowed origins for CORS
NODE_ENV=                # Environment mode (development, production)

# Database Configuration
MONGO_URI=               # MongoDB connection URI
REDIS_URL=               # Redis server URL

# Cloudinary Configuration
CLOUDINARY_URL=          # Cloudinary URL for image/media hosting
CLOUDINARY_CLOUD_NAME=   # Cloudinary cloud name
CLOUDINARY_API_KEY=      # Cloudinary API key
CLOUDINARY_API_SECRET=   # Cloudinary API secret

# SMTP Email Configuration
SMTP_HOST=               # SMTP server host (e.g., smtp.gmail.com)
SMTP_PORT=               # SMTP server port
SMTP_SERVICE=            # SMTP service (e.g., gmail)
SMTP_PASSWORD=           # SMTP password for email authentication
SMTP_MAIL=               # Sender's email address

# JWT Configuration
SECRET_KEY=              # Secret key for JWT generation
ACCESS_TOKEN=            # Access token secret
REFRESH_TOKEN=           # Refresh token secret
ACCESS_TOKEN_EXPIRE=     # Access token expiration time (in minutes)
REFRESH_TOKEN_EXPIRE=    # Refresh token expiration time (in days)

# VdoCipher API Configuration
VDOCIPHER_API_SECRET=    # VdoCipher API secret key
PLAYER_ID=               # VdoCipher Player ID


```

```env

## Create a .env file in the client folder with the following variables:

# API Configuration

NEXT_PUBLIC_SERVER_URI= # Backend server URI (e.g., http://localhost:4000/api/v1/)

# Google Authentication Configuration

GOOGLE_CLIENT_ID= # Google OAuth client ID
GOOGLE_CLIENT_SECRET= # Google OAuth client secret

# GitHub Authentication Configuration

GITHUB_CLIENT_ID= # GitHub OAuth client ID
GITHUB_CLIENT_SECRET= # GitHub OAuth client secret

# Secret Key

SECRET= # Application-wide secret key for encryption
```

### 4. Run the project

#### Backend

Start the server:

```bash
cd  backend
npm start
```

#### Frontend

Start the React frontend:

```bash
cd frontend
npm run dev
```

Your LMS should now be running at [http://localhost:3000](http://localhost:3000).
