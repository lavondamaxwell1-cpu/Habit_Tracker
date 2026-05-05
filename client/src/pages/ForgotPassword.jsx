import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { forgotPassword } from "../api/auth.js";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPassword({ email });

      toast.success("OTP sent to your email");

      navigate("/reset-password"); // 🔥 THIS IS WHAT YOU WERE MISSING
    } catch (err) {
      console.error("FORGOT PASSWORD ERROR:", err);
      console.error("ERROR RESPONSE:", err.response?.data);
      console.error("STATUS:", err.response?.status);

      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          {/* Left Side */}
          <div className="hidden bg-indigo-600 p-10 text-white md:flex md:flex-col md:justify-center">
            <h1 className="text-4xl font-bold">Forgot Password?</h1>
            <p className="mt-4 text-indigo-100">
              No worries—we’ll send you a reset link.
            </p>
          </div>

          {/* Right Side */}
          <div className="p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Reset Password
            </h2>
            <p className="mt-2 text-slate-600">
              Enter your email to receive a reset link.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Remember your password?{" "}
              <Link to="/login" className="font-semibold text-indigo-600">
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
