# API Documentation

## Base URL

http://localhost:5000/api

---

## Authentication

Most habit routes require a JWT token in the Authorization header.

Authorization: Bearer YOUR_TOKEN_HERE

---

# Auth Routes

## Register User
POST /auth/register

## Login User
POST /auth/login

## Forgot Password
POST /auth/forgot-password

## Reset Password
POST /auth/reset-password

---

# Habit Routes

## Get All Habits
GET /habits

## Create Habit
POST /habits

## Update Habit
PUT /habits/:id

## Delete Habit
DELETE /habits/:id

---

# Notes

- All habit routes require a valid JWT.
- Passwords are hashed before saving.
- OTP codes expire after 10 minutes.
- OTP is cleared after successful password reset.
