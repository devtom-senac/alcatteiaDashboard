import React from "react";

const colorMap = {
  União: {
    bg: "bg-purple-700",
    header: "bg-gray-800",
    percent: "text-purple-200",
  },
  Comunicação: {
    bg: "bg-purple-700",
    header: "bg-gray-800",
    percent: "text-purple-200",
  },
  Empenho: {
    bg: "bg-purple-700",
    header: "bg-gray-800",
    percent: "text-purple-200",
  },
  Foco: {
    bg: "bg-purple-700",
    header: "bg-gray-800",
    percent: "text-purple-200",
  },
};

export default function MetricModal({
  isOpen,
  onClose,
  atributo,
  percent,
  pontosFortes,
  pontosFracos,
  causasRaiz,
  fatoresSecundarios,
  influenciasExternas,
  planoAcao,
  atualizadoEm,
}) {
  if (!isOpen) return null;

  const colors = colorMap[atributo] || colorMap["União"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        className={`rounded-2xl shadow-2xl w-[90vw] max-w-2xl`}
        style={{ width: "40%" }}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-4 rounded-t-2xl ${colors.header}`}>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white">{atributo}</span>
            <span className={`ml-2 text-xl font-bold ${colors.percent}`}>{percent}%</span>
          </div>
          <button
            className="text-gray-400 hover:text-white text-2xl font-bold"
            onClick={onClose}
            aria-label="Fechar"
          >
            &times;
          </button>
        </div>
        {/* Body */}
        <div className={`${colors.bg} px-6 py-6 rounded-b-2xl`}>
          {/* Diagnóstico Rápido */}
          <h2 className="text-xl font-semibold text-white mb-4">Diagnóstico Rápido</h2>
          {/* Pontos Fortes */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-green-200 mb-2">Pontos fortes</h3>
            <ul className="space-y-1 pl-4">
              {pontosFortes.map((item, idx) => (
                <li key={idx} className="flex items-center text-sm text-white">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Pontos Fracos */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-red-200 mb-2">Pontos fracos</h3>
            <ul className="space-y-1 pl-4">
              {pontosFracos.map((item, idx) => (
                <li key={idx} className="flex items-center text-sm text-white">
                  <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {/* Causas Raiz e Insights */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white mb-1">Causas Raiz e Insights</h3>
            <p className="text-sm text-purple-100 mb-2">{causasRaiz}</p>
            {/* Mapa de causas */}
            <div className="bg-gray-100 rounded-lg p-4 mb-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Mapa de causas</h4>
              <h5 className="text-xs font-semibold text-gray-600 mb-1">Possíveis Fatores Secundários</h5>
              <ul className="space-y-1 pl-4 mb-2">
                {fatoresSecundarios.map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-700">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
              <h5 className="text-xs font-semibold text-gray-600 mb-1">Influências externas</h5>
              <ul className="space-y-1 pl-4">
                {influenciasExternas.map((item, idx) => (
                  <li key={idx} className="flex items-center text-xs text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Plano de Ação */}
          <div className="mb-4">
            <h3 className="text-base font-semibold text-white mb-2">Plano de Ação</h3>
            <div className="grid gap-2">
              {planoAcao.map((acao, idx) => (
                <div key={idx} className="flex items-center bg-gray-100 rounded-lg p-3">
                  <span className="text-green-600 text-xl mr-3">✅</span>
                  <div className="flex-1">
                    <div className="text-sm text-gray-800 font-semibold">{acao.titulo}</div>
                    <div className="text-xs text-gray-600">
                      Responsável: {acao.responsavel} | Prazo: {acao.prazo}
                    </div>
                  </div>
                  <button className="ml-4 text-purple-700 text-2xl hover:text-purple-900" title="Criar evento">
                    ➕
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Atualizado em */}
          <div className="text-xs text-gray-300 mt-4 text-right">
            Atualizado em: {atualizadoEm}
          </div>
        </div>
      </div>
    </div>
  );
}