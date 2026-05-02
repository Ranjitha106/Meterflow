import React, { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  
  const [stats, setStats] = useState({
    usage: 0,
    bill: 0,
    logs: [],
    apiKeyData: [], 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usageRes, billingRes, logsRes] = await Promise.all([
          api.get("/api/usage-count"),
          api.get("/api/billing"),
          api.get("/api/usage"),
        ]);
        
        const apiKeyData = usageRes.data.map((item, index) => ({
          name: `Key ${index + 1}`,
          requests: item.totalRequests,
        }));

        
        const grouped = {};

        logsRes.data.forEach((log) => {
          const time = new Date(log.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          if (!grouped[time]) {
            grouped[time] = 0;
          }

          grouped[time] += 1;
        });

        const chartData = Object.keys(grouped).map((time) => ({
          name: time,
          requests: grouped[time],
        }));

        const totalUsage = usageRes.data.reduce((sum, item) => {
          return sum + item.totalRequests;
        }, 0);

        const totalBill = billingRes.data.reduce((sum, item) => {
          return sum + item.bill;
        }, 0);

        setStats({
          usage: totalUsage,
          bill: totalBill,
          logs: chartData,
          apiKeyData: apiKeyData,
        });
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen font-bold text-indigo-600">
        Loading MeterFlow...
      </div>
    );

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">Welcome back!</h1>
          <p className="text-slate-500">
            Here is what's happening with your APIs today.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Requests"
            value={stats.usage}
            subtitle="Current Period"
            iconColor="text-blue-500"
          />
          <StatsCard
            title="Billing Amount"
            value={`₹${stats.bill}`}
            subtitle="Due this month"
            iconColor="text-green-500"
          />
          <StatsCard
            title="Status"
            value="Active"
            subtitle="System Healthy"
            iconColor="text-indigo-500"
          />
        </div>

        <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-2xl border border-slate-200 shadow-md hover:shadow-lg transition">
          <h3 className="text-lg font-bold mb-6 text-slate-800">
            Traffic Overview
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.logs}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />
                <YAxis hide={true} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          
         <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-lg transition">
            <h3 className="text-lg font-bold mb-4">Requests per API Key</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.apiKeyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="requests"
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          
<div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl border border-indigo-100 shadow-md hover:shadow-lg transition">            <h3 className="text-lg font-bold mb-4">Usage Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.apiKeyData}
                    dataKey="requests"
                    nameKey="name"
                    outerRadius={100}
                    label
                  >
                    {stats.apiKeyData.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={
                          ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"][
                            index % 4
                          ]
                        }
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
