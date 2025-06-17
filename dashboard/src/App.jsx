// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavLateral from "./components/NavLateral";
import Dashboard from "./pages/Dashboard";
import EquipeArea from "./pages/EquipeArea";
import LeaderDashboard from "./pages/Dashboard/LeaderDashboard";
import LeaderTeamArea from "./pages/TeamArea/LeaderTeamArea";


function HrDashboard() {
  return <div className="text-white text-xl">HR Dashboard (coming soon)</div>;
}
function HrEquipeArea() {
  return <div className="text-white text-xl">HR Team Area (coming soon)</div>;
}
function MemberDashboard() {
  return <div className="text-white text-xl">Member Dashboard (coming soon)</div>;
}
function MemberEquipeArea() {
  return <div className="text-white text-xl">Member Team Area (coming soon)</div>;
}

const notificacoes = [
  { id: 1, texto: "Reunião às 10h", lida: false },
  { id: 2, texto: "Nova tarefa atribuída", lida: true },
];
const user = {
  nome: "Heverton Souza",
  foto: "/assets/perfil.png",
};

export default function App() {
  const [profile, setProfile] = useState("leader");

  return (
    <Router>
      <div className="flex flex-col h-screen bg-[#0B0011]">
        <div className="bg-gray-900 text-white px-4 py-2 flex gap-4 items-center">
          <span>Profile:</span>
          <button onClick={() => setProfile("leader")} className={profile === "leader" ? "font-bold underline" : ""}>Leader</button>
          <button onClick={() => setProfile("hr")} className={profile === "hr" ? "font-bold underline" : ""}>HR</button>
          <button onClick={() => setProfile("member")} className={profile === "member" ? "font-bold underline" : ""}>Member</button>
        </div>
        <Header notificacoes={notificacoes} user={user} />
        <div className="flex flex-1 min-h-0">
          <NavLateral />
          <main className="flex-1 overflow-y-auto p-6">
            <Routes>
              {profile === "leader" && (
                <>
                  <Route path="/" element={<LeaderDashboard />} />
                  <Route path="/equipe" element={<LeaderTeamArea />} />
                </>
              )}
              {profile === "hr" && (
                <>
                  <Route path="/" element={<HrDashboard />} />
                  <Route path="/equipe" element={<HrEquipeArea />} />
                </>
              )}
              {profile === "member" && (
                <>
                  <Route path="/" element={<MemberDashboard />} />
                  <Route path="/equipe" element={<MemberEquipeArea />} />
                </>
              )}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}