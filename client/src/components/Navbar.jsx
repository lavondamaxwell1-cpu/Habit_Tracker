import { Link, useNavigate } from "react-router-dom";
import React from "react";
function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-600">
          HabitTracker
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <Link
                to="/"
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="font-medium text-slate-700 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
