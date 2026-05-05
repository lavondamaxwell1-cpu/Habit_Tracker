import React from "react";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";
import {
  getHabits,
  updateHabit,
  deleteHabit,
  completeHabit,
} from "../api/habits.js";
import HabitCardWithProgress from "../components/HabitCardWithProgress";
import HabitModel from "../components/HabitModel";
import EditHabitModal from "../components/EditHabitModal";
import { toast } from "react-toastify";
function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [isHabitModelOpen, setIsHabitModelOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [loading, setLoading] = useState(true);
  const username = localStorage.getItem("username") || "Friend";
  const fetchHabits = async () => {
    try {
      const data = await getHabits();
      setHabits(data);
    } catch (err) {
      console.error("Fetch habits error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleAddHabit = (newHabit) => {
    setHabits((prev) => [newHabit, ...prev]);
  };

  const handleUpdateHabit = async (id, updatedData) => {
    try {
      const updatedHabit = await updateHabit(id, updatedData);

      setHabits((prev) =>
        prev.map((habit) => (habit._id === id ? updatedHabit : habit)),
      );

      setEditingHabit(null);
    } catch (err) {
      console.error("Update habit error:", err);
    }
  };
  const handleCompleteHabit = async (habit) => {
    try {
      const updatedHabit = await completeHabit(habit._id);

      setHabits((prev) =>
        prev.map((h) => (h._id === habit._id ? updatedHabit : h)),
      );

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.65 },
      });

      toast.success("Streak updated! 🔥");
    } catch (err) {
      console.error("Complete habit error:", err);
      toast.error(err.response?.data?.message || "Already completed today");
    }
  };
  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
      setHabits((prev) => prev.filter((habit) => habit._id !== id));
    } catch (err) {
      console.error("Delete habit error:", err);
    }
  };
  const today = new Date().toISOString().split("T")[0];
  const totalHabits = habits.length;
  const completedToday = habits.filter((h) =>
    (h.completedDates || []).includes(today),
  ).length;

  const bestStreak = Math.max(...habits.map((h) => h.longestStreak || 0), 0);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back, {username} 👋
            </h1>
            <p className="text-slate-600">Track your daily progress.</p>
          </div>

          <button
            onClick={() => setIsHabitModelOpen(true)}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white shadow hover:bg-indigo-700"
          >
            + Add Habit
          </button>
        </div>

        {/* STATS */}
        <div className="min-h-screen bg-slate-100 dark:bg-slate-950">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-slate-500">Habits</p>
            <p className="text-xl font-bold">{totalHabits}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-slate-500">Completed Today</p>
            <p className="text-xl font-bold">{completedToday}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-slate-500">Best Streak</p>
            <p className="text-xl font-bold">{bestStreak}</p>
          </div>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>

            <p className="font-semibold text-slate-700">
              Loading your habits...
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Getting your streaks ready 🔥
            </p>
          </div>
        ) : habits.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow">
            <h2 className="text-xl font-bold text-slate-900">No habits yet</h2>
            <p className="mt-2 text-slate-600">
              Add your first habit to get started.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {habits.map((habit) => (
              <HabitCardWithProgress
                key={habit._id}
                habit={habit}
                onEdit={() => setEditingHabit(habit)}
                onDelete={() => handleDeleteHabit(habit._id)}
                onComplete={handleCompleteHabit}
              />
            ))}
          </div>
        )}

        {/* MODALS */}
        <HabitModel
          isOpen={isHabitModelOpen}
          onClose={() => setIsHabitModelOpen(false)}
          onSave={handleAddHabit}
        />

        <EditHabitModal
          habit={editingHabit}
          show={!!editingHabit}
          onHide={() => setEditingHabit(null)}
          onSave={handleUpdateHabit}
        />
      </div>
    </div>
  );
}

export default Dashboard;
