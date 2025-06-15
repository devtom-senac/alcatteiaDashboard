// src/components/CardSaude.jsx
import React from 'react';
import { FiHeart } from 'react-icons/fi'; // Exemplo de ícone, pode não ser usado diretamente no card de saúde

const CardSaude = () => {
  const percentage = 75;
  const radius = 48;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100 * circumference);

  return (
    <div className="bg-gradient-to-r from-indigo-800 to-purple-900 rounded-xl p-6 shadow-lg flex flex-col md:flex-row items-center justify-between">
      <div className="text-white mb-4 md:mb-0 md:mr-4 text-center md:text-left">
        <h2 className="text-xl font-bold mb-2">Saúde Geral da Equipe</h2>
        <p className="text-sm text-indigo-200">A equipe está em bom estado, mas há espaço para melhorias na comunicação</p>
        <button className="mt-4 bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-600 transition">Ver Detalhes</button>
      </div>
      <div className="relative w-28 h-28 flex-shrink-0">
        <svg className="transform -rotate-90" width="112" height="112">
          <circle className="text-gray-600" strokeWidth="8" fill="transparent" r={radius} cx="56" cy="56" stroke="currentColor" />
          <circle className="text-indigo-500" strokeWidth="8" fill="transparent" r={radius} cx="56" cy="56" stroke="currentColor"
            style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: offset }}
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-center">
            <span className="text-white text-2xl font-bold">{percentage}%</span>
            <p className="text-gray-300 text-xs">Saudável</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSaude;