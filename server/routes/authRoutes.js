import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import crypto from "crypto";
import sendEmail from "../utils/sendEmail.js";
const router = express.Router();

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log("BODY:", req.body); // 👈 IMPORTANT

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await User.create({ username, email, password });

      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        }),
      });
    } catch (error) {
      console.error("REGISTER ERROR:", error); // 👈 THIS IS KEY
      res.status(500).json({ message: error.message });
    }
  }),
);

// Login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      }),
    });
  }),
);

router.post(
  "/forgot-password",
  asyncHandler(async (req, res) => {
    const { email } = req.body;
  console.log("FORGOT PASSWORD ROUTE HIT");
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.resetOtpExpire = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Code",
        text: `Your Habit Tracker OTP is: ${otp}. It expires in 10 minutes.`,
      });
    } catch (error) {
      console.error("EMAIL SEND ERROR:", error);

      return res.status(500).json({
        message: "Failed to send OTP email",
        error: error.message,
      });
    }

    res.json({
      message: "OTP sent to your email 📧",
    });
  }),
);

router.post(
  "/reset-password",
  asyncHandler(async (req, res) => {
    const { email, otp, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("EMAIL:", email);
    console.log("OTP FROM FRONTEND:", otp);
    console.log("OTP IN DB:", user.resetOtp);
    console.log("EXPIRE IN DB:", user.resetOtpExpire);
    console.log("NOW:", new Date());

    const submittedOtp = otp.trim();

    if (
      user.resetOtp !== submittedOtp ||
      !user.resetOtpExpire ||
      new Date(user.resetOtpExpire).getTime() < Date.now()
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = password;
    user.resetOtp = undefined;
    user.resetOtpExpire = undefined;

    await user.save();

    res.json({ message: "Password reset successful 🎉" });
  }),
);
export default router;
