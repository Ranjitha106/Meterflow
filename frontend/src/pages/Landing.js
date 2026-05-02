import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">

      
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold text-indigo-400">MeterFlow 🚀</h1>
        <div className="space-x-4">
          <Link to="/login" className="text-slate-300 hover:text-white">
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      
      <section className="text-center px-6 mt-16">
        <h2 className="text-5xl font-bold leading-tight">
          Monitor & Manage Your APIs <br />
          <span className="text-indigo-400">Effortlessly</span>
        </h2>

        <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg">
          MeterFlow helps developers track API usage, manage API keys,
          and automate billing — all from one powerful dashboard.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/signup"
            className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-600"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="border border-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-800"
          >
            Login
          </Link>
        </div>
      </section>

      
      <section className="mt-24 px-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        <div className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700">
          <h3 className="text-lg font-bold mb-2 text-indigo-400">
            📊 Usage Tracking
          </h3>
          <p className="text-slate-400 text-sm">
            Track every API request in real-time with detailed logs and analytics.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700">
          <h3 className="text-lg font-bold mb-2 text-indigo-400">
            🔑 API Key Management
          </h3>
          <p className="text-slate-400 text-sm">
            Generate, manage, and secure your API keys easily.
          </p>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl shadow border border-slate-700">
          <h3 className="text-lg font-bold mb-2 text-indigo-400">
            💳 Automated Billing
          </h3>
          <p className="text-slate-400 text-sm">
            Pay only for what you use with simple and transparent pricing.
          </p>
        </div>

      </section>

      
      <section className="mt-24 bg-indigo-600 text-white py-12 text-center">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-3xl font-bold">10K+</h3>
            <p className="text-indigo-200">API Requests Tracked</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">500+</h3>
            <p className="text-indigo-200">Developers</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold">99.9%</h3>
            <p className="text-indigo-200">Uptime</p>
          </div>
        </div>
      </section>

      
      <footer className="text-center py-6 text-slate-500 text-sm">
        © 2026 MeterFlow. Built for developers 🚀
      </footer>

    </div>
  );
};

export default Landing;