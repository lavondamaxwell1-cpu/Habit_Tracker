// import { motion } from "framer-motion";

export default function HabitCardWithProgress({
  habit,
  onEdit,
  onDelete,
  onComplete,
}) {
  const progress = habit.progress || 0;
  const completedDates = habit.completedDates || [];

  const todayString = new Date().toISOString().split("T")[0];
  const now = new Date();

  const isCompletedToday = completedDates.includes(todayString);
  const last = habit.lastCompleted ? new Date(habit.lastCompleted) : null;
  const missed = last && now - last > 1000 * 60 * 60 * 24 * 1.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="rounded-2xl bg-white p-5 shadow-md dark:bg-slate-900"
    >
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {habit.title}
      </h2>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
        <div
           className="text-sm text-slate-600 dark:text-slate-300">
          style={{ width: `${progress}%` }}
        </div>
      </div>

      <div className="mt-2 flex justify-between text-sm font-semibold">
        <span className="text-slate-600 dark:text-slate-300">Progress</span>
        <span className="text-indigo-600">{progress}%</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-orange-50 p-3 text-center">
          <p className="text-sm font-semibold text-orange-600">🔥 Streak</p>

          <motion.p
            key={habit.streak}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-xl font-bold text-orange-700"
          >
            {habit.streak || 0}
          </motion.p>
        </div>

        <div className="rounded-xl bg-purple-50 p-3 text-center">
          <p className="text-sm font-semibold text-purple-600">🏆 Best</p>
          <p className="text-xl font-bold text-purple-700">
            {habit.longestStreak || 0}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <p className="mb-2 text-sm font-semibold text-slate-700">
          Last 7 completions
        </p>

        <div className="flex gap-2">
          {completedDates.slice(-7).length > 0 ? (
            completedDates
              .slice(-7)
              .map((date) => (
                <div
                  key={date}
                  title={date}
                  className="h-7 w-7 rounded-lg bg-emerald-200"
                />
              ))
          ) : (
            <p className="text-sm text-slate-500">No completions yet</p>
          )}
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: isCompletedToday ? 1 : 1.03 }}
        onClick={() => onComplete(habit)}
        disabled={isCompletedToday}
        className={`mt-5 w-full rounded-xl py-3 font-bold text-white ${
          isCompletedToday
            ? "cursor-not-allowed bg-gray-400"
            : "bg-emerald-500 hover:bg-emerald-600"
        }`}
      >
        {isCompletedToday
          ? "Completed Today ✅"
          : habit.streak === 0
            ? "Start Streak 🔥"
            : "Keep Streak Alive 🔥"}
      </motion.button>

      {missed && (
        <p className="mt-2 text-sm font-semibold text-red-500">
          ❌ You missed a day — streak reset
        </p>
      )}

      <div className="mt-4 flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-800 hover:bg-slate-300"
        >
          Edit
        </button>

        <button
          onClick={onDelete}
          className="flex-1 rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
}
