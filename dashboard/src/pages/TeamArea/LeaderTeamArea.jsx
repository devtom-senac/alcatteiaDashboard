import React, { useState, useEffect } from "react";
import { FiUserPlus, FiX, FiUser, FiMessageCircle, FiTrash2 } from "react-icons/fi";
import tom from "../../assets/tom.png"; // avatar exemplo

// Estado inicial com membros cadastrados
const initialMembers = [
  {
    id: 1,
    name: "Talita Vitória",
    role: "Back-end",
    email: "talita@proa.com",
    photo: tom,
    status: "online",
  },
  {
    id: 2,
    name: "Gabriel Cabral",
    role: "Front-end",
    email: "gabriel@proa.com",
    photo: tom,
    status: "offline",
  },
  {
    id: 3,
    name: "Felipe Oliveira",
    role: "Back-end",
    email: "felipe@proa.com",
    photo: tom,
    status: "online",
  },
  {
    id: 4,
    name: "Heverton Souza",
    role: "Front-end",
    email: "heverton@proa.com",
    photo: tom,
    status: "online",
  },
  {
    id: 5,
    name: "Pedro Miguel",
    role: "Front-end",
    email: "pedro@proa.com",
    photo: tom,
    status: "offline",
  },
  {
    id: 6,
    name: "Isabelle Gomes",
    role: "Full-stack",
    email: "isabelle@proa.com",
    photo: tom,
    status: "online",
  },
  {
    id: 7,
    name: "Gabriel de Alencar",
    role: "Front-end",
    email: "alencar@proa.com",
    photo: tom,
    status: "online",
  },
  {
    id: 8,
    name: "Rafaela Milk",
    role: "Back-end",
    email: "rafaela@proa.com",
    photo: tom,
    status: "offline",
  },
  {
    id: 9,
    name: "Débora Paixão",
    role: "Teacher",
    email: "debora@proa.com",
    photo: tom,
    status: "online",
  },
];

export default function LeaderTeamArea() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [loading, setLoading] = useState(false);

  // Futuro: buscar membros do back-end
  // useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/team-members")
  //     .then(res => res.json())
  //     .then(data => {
  //       setMembers(data);
  //       setLoading(false);
  //     });
  // }, []);

  // Filtro de busca
  const filteredMembers = members.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  // Mock de usuários disponíveis para adicionar (futuramente virá do back-end)
  const availableUsers = [
    { id: 10, name: "Novo Usuário", role: "Front-end", email: "novo@proa.com", photo: tom, status: "offline" },
    // ...adicione mais se quiser
  ];

  // Adicionar membro (mock)
  function handleAddMember(user) {
    setMembers([...members, user]);
    setShowAddModal(false);
  }

  // Remover membro (mock)
  function handleRemoveMember() {
    setMembers(members.filter(m => m.id !== selectedMember.id));
    setShowRemoveModal(false);
    setSelectedMember(null);
  }

  return (
    <section className="w-full max-w-5xl mx-auto mt-8 mb-8">
      {/* Header da equipe */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Equipe: <span className="text-purple-400">Alcatteia</span></h2>
          <span className="text-gray-300 text-base">Instituição: Instituto PROA</span>
        </div>
        <button
          className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          onClick={() => setShowAddModal(true)}
        >
          <FiUserPlus className="w-5 h-5" />
          Adicionar Membro
        </button>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome, função ou e-mail..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
        />
      </div>

      {/* Lista de membros */}
      <div className="flex flex-col gap-4">
        {loading && <div className="text-center text-gray-400">Carregando membros...</div>}
        {!loading && filteredMembers.length === 0 && (
          <div className="text-center text-gray-400">Nenhum membro encontrado.</div>
        )}
        {!loading && filteredMembers.map((m) => (
          <div key={m.id} className="flex items-center bg-[#232046] rounded-lg p-4 shadow min-w-0 max-w-full">
            <div className="relative mr-4">
              <img
                src={m.photo}
                alt={m.name}
                className="w-14 h-14 rounded-full border-4 border-purple-400 object-cover"
              />
              {/* Status */}
              <span
                className={`absolute bottom-1 right-1 block w-3 h-3 rounded-full border-2 border-white`}
                style={{ background: m.status === "online" ? "#22c55e" : "#a1a1aa" }}
              ></span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-base font-bold text-white truncate">{m.name}</span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-700 text-purple-300">
                  {m.role}
                </span>
              </div>
              <span className="text-xs text-gray-400 block">{m.email}</span>
            </div>
            <div className="flex flex-col gap-2 ml-4">
              <button
                className="flex items-center gap-1 bg-gray-700 hover:bg-gray-800 text-white text-xs px-3 py-1 rounded transition"
                title="Ver perfil"
              >
                <FiUser className="w-4 h-4" /> Perfil
              </button>
              <button
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition"
                title="Enviar mensagem"
              >
                <FiMessageCircle className="w-4 h-4" /> Mensagem
              </button>
              <button
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded transition"
                title="Remover membro"
                onClick={() => { setSelectedMember(m); setShowRemoveModal(true); }}
              >
                <FiTrash2 className="w-4 h-4" /> Remover
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para adicionar membro */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18162a] rounded-xl p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowAddModal(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiUserPlus /> Adicionar membro à equipe
            </h3>
            <div className="flex flex-col gap-4">
              {availableUsers.map(user => (
                <div key={user.id} className="flex items-center gap-4 bg-[#232046] rounded-lg p-3">
                  <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full border-2 border-purple-400 object-cover" />
                  <div className="flex-1">
                    <span className="font-bold text-white">{user.name}</span>
                    <span className="ml-2 text-xs text-purple-300">{user.role}</span>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded transition"
                    onClick={() => handleAddMember(user)}
                  >
                    Adicionar
                  </button>
                </div>
              ))}
              {availableUsers.length === 0 && (
                <div className="text-gray-400 text-center">Nenhum usuário disponível para adicionar.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal para remover membro */}
      {showRemoveModal && selectedMember && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18162a] rounded-xl p-8 w-full max-w-sm shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setShowRemoveModal(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiTrash2 /> Remover membro
            </h3>
            <p className="text-gray-300 mb-6">
              Tem certeza que deseja remover <span className="font-bold">{selectedMember.name}</span> da equipe?
            </p>
            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
                onClick={() => setShowRemoveModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                onClick={handleRemoveMember}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}