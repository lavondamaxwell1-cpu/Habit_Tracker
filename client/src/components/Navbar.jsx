import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Logo / Title */}
        <h1 className="text-lg font-bold text-slate-900">Habit Tracker</h1>

        {/* Right Side */}
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
          <Link
            to="/"
            className="font-semibold text-slate-700 hover:text-indigo-600"
          >
            Dashboard
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
