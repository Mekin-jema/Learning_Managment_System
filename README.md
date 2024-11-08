# LMS - Learning Management System (Full Stack)

Welcome to the LMS (Learning Management System) project! This repository contains the code and resources for building an industrial-level LMS platform using the **MERN stack** (MongoDB, Express, React, Node.js), **Next.js 13**, **TypeScript**, **Socket.io**, and various other technologies. This is based on a YouTube series where we walk through building the platform from scratch with multiple advanced features.

The full-stack LMS platform will include:

- User authentication and authorization
- Course creation and management
- Course content access
- Question and answer system
- Reviews and ratings
- Notifications
- Admin dashboard for managing users, courses, orders, and more

## Table of Contents

- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation-setup)
- [Video Series Timestamps](#video-series-timestamps)
- [Follow Me](#follow-me)
- [License](#license)

## Technologies Used

This project is built using the following technologies:

- **Frontend:**
  - **React.js** with **Next.js 13** for SSR/SSG (Server-Side Rendering/Static Site Generation)
  - **TypeScript** for strong typing
  - **RTK Query** for data fetching
  - **Tailwind CSS** for modern, responsive design
  - **Socket.io** for real-time communication (e.g., notifications)
- **Backend:**
  - **Node.js** and **Express.js** for API creation
  - **MongoDB** for data storage
  - **Redis** for caching and session management
  - **Cloudinary** for image/media hosting
  - **JWT** for authentication
- **Other:**
  - **Axios** for HTTP requests
  - **Bcrypt.js** for password encryption
  - **Node-cron** for scheduled tasks

## Features

- **User Registration & Authentication:**

  - Sign up, login, and user activation via email
  - JWT-based session handling
  - Password reset and avatar upload
  - Social login options (Google, Facebook, etc.)

- **Course Management:**

  - Course creation, editing, and deletion
  - Course content management (e.g., video, quizzes)
  - View course details without purchasing
  - Course reviews and ratings

- **Order & Notification System:**

  - Create and track orders
  - Real-time notifications with **Socket.io**
  - Admin dashboard to manage courses, users, and orders

- **Admin Dashboard:**

  - Add/remove users
  - Manage courses, view orders
  - View statistics (user data, orders, notifications)

- **Advanced Features:**
  - Scheduled tasks (e.g., deleting read notifications after a certain period)
  - Caching and performance optimizations
  - FAQs, Hero banners, and Categories management

## Project Structure

## Installation & Setup

Follow these steps to set up and run the LMS project locally.

### 1. Clone the repository

````bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project

├── client (Frontend: React/Next.js) │ ├── components (Reusable components) │ ├── pages (Next.js pages) │ ├── public (Static files like images) │ └── styles (CSS styles with Tailwind) ├── server (Backend: Node/Express) │ ├── models (MongoDB models) │ ├── routes (API endpoints) │ ├── controllers (API logic) │ └── config (Configuration files) ├── README.md └── .env (Environment variables)

bash
Copy code

## Installation & Setup

Follow these steps to set up and run the LMS project locally.

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/lms-project.git
cd lms-project
2. Install dependencies
Backend
Navigate to the server folder and install dependencies:

bash
Copy code
cd server
npm install
Frontend
Navigate to the client folder and install dependencies:

bash
Copy code
cd client
npm install
3. Set up environment variables
Create a .env file in the server folder and add your MongoDB URI, JWT secret, Redis config, and other required environment variables.

Example .env:

env
Copy code
MONGODB_URI=mongodb://localhost:27017/lms
JWT_SECRET=your_jwt_secret
REDIS_HOST=localhost
REDIS_PORT=6379
CLOUDINARY_URL=your_cloudinary_url
4. Run the project
Backend
Start the server:

bash
Copy code
cd server
npm run dev
Frontend
Start the React frontend:

bash
Copy code
cd client
npm run dev
Your LMS should now be running at http://localhost:3000.
````
