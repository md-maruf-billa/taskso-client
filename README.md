# MERN Task Management Web Application

A full-stack MERN (MongoDB, Express, React, Node.js) web application for managing tasks with user authentication, task CRUD features, and a fun spinning wheel to select tasks. This project was built following a detailed Figma design provided as part of a job interview assessment.

---

## 📝 Project Overview

This web app allows users to create, view, update, and delete their tasks in an organized dashboard. It features a user authentication system with JWT, password encryption, and protected routes. The UI is fully responsive and designed according to the official Figma design linked below.

---

## 🎯 Features

- User Authentication (Login, Signup, Logout)
- Password encryption with bcrypt
- JWT-based authentication and route protection
- Task CRUD operations (Create, Read, Update, Delete)
- Dashboard with task list view and task creation/edit modal
- Responsive UI for mobile and desktop
- Input validation and error handling
- Fun spinning wheel to randomly pick a current task
- Secure HTTP headers and CORS configured (backend)
- Token management via HTTP-only cookies

---

## 📁 Project Structure

### Backend
- Node.js with Express
- MongoDB with Mongoose
- Authentication with bcrypt & JWT
- Middleware for authentication, validation, and error handling
- Environment variables managed with dotenv

### Frontend
- React (or Next.js)
- Global state management with [Context API / Redux] (please specify your choice)
- UI styled according to Figma design
- Protected routes with client-side redirect for unauthenticated users
- Responsive design for all screen sizes

---

## 🛠️ Tools & Packages Used

### Backend
- express
- mongoose
- bcryptjs
- jsonwebtoken
- express-validator
- cors
- helmet
- dotenv

### Frontend
- react (or next.js)
- react-router-dom (if used)
- axios or fetch for API calls
- redux or context API (specify which)
- formik / react-hook-form (if used)
- any UI library you used (e.g. Material UI, Tailwind CSS, Chakra UI)

---

## 🚀 Getting Started

### Backend Setup

- Clone the repository:

   ```bash
   // visit this link
   https://github.com/md-maruf-billa/taskso-server
    ```

### Frontend Setup

- Clone the repository :

   ```bash
   git clone https://github.com/md-maruf-billa/taskso-client.git
   cd taskso-client
   ```
- Add .env on project :
    ```bash
    NEXT_SERVER_URL = http://localshot:yourport
    ```
- Install dependencies :
    ```bash
    npm install
    ```
- Start server :
    ```bash
    npm run dev
    ```
  
### 📸 Screenshots

- Loing & Register
<br/>
<div style="display:flex; gap:16px;">
<image src="./public/login-s.png" width="49%" height="300"/>
<image src="./public/register-s.png" width="49%" height="300"/>
</div>

<br/>
<br/>


- Dashboard & spin
<br/>
<div style="display:flex; gap:16px;">
<image src="./public/home-s.png" width="49%" height="300"/>
<image src="./public/spin-s.png" width="49%" height="300"/>
</div>


- Detail & Add & Update
<br/>
<div style="display:flex; gap:16px;">
<image src="./public/details-s.png" width="49%" height="300"/>
<image src="./public/update-s.png" width="49%" height="300"/>
</div>


<br/>
<br/>
<br/>

If you have any queries, please email me at dev.abumahid@gmail.com