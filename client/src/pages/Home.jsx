import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-100">
      <section className="mx-auto flex min-h-[85vh] max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
        <div className="mb-6 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          🔥 Build streaks. Stay consistent. Grow daily.
        </div>

        <h1 className="max-w-4xl text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
          Build better habits, one day at a time.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Track your daily habits, complete goals, build streaks, and stay
          motivated with a simple habit tracker designed for consistency.
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/register"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-bold text-white shadow hover:bg-indigo-700"
          >
            Start Tracking Habits
          </Link>

          <Link
            to="/login"
            className="rounded-xl bg-white px-6 py-3 font-bold text-slate-800 shadow hover:bg-slate-50"
          >
            Login
          </Link>
        </div>

        <div className="mt-14 grid w-full gap-5 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-3xl">✅</div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Complete Daily Habits
            </h3>
            <p className="mt-2 text-slate-600">
              Mark habits complete and keep your routine moving.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-3xl">🔥</div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Build Streaks
            </h3>
            <p className="mt-2 text-slate-600">
              Stay motivated by watching your streak grow each day.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-3xl">🏆</div>
            <h3 className="mt-3 text-xl font-bold text-slate-900">
              Track Your Best
            </h3>
            <p className="mt-2 text-slate-600">
              See your longest streak and celebrate your progress.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
