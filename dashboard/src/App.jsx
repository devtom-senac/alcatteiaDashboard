import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavLateral from "./components/NavLateral";
import Dashboard from "./pages/Dashboard";
import EquipeArea from "./pages/EquipeArea";

const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png",
};

export default function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#0B0011]">
        {/* Header sempre no topo */}
        <Header notificacoes={notificacoes} user={user} />
        <div className="flex flex-1 min-h-0">
          {/* NavLateral ocupa só a lateral esquerda */}
          <NavLateral />
          {/* Conteúdo principal */}
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/equipe" element={<EquipeArea />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}