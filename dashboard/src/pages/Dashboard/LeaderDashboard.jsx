// Página do dashboard do líder (pronta para integração com backend)
import React, { useState, useEffect } from "react";
// Cartão de métricas
import MetricCard from "../../components/MetricCard";
// Cartão de saúde da equipe
import TeamHealthCard from "../../components/TeamHealthCard";
// Cartão de saúde emocional
import EmotionalHealthCard from "../../components/EmotionalHealthCard";
// Recomendações de melhoria
import RecommendationCard from "../../components/RecommendationCard";
// Modal de detalhes
import Modal from "../../components/Modal";

// Métricas zeradas (serão preenchidas pela API)
const initialMetrics = {
  uniao: { percent: 0, atributo: "União", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
  empenho: { percent: 0, atributo: "Empenho", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
  comunicacao: { percent: 0, atributo: "Comunicação", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
  foco: { percent: 0, atributo: "Foco", pontosFortes: [], pontosFracos: [], causasRaiz: "", planoAcao: [] },
  saudeEmocional: { percent: 0, atributo: "Saúde Emocional" }
};

// Clima emocional zerado
const initialClimate = [
  { name: "Ótimo", percent: 0, icon: "😎" },
  { name: "Bem", percent: 0, icon: "😊" },
  { name: "Cansado", percent: 0, icon: "😅" },
  { name: "Estressado", percent: 0, icon: "😡" }
];

// Recomendações por atributo
const suggestionsByAttribute = {
  uniao: [
    "Promover dinâmicas de integração",
    "Realizar reuniões de feedback coletivo",
    "Organizar eventos informais entre a equipe"
  ],
  comunicacao: [
    "Implementar reuniões diárias rápidas",
    "Criar canais de comunicação específicos",
    "Fazer rodadas de feedback aberto"
  ],
  empenho: [
    "Reconhecer conquistas individuais e coletivas",
    "Definir metas claras e alcançáveis",
    "Promover desafios motivacionais"
  ],
  foco: [
    "Estabelecer horários sem interrupções",
    "Priorizar tarefas em conjunto",
    "Reduzir reuniões desnecessárias"
  ],
  saudeEmocional: [
    "Fazer check-ins de humor semanais",
    "Promover pausas para relaxamento",
    "Estimular conversas sobre bem-estar"
  ]
};

export default function LeaderDashboard() {
  const [metrics, setMetrics] = useState(initialMetrics);
  const [climate, setClimate] = useState(initialClimate);
  const [trend, setTrend] = useState("+0%");
  const [summary, setSummary] = useState("Aguardando dados...");
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  // Exemplo de fetch futuro:
  // useEffect(() => {
  //   fetch("/api/leader-dashboard")
  //     .then(res => res.json())
  //     .then(data => {
  //       setMetrics(data.metrics);
  //       setClimate(data.climate);
  //       setTrend(data.trend);
  //       setSummary(data.summary);
  //     });
  // }, []);

  // Descobrir o atributo com menor percent
  const attributes = ["uniao", "comunicacao", "empenho", "foco", "saudeEmocional"];
  const lowestAttribute = attributes.reduce(
    (lowest, current) =>
      metrics[current] && metrics[current].percent < metrics[lowest].percent
        ? current
        : lowest,
    attributes[0]
  );

  // Cards de métricas
  const metricCards = [
    {
      id: "uniao",
      title: "União",
      ...metrics.uniao,
      trend: "+0%",
      trendColor: "bg-blue-500 text-white font-bold",
      barColor: "bg-blue-500"
    },
    {
      id: "empenho",
      title: "Empenho",
      ...metrics.empenho,
      trend: "+0%",
      trendColor: "bg-pink-500 text-white font-bold",
      barColor: "bg-pink-500"
    },
    {
      id: "comunicacao",
      title: "Comunicação",
      ...metrics.comunicacao,
      trend: "0%",
      trendColor: "bg-orange-500 text-white font-bold",
      barColor: "bg-orange-500"
    },
    {
      id: "foco",
      title: "Foco",
      ...metrics.foco,
      trend: "0%",
      trendColor: "bg-yellow-500 text-white font-bold",
      barColor: "bg-yellow-500"
    }
  ];

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center p-6">
      <div
        className="w-full max-w-6xl mx-auto h-full flex flex-col"
        style={{ height: "calc(100vh - 150px)" }}
      >
        {/* Linha 1: Saúde Geral e Recomendações */}
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <TeamHealthCard
            percent={metrics.uniao.percent}
            tendencia={trend}
            atributos={["União", "Empenho", "Comunicação", "Foco", "Saúde Emocional"]}
          />
          <RecommendationCard
            atributo={metrics[lowestAttribute].atributo}
            sugestoes={suggestionsByAttribute[lowestAttribute]}
            onVerMais={() => setActiveModal("recommendations-modal")}
            className="w-[320px]"
          />
        </div>

        {/* Linha 2: Métricas e Emocional lado a lado */}
        <div className="flex-1 flex flex-col md:flex-row gap-6 h-full">
          {/* Métricas em duas colunas */}
          <div className="flex flex-1 gap-4">
            <div className="flex flex-col gap-4 flex-1">
              <MetricCard
                card={metricCards.find((c) => c.id === "uniao")}
                onClick={() => {
                  setModalData(metrics.uniao);
                  setActiveModal("uniao");
                }}
              />
              <MetricCard
                card={metricCards.find((c) => c.id === "empenho")}
                onClick={() => {
                  setModalData(metrics.empenho);
                  setActiveModal("empenho");
                }}
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <MetricCard
                card={metricCards.find((c) => c.id === "foco")}
                onClick={() => {
                  setModalData(metrics.foco);
                  setActiveModal("foco");
                }}
              />
              <MetricCard
                card={metricCards.find((c) => c.id === "comunicacao")}
                onClick={() => {
                  setModalData(metrics.comunicacao);
                  setActiveModal("comunicacao");
                }}
              />
            </div>
          </div>
          {/* Emocional ao lado das métricas */}
          <div className="flex-1 flex items-stretch">
            <EmotionalHealthCard
              clima={climate}
              resumo={summary}
              tendencia={trend}
              onClick={() => setActiveModal("emotional-details")}
            />
          </div>
        </div>
      </div>

      {/* Modal Métricas */}
      <Modal
        isOpen={["uniao", "empenho", "comunicacao", "foco"].includes(activeModal)}
        onClose={() => setActiveModal(null)}
      >
        {modalData && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-lg font-semibold text-blue-600">
                {modalData.atributo}
              </h3>
              <span className="text-2xl font-bold text-blue-600">
                {modalData.percent}%
              </span>
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-1">Pontos Fortes:</span>
              <ul className="list-disc list-inside">
                {modalData.pontosFortes && modalData.pontosFortes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-1">Pontos Fracos:</span>
              <ul className="list-disc list-inside">
                {modalData.pontosFracos && modalData.pontosFracos.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-1">Causa Raiz:</span>
              <span>{modalData.causasRaiz}</span>
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-1">Plano de Ação:</span>
              <ul className="list-disc list-inside">
                {modalData.planoAcao && modalData.planoAcao.map((acao, idx) => (
                  <li key={idx}>
                    <span className="font-semibold">{acao.titulo}</span> -{" "}
                    {acao.responsavel} ({acao.prazo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal Recomendações */}
      <Modal
        isOpen={activeModal === "recommendations-modal"}
        onClose={() => setActiveModal(null)}
      >
        <div className="flex items-center gap-2 mb-4">
          <svg
            className="w-7 h-7 text-yellow-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3.5 5.5V17a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1v-2.5C6.5 13.5 5 11.5 5 9a7 7 0 0 1 7-7z" />
          </svg>
          <h3 className="text-lg font-semibold text-yellow-300">
            Recomendações para {metrics[lowestAttribute].atributo}
          </h3>
        </div>
        <ul className="list-disc list-inside text-gray-200">
          {suggestionsByAttribute[lowestAttribute].map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </Modal>
    </main>
  );
}