import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { createHabit } from "../api/habits.js";

function HabitModel({ isOpen, onClose, onSave }) {
  const [habitName, setHabitName] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newHabit = await createHabit({ title: habitName });

      onSave(newHabit);
      setHabitName("");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full px-2 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          ✕
        </button>

        <h2 className="mb-2 text-2xl font-bold text-slate-900">
          New Habit
        </h2>

        <p className="mb-5 text-sm text-slate-600">
          Start with one small habit and build momentum.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter habit name"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-300"
          >
            {loading ? "Saving..." : "Save Habit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default HabitModel;
