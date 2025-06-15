// src/components/NavLateral.jsx
import React from 'react';
import { FiHome, FiSettings, FiUsers, FiMessageCircle } from 'react-icons/fi';

const NavLateral = () => {
  return (
    <nav className="bg-purple-950 w-50 fixed top-16 left-0 h-[calc(100vh-4rem)] flex flex-col items-center py-4 space-y-6 shadow-lg z-20">
      {/* A navegação lateral ficará vazia por enquanto, com alguns ícones de exemplo */}
      <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700">
        <FiHome size={24} />
      </button>
      <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700">
        <FiUsers size={24} />
      </button>
      <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700">
        <FiMessageCircle size={24} />
      </button>
      <button className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-lg hover:bg-gray-700">
        <FiSettings size={24} />
      </button>
    </nav>
  );
};

export default NavLateral;