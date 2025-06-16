import React from "react";

export default function EmotionalHealthCard({
  clima = [],
  resumo = "",
  tendencia = null,
  onClick,
}) {
  return (
    <div className="w-full max-w-xl bg-gray-800 rounded-xl p-3 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-base font-semibold text-white">Saúde Emocional</span>
        {tendencia && (
          <span className={`text-xs font-bold ${tendencia.startsWith("+") ? "text-green-400" : "text-red-400"}`}>
            {tendencia}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 mb-2">
        {clima.map((e, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-2xl">{e.icon}</span>
            <span className="text-xs text-gray-200">{e.name}</span>
            <span className="ml-auto text-xs text-pink-200 font-bold">{e.percent}%</span>
          </div>
        ))}
      </div>
      <div className="text-xs text-pink-100 mb-3">{resumo}</div>
      <button
        className="w-full bg-pink-800 hover:bg-pink-700 text-white py-1.5 rounded-lg text-xs transition"
        onClick={onClick}
      >
        Ver detalhes
      </button>
    </div>
  );
}