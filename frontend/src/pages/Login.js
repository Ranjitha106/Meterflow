import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please enter email and password");
    return;
  }

  try {
    setError("");

    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const token = response.data.token;

    if (!token) {
      setError("Invalid response from server");
      return;
    }

    
    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    localStorage.setItem("userId", payload.id);

    
    setTimeout(() => {
      navigate("/dashboard");
    }, 100);

  } catch (err) {
    console.error(err);

    setError(
      err.response?.data?.message || "Login failed. Try again."
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      
      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-400">MeterFlow 🚀</h1>
          <p className="text-slate-400 mt-2">
            Sign in to manage your APIs
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-400 p-3 rounded-lg mb-4 text-sm border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} autoComplete="off" className="space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              autoComplete="off"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              autoComplete="new-password"
              className="w-full px-4 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Don't have an account?
          <Link
            to="/signup"
            className="text-indigo-400 font-medium hover:underline ml-1"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;