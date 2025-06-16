import React, { useState } from "react";
import { FiUserPlus, FiX, FiUser, FiMessageCircle } from "react-icons/fi";
import Tom from "../assets/tom.png";

const funcoes = [
  "Back-end",
  "Front-end",
  "Full-stack",
  "Professora"
];

const membrosBase = [
  {
    nome: "Talita Vitória",
    funcao: "Back-end",
    foto: Tom,
    email: "talita@proa.com",
    cor: "#a78bfa",
    status: "online",
    frase: "Código limpo é código feliz.",
    skills: ["Node.js", "SQL", "API REST"]
  },
  {
    nome: "Gabriel Cabral",
    funcao: "Front-end",
    foto: Tom,
    email: "gabriel@proa.com",
    cor: "#34d399",
    status: "offline",
    frase: "A alcatteia tem todas as funcionalidades, todas elas.",
    skills: ["React", "Tailwind", "UX/UI"]
  },
  {
    nome: "Felipe Oliveira",
    funcao: "Back-end",
    foto: Tom,
    email: "felipe@proa.com",
    cor: "#60a5fa",
    status: "online",
    frase: "O back-end é onde a mágica acontece.",
    skills: ["Python", "Django", "API REST"]
  },
  {
    nome: "Heverton Souza",
    funcao: "Front-end",
    foto: Tom,
    email: "heverton@proa.com",
    cor: "#fb923c",
    status: "online",
    frase: "Eitaaa Glória",
    skills: ["React", "Javascript", "Figma"]
  },
  {
    nome: "Pedro Miguel",
    funcao: "Front-end",
    foto: Tom,
    email: "pedro@proa.com",
    cor: "#22d3ee",
    status: "offline",
    frase: "Sempre aprendendo um novo framework.",
    skills: ["Vue.js", "CSS", "HTML"]
  },
  {
    nome: "Isabelle Gomes",
    funcao: "Full-stack",
    foto: Tom,
    email: "isabelle@proa.com",
    cor: "#f472b6",
    status: "online",
    frase: "Full-stack: do banco ao botão.",
    skills: ["React", "Node.js", "MongoDB"]
  },
  {
    nome: "Gabriel de Alencar",
    funcao: "Front-end",
    foto: Tom,
    email: "alencar@proa.com",
    cor: "#f87171",
    status: "online",
    frase: "Eu não faço css na mão.",
    skills: ["React", "Styled Components"]
  },
  {
    nome: "Rafaela Milk",
    funcao: "Back-end",
    foto: Tom,
    email: "rafaela@proa.com",
    cor: "#fde047",
    status: "offline",
    frase: "API boa é API documentada.",
    skills: ["Java", "Spring", "MySQL"]
  },
  {
    nome: "Débora Paixão",
    funcao: "Professora",
    foto: Tom,
    email: "debora@proa.com",
    cor: "#18181b",
    status: "online",
    frase: "Deus abençoe nego😎.",
    skills: ["Mentoria", "Gestão", "Educação"]
  },
];

