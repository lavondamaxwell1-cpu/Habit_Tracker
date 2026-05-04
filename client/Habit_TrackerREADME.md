# 📘 Habit Tracker App

A full-stack Habit Tracker application that allows users to create, manage, and track habits with secure authentication and OTP-based password reset.

---

## 🚀 Features

### 🔐 Authentication
- Register & Login
- JWT-based authentication
- Protected routes
- Logout functionality
- Forgot password with OTP (email verification)
- Reset password with secure OTP validation

### 📊 Habit Management
- Create habits
- Edit habits
- Delete habits
- View all habits on dashboard

### 💡 User Experience
- Toast notifications (success/error)
- Loading states on actions
- Form validation
- OTP input with:
  - Auto-focus
  - Auto-submit
  - Paste support
  - Resend OTP with countdown

### 🧭 Navigation
- Dynamic navbar:
  - Shows username when logged in
  - Login/Register when logged out
- Redirect protection for authenticated users

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Axios
- React Toastify
- React Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- jsonwebtoken (JWT)
- Nodemailer

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd Habit_Tracker