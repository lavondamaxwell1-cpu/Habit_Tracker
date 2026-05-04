import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    progress: {
      type: Number,
      default: 0,
    },

    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    lastCompleted: {
      type: Date,
    },

    completedDates: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true },
);
const Habit = mongoose.model("Habit", habitSchema);

export default Habit;