export default function EquipeArea() {
  const [modalOpen, setModalOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(null);
  const [busca, setBusca] = useState("");
  const [novoMembro, setNovoMembro] = useState({
    nome: "",
    funcao: funcoes[0],
    email: "",
    cor: "#6366f1",
  });
  const [membros, setMembros] = useState(membrosBase);

  function handleInput(e) {
    setNovoMembro({ ...novoMembro, [e.target.name]: e.target.value });
  }

  function adicionarMembro() {
    setMembros([...membros, { ...novoMembro, foto: Tom, status: "online", frase: "Novo membro na alcateia!", skills: [] }]);
    setModalOpen(false);
    setNovoMembro({ nome: "", funcao: funcoes[0], email: "", cor: "#6366f1" });
  }

  // Busca inteligente
  const membrosFiltrados = membros.filter(
    m =>
      m.nome.toLowerCase().includes(busca.toLowerCase()) ||
      m.funcao.toLowerCase().includes(busca.toLowerCase())
  );

  // Divide membros em pares para duas colunas
  const linhas = [];
  for (let i = 0; i < membrosFiltrados.length; i += 2) {
    linhas.push(membrosFiltrados.slice(i, i + 2));
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
          onClick={() => setModalOpen(true)}
        >
          <FiUserPlus className="w-5 h-5" />
          Adicionar Membro
        </button>
      </div>

      {/* Busca */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar por nome ou função..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full rounded px-4 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
        />
      </div>

      {/* Lista de membros em duas colunas */}
      <div className="flex flex-col gap-4">
        {linhas.map((linha, idx) => (
          <div key={idx} className="flex gap-4">
            {linha.map((m, i) => (
              <div key={m.nome} className="flex flex-1 items-center bg-[#232046] rounded-lg p-4 shadow min-w-0 max-w-full">
                <div className="relative mr-4">
                  <img
                    src={m.foto}
                    alt={m.nome}
                    className="w-14 h-14 rounded-full border-4"
                    style={{ borderColor: m.cor }}
                  />
                  <span
                    className={`absolute bottom-1 right-1 block w-3 h-3 rounded-full border-2 border-white`}
                    style={{ background: m.status === "online" ? m.cor : "#a1a1aa" }}
                  ></span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base font-bold text-white truncate">{m.nome}</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded" style={{ background: "#fff2", color: m.cor }}>
                      {m.funcao}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 italic block truncate">{m.frase}</span>
                  <span className="text-xs text-gray-500 block">{m.email}</span>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    className="bg-gray-700 hover:bg-gray-800 text-white text-xs px-3 py-1 rounded transition flex items-center gap-1"
                    onClick={() => setPerfilOpen(m)}
                  >
                    <FiUser className="w-4 h-4" /> Perfil
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded transition flex items-center gap-1">
                    <FiMessageCircle className="w-4 h-4" /> Mensagem
                  </button>
                </div>
              </div>
            ))}
            {linha.length < 2 && <div className="flex-1"></div>}
          </div>
        ))}
      </div>

      {/* Modal de adicionar membro */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18162a] rounded-xl p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setModalOpen(false)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <FiUserPlus /> Novo Membro
            </h3>
            <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); adicionarMembro(); }}>
              <input
                name="nome"
                placeholder="Nome"
                value={novoMembro.nome}
                onChange={handleInput}
                className="rounded px-3 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
                required
              />
              <select
                name="funcao"
                value={novoMembro.funcao}
                onChange={handleInput}
                className="rounded px-3 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
              >
                {funcoes.map(f => <option key={f}>{f}</option>)}
              </select>
              <input
                name="email"
                placeholder="E-mail"
                value={novoMembro.email}
                onChange={handleInput}
                className="rounded px-3 py-2 bg-[#232046] text-white border border-gray-600 focus:outline-none focus:border-purple-400"
                required
              />
              <div>
                <label className="text-gray-300 text-sm">Cor do membro:</label>
                <input
                  type="color"
                  name="cor"
                  value={novoMembro.cor}
                  onChange={handleInput}
                  className="ml-2 w-8 h-8 p-0 border-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="mt-4 bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
              >
                Salvar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal de perfil detalhado */}
      {perfilOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-[#18162a] rounded-xl p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400"
              onClick={() => setPerfilOpen(null)}
            >
              <FiX className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center">
              <img
                src={perfilOpen.foto}
                alt={perfilOpen.nome}
                className="w-20 h-20 rounded-full border-4 mb-4"
                style={{ borderColor: perfilOpen.cor }}
              />
              <h3 className="text-xl font-bold text-white mb-1">{perfilOpen.nome}</h3>
              <span className="text-sm font-semibold px-3 py-1 rounded mb-2" style={{ background: "#fff2", color: perfilOpen.cor }}>
                {perfilOpen.funcao}
              </span>
              <span className="text-xs text-gray-400 italic mb-2">{perfilOpen.frase}</span>
              <span className="text-xs text-gray-300 mb-2">{perfilOpen.email}</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {perfilOpen.skills && perfilOpen.skills.map(skill => (
                  <span key={skill} className="bg-gray-700 text-gray-200 text-xs px-2 py-1 rounded">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}