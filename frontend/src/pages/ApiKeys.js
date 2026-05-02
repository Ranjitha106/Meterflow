import React, { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

const ApiKeys = () => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const fetchKeys = async () => {
    try {
      
      const res = await api.get("/api/keys");
      setKeys(res.data);
    } catch (err) {
      console.error("Failed to fetch keys");
    }
  };

  useEffect(() => {
    fetchKeys();
  }, []);

 
  const generateKey = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      await api.post("/api/create-key", {
        userId,
      });

      fetchKeys();
    } catch (err) {
      alert("Error generating key");
    } finally {
      setLoading(false);
    }
  };
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">API Keys</h1>
            <p className="text-slate-500">
              Manage your credentials to access MeterFlow APIs.
            </p>
          </div>
          <button
            onClick={generateKey}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Generating..." : "+ Generate New Key"}
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Key Name
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Secret Key
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                  Created {/* ✅ ADD THIS */}
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-600 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keys.map((k) => (
                <tr key={k._id} className="hover:bg-slate-50 transition">
                  <td className="px-6 py-4 font-medium text-slate-700">
                    Default Key
                  </td>
                  <td className="px-6 py-4 font-mono text-sm text-slate-500">
                    {k.key.substring(0, 8)}****************
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      Active
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 text-slate-500 text-sm">
                    {k.createdAt
                      ? new Date(k.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleCopy(k.key, k._id)}
                      className={`text-xs font-bold px-4 py-2 rounded-lg transition ${
                        copiedId === k._id
                          ? "bg-green-500 text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {copiedId === k._id ? "Copied!" : "Copy Key"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {keys.length === 0 && (
            <div className="p-10 text-center text-slate-400">
              No API keys found. Generate one to get started!
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ApiKeys;
