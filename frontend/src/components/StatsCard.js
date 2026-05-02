import React from 'react';

const StatsCard = ({ title, value, subtitle, iconColor }) => {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
            <p className="text-slate-500 text-sm font-medium">{title}</p>
            <h3 className="text-3xl font-bold mt-2 text-slate-800">{value}</h3>
            <p className={`text-xs mt-2 font-semibold ${iconColor}`}>{subtitle}</p>
        </div>
    );
};

export default StatsCard;