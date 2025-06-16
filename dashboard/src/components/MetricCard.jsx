import React from "react";

export default function MetricCard({ card, onClick }) {
  return (
    <div
      className="card flex-1 min-w-[200px] bg-gray-800 rounded-xl p-3 shadow max-h-[200px] 
      transition-transform duration-200 hover:scale-102"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-300">{card.title}</h3>
        {card.trend && (
          <div className={`${card.trendColor} rounded-full px-3 py-1 text-sm`}>
            {card.trend}
          </div>
        )}
      </div>
      {card.percent !== undefined && (
        <>
          <div className="text-3xl font-bold text-gray-100 mb-2">{card.percent}%</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
            <div
              className={`${card.barColor} h-2.5 rounded-full`}
              style={{ width: `${card.percent}%` }}
            ></div>
          </div>
        </>
      )}
      <button
        className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 py-2 rounded-lg text-sm transition"
        onClick={onClick}
      >
        Ver completo
      </button>
    </div>
  );
}