import React, { useState } from "react";
import logo from "../assets/logo.png"; 

export default function Header({ notificacoes = [], onAbrirNotificacoes, user }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const notificacaoNaoLida = notificacoes.some(n => !n.lida);

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-[#1a1332] shadow  border-b-2 border-white">
      {/* Esquerda: Logo e nome */}
      <div className="flex items-center gap-3">
        <img src={logo} alt="Logo" className="h-10 w-10 rounded-full" />
        <span className="text-2xl font-raleway font-bold text-white tracking-wide">Alcatteia</span>
      </div>

      {/* Direita: Notificações e perfil */}
      <div className="flex items-center gap-6 relative">
        {/* Sino de notificações */}
        <button className="relative" onClick={onAbrirNotificacoes}>
          <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6.002 6.002 0 0 0-4-5.659V4a2 2 0 1 0-4 0v1.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 1 1-6 0v-1m6 0H9" />
          </svg>
          {notificacaoNaoLida && (
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 border-2 border-[#1a1332]"></span>
          )}
        </button>

        {/* Foto de perfil */}
        <div className="relative">
          <button onClick={() => setMenuAberto((v) => !v)} className="focus:outline-none">
            <img
              src={user?.foto || "https://ui-avatars.com/api/?name=User"}
              alt="Perfil"
              className="w-9 h-9 rounded-full border-2 border-white object-cover"
            />
          </button>
          {/* Dropdown do perfil */}
          {menuAberto && (
            <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg z-50">
              <div className="px-4 py-2 text-gray-700 border-b">{user?.nome || "Usuário"}</div>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Meu perfil</button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700">Sair</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}