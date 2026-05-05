import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/auth.js";
import { toast } from "react-toastify";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     const data = await registerUser({
       username: name,
       email,
       password,
     });

     localStorage.setItem("token", data.token);
     localStorage.setItem("username", data.username);
      toast.success("Account created");
      navigate("/dashboard");;
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          <div className="hidden bg-indigo-600 p-10 text-white md:flex md:flex-col md:justify-center">
            <h1 className="text-4xl font-bold">Start Strong</h1>
            <p className="mt-4 text-indigo-100">
              Create your account and start tracking better habits today.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-slate-900">Register</h2>
            <p className="mt-2 text-slate-600">
              Create your habit tracker account.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-indigo-600">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
