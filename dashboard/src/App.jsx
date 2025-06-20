// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import NavLateral from "./components/NavLateral";

// Importe todos os Dashboards e Áreas de Equipe
import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import LeaderTeamArea from "./pages/TeamArea/LeaderTeamArea";
import HrDashboard from "./pages/Dashboard/HrDashboard";
// import HrTeamArea from "./pages/TeamArea/HrTeamArea"; // Esta importação será removida se RhDashboard for a única visão de RH
import MemberDashboard from "./pages/Dashboard/MemberDashboard";
// import MemberTeamArea from "./pages/TeamArea/MemberTeamArea"; // Esta importação será removida se MemberDashboard for a única visão de Member

// Dados mockados (movidos para fora do AppContent para serem acessíveis)
const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png",
};

// Componente Wrapper para o conteúdo principal do App (usa useNavigate)
function AppContent() {
  const [profile, setProfile] = useState("leader"); // Estado de perfil simulado
  const navigate = useNavigate(); // Hook de navegação

  // Função para mudar o perfil e navegar para o dashboard inicial
  const handleProfileChange = (newProfile) => {
    setProfile(newProfile);
    navigate("/"); // Sempre navega para a rota raiz (dashboard) do novo perfil
  };

  // Componente que decide qual Dashboard renderizar
  const CurrentDashboard = () => {
    if (profile === "leader") return <LeaderDashboard />;
    if (profile === "hr") return <HrDashboard />;
    if (profile === "member") return <MemberDashboard />;
    return <p className="text-white text-center text-xl mt-20">Selecione um perfil para visualizar o dashboard.</p>;
  };

  // Componente que decide qual TeamArea renderizar (apenas Líder tem acesso)
  const CurrentTeamArea = () => {
    if (profile === "leader") {
      return <LeaderTeamArea />;
    } else {
      // Para RH e Membro, não há acesso à TeamArea
      return (
        <div className="flex flex-col items-center justify-center h-full text-white text-center p-8">
          <p className="text-4xl mb-4">🚫</p>
          <h2 className="text-3xl font-bold text-white-mb-2"> Seu perfil não tem acesso a área da equipe</h2>
          <p className="text-md text-gray-400 mt-2">
            Por favor, retorne ao seu dashboard.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors font-semibold"
          >
            Voltar para o Dashboard
          </button>
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0B0011]">
      {/* Botões de seleção de perfil (simulação) */}
      <div className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
        <span>Perfil Ativo (Simulação):</span>
        <button
          onClick={() => handleProfileChange("leader")}
          className={`px-3 py-1 rounded transition ${profile === "leader" ? "bg-purple-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Líder
        </button>
        <button
          onClick={() => handleProfileChange("hr")}
          className={`px-3 py-1 rounded transition ${profile === "hr" ? "bg-teal-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          RH
        </button>
        <button
          onClick={() => handleProfileChange("member")}
          className={`px-3 py-1 rounded transition ${profile === "member" ? "bg-blue-600 font-bold" : "bg-gray-700 hover:bg-gray-600"}`}
        >
          Membro
        </button>
      </div>

      <Header notificacoes={notificacoes} user={user} />
      <div className="flex flex-1 min-h-0">
        {/* NavLateral (não precisa de props de perfil, já que as rotas são fixas) */}
        <NavLateral />
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            {/* Rota para o Dashboard (dinâmico pelo perfil) */}
            <Route path="/" element={<CurrentDashboard />} />
            {/* Rota para a Área da Equipe (Líder tem acesso, outros não) */}
            <Route path="/equipe" element={<CurrentTeamArea />} />

            {/* Rotas de fallback para lidar com caminhos não encontrados */}
            <Route path="*" element={<p className="text-white text-center text-xl mt-20">404 - Página Não Encontrada.</p>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

// O componente principal App que engloba o Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}