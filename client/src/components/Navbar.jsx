import { useEffect, useState } from "react";

function Navbar() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <nav className="bg-white p-4 shadow dark:bg-slate-900">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white">
          Habit Tracker
        </h1>

        <button
          onClick={() => setDark((prev) => !prev)}
          className="rounded-xl bg-slate-200 px-4 py-2 font-semibold text-slate-800 dark:bg-slate-700 dark:text-white"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
