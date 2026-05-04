import express from "express";
import Habit from "../models/Habit.js";
import { protect } from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const router = express.Router();

// GET all habits
router.get(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user._id });
    res.json(habits);
  }),
);

// CREATE a new habit
router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const habit = await Habit.create({
      user: req.user._id,
      title,
      progress: 0,
      streak: 0,
    });

    res.status(201).json(habit);
  }),
);

// UPDATE habit
router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    habit.title = req.body.title ?? habit.title;
    
    habit.frequency = req.body.frequency ?? habit.frequency;
    habit.progress = req.body.progress ?? habit.progress;

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
  }),
);
// COMPLETE habit for today
router.put(
  "/:id/complete",
  protect,
  asyncHandler(async (req, res) => {
    const habit = await Habit.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!habit) {
      return res.status(404).json({ message: "Habit not found" });
    }

    const today = new Date();
    const todayString = today.toISOString().split("T")[0];

    if (habit.completedDates.includes(todayString)) {
      return res.status(400).json({ message: "Already completed today" });
    }

    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    const lastCompletedString = habit.lastCompleted
      ? new Date(habit.lastCompleted).toISOString().split("T")[0]
      : null;

    if (lastCompletedString === yesterdayString) {
      habit.streak = (habit.streak || 0) + 1;
    } else {
      habit.streak = 1;
    }

    habit.longestStreak = Math.max(habit.longestStreak || 0, habit.streak);
    habit.progress = 100;
    habit.lastCompleted = today;
    habit.completedDates.push(todayString);

    const updatedHabit = await habit.save();

    res.json(updatedHabit);
  }),
);
// DELETE habit
router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!habit) return res.status(404).json({ message: "Habit not found" });

    res.json({ message: "Habit deleted" });
  }),
);

export default router;
