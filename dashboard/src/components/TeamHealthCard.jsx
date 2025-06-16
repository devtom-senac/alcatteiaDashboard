import React from "react";

export default function TeamHealthCard({ percent, tendencia, atributos }) {
  return (
    <div className="flex-1 min-w-[220px] bg-gradient-to-br from-green-700 to-green-900 rounded-xl p-6 shadow-lg max-h-[200px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-white text-lg">Saúde Geral da Equipe</h3>
        {tendencia && (
          <span className={`text-xs font-bold ${tendencia.startsWith("+") ? "text-green-300" : "text-red-300"}`}>
            {tendencia}
          </span>
        )}
      </div>
      <div className="flex items-center gap-4 mb-2">
        <div className="text-4xl font-bold text-white">{percent}%</div>
        <div className="flex-1">
          <div className="w-full bg-green-950 rounded-full h-3">
            <div
              className="bg-green-400 h-3 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="text-xs text-green-200 mb-2">
        A saúde da equipe é impactada diretamente pelos atributos:
        <span className="font-semibold ml-1">
          {atributos.join(", ")}
        </span>
      </div>
      <div className="flex gap-2 mt-1">
        {atributos.map((attr, idx) => (
          <span
            key={idx}
            className="bg-green-800 text-green-100 px-2 py-0.5 rounded text-xs"
          >
            {attr}
          </span>
        ))}
      </div>
    </div>
  );
}