import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Usage Logs', path: '/usage-logs' },
    { name: 'API Keys', path: '/api-keys' },
    { name: 'Billing', path: '/billing' },
  ];

  return (
    <div className="w-64 bg-slate-900 fixed top-0 left-0 h-screen border-r border-slate-800 p-6 flex flex-col">

      
      <h2 className="text-2xl font-bold text-indigo-400 mb-10 px-2">
        MeterFlow
      </h2>

      
      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block p-3 rounded-xl font-medium transition ${
              location.pathname === item.path
                ? 'bg-indigo-500/20 text-indigo-400'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      
      <button
        onClick={handleLogout}
        className="text-red-400 p-3 rounded-xl hover:bg-red-500/10 text-left transition font-medium"
      >
        Sign Out
      </button>

    </div>
  );
};

export default Sidebar;