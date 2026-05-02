import React, { useState, useEffect } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

const UsageLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get("/api/usage");
        // Sorting logs to show the newest first
        const sortedLogs = res.data.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        );
        setLogs(sortedLogs);
      } catch (err) {
        console.error("Failed to fetch logs");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="ml-64 p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Usage Logs</h1>
          <p className="text-slate-500">
            A detailed history of every request made through your API gateway.
          </p>
        </header>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Endpoint
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    API Key (Partial)
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-indigo-600">
                      {log.endpoint}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {log.apiKey ? `${log.apiKey.substring(0, 10)}...` : "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">
                        SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {logs.length === 0 && !loading && (
            <div className="p-20 text-center">
              <p className="text-slate-400 italic">
                No activity recorded yet. Start making API calls!
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UsageLogs;
