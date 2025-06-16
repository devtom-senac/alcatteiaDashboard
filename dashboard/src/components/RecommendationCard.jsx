import React from "react";

export default function RecommendationCard({ atributo, sugestoes, onVerMais }) {
  return (
    <div className="flex-1 min-w-[200px] bg-gray-800 rounded-xl p-6 shadow flex flex-col justify-between">
      <div className="flex items-center gap-3 mb-4">
        {/* Ícone de lâmpada */}
        <svg className="w-7 h-7 text-yellow-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3.5 5.5V17a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-2.5C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z" />
        </svg>
        <span className="text-lg font-semibold text-yellow-300">Recomendações</span>
      </div>
      <div>
        <span className="text-gray-300">Sugestões para melhorar <b>{atributo}</b>:</span>
        <ul className="list-disc list-inside mt-2 text-gray-200">
          {sugestoes.slice(0, 2).map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </div>
      <button
        className="mt-2 text-sm text-yellow-400 hover:underline self-start"
        onClick={onVerMais}
      >
        Ver mais
      </button>
    </div>
  );
}