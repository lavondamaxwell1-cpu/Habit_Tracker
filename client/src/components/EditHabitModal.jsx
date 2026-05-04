import { useState } from "react";
import React from "react";
function EditHabitModal({ habit, show, onHide, onSave }) {
  const [formData, setFormData] = useState({
    title: habit?.title || "",

    frequency: habit?.frequency || "Daily",
  });

  if (!show || !habit) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave(habit._id, {
      title: formData.title,
     
      frequency: formData.frequency,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <button
          type="button"
          onClick={onHide}
          className="absolute right-4 top-4 rounded-full px-2 text-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          ✕
        </button>

        <h2 className="mb-5 text-2xl font-bold text-slate-900">Edit Habit</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            required
          />

          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
          >
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onHide}
              className="flex-1 rounded-xl bg-slate-200 py-3 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex-1 rounded-xl bg-indigo-600 py-3 font-semibold text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditHabitModal;
