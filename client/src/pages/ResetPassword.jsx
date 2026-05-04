import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../api/auth.js";
import React from "react";
function ResetPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        otp,
        password,
      });

      toast.success("Password reset successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Reset password failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
          <div className="hidden bg-indigo-600 p-10 text-white md:flex md:flex-col md:justify-center">
            <h1 className="text-4xl font-bold">Enter Your Reset Code</h1>
            <p className="mt-4 text-indigo-100">
              Use the OTP from your email to create a new password.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <h2 className="text-3xl font-bold text-slate-900">
              Reset Password
            </h2>
            <p className="mt-2 text-slate-600">
              Enter your email, OTP code, and new password.
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

              <input
                type="text"
                placeholder="OTP code"
                value={otp}
                onChange={(e) => setOtp(e.target.value.trim())}
                required
                maxLength="6"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Need a new code?{" "}
              <Link
                to="/forgot-password"
                className="font-semibold text-indigo-600"
              >
                Send another OTP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
