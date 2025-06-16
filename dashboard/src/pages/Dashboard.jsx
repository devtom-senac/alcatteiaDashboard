import React, { useState } from "react";
import { metricasData } from "../data/metricasData";
import MetricCard from "../components/MetricCard";
import EmotionalHealthCard from "../components/EmotionalHealthCard";
import Modal from "../components/Modal";
import RecommendationCard from "../components/RecommendationCard";
import TeamHealthCard from "../components/TeamHealthCard";

<TeamHealthCard
  percent={75}
  tendencia="+5%"
  atributos={["União", "Empenho", "Comunicação", "Foco", "Saúde Emocional"]}
/>;

const clima = [
  { name: "XUXU", percent: 35, icon: "😎" },
  { name: "Bem", percent: 40, icon: "😊" },
  { name: "Só o pó da rabiola", percent: 15, icon: "😅" },
  { name: "Estressado", percent: 10, icon: "😡" },
];

const resumo = "A maioria está bem, mas há sinais de cansaço.";
const tendencia = "+5%";

// Função para gerar o resumo emocional
function getResumoEmocional(emotions) {
  const maisFrequente = emotions.reduce((a, b) =>
    a.percent > b.percent ? a : b
  );
  if (maisFrequente.name === "Feliz" && maisFrequente.percent > 40) {
    return "A equipe está em ótimo clima! Continue assim.";
  }
  if (maisFrequente.name === "Estressado" && maisFrequente.percent > 20) {
    return "Atenção: muitos membros estão estressados. Que tal uma pausa ou dinâmica?";
  }
  if (maisFrequente.name === "Cansado" && maisFrequente.percent > 20) {
    return "Alguns membros estão cansados. Incentive o descanso e o autocuidado.";
  }
  if (maisFrequente.name === "Neutro" && maisFrequente.percent > 40) {
    return "O clima está estável, mas pode melhorar com pequenas ações.";
  }
  return "O clima emocional está variado. Fique atento aos sinais da equipe!";
}

const metricCards = [
  {
    id: "uniao",
    title: "União",
    ...metricasData.uniao,
    trend: "+5%",
    trendColor: "bg-blue-500 text-white font-bold",
    barColor: "bg-blue-500",
  },
  {
    id: "empenho",
    title: "Empenho",
    ...metricasData.empenho,
    trend: "+12%",
    trendColor: "bg-pink-500 text-white font-bold",
    barColor: "bg-pink-500",
  },
  {
    id: "comunicacao",
    title: "Comunicação",
    ...metricasData.comunicacao,
    trend: "-8%",
    trendColor: "bg-orange-500 text-white font-bold",
    barColor: "bg-orange-500",
  },
  {
    id: "foco",
    title: "Foco",
    ...metricasData.foco,
    trend: "-3%",
    trendColor: "bg-yellow-500 text-white font-bold",
    barColor: "bg-yellow-500",
  },
];

//Lista de algumas sugestões de melhoria para o lider
const atributos = ["uniao", "comunicacao", "empenho", "foco", "saudeEmocional"];
const sugestoesPorAtributo = {
  uniao: [
    "Promover dinâmicas de integração",
    "Realizar reuniões de feedback coletivo",
    "Organizar eventos informais entre a equipe",
  ],
  comunicacao: [
    "Implementar reuniões diárias rápidas",
    "Criar canais de comunicação específicos",
    "Fazer rodadas de feedback aberto",
  ],
  empenho: [
    "Reconhecer conquistas individuais e coletivas",
    "Definir metas claras e alcançáveis",
    "Promover desafios motivacionais",
  ],
  foco: [
    "Estabelecer horários sem interrupções",
    "Priorizar tarefas em conjunto",
    "Reduzir reuniões desnecessárias",
  ],
  saudeEmocional: [
    "Fazer check-ins de humor semanais",
    "Promover pausas para relaxamento",
    "Estimular conversas sobre bem-estar",
  ],
};

// Verificar qual atributo está com nivel baixo para recomendações de melhoria, eitá glória
const menorAtributo = atributos.reduce(
  (menor, atual) =>
    metricasData[atual] &&
    metricasData[atual].percent < metricasData[menor].percent
      ? atual
      : menor,
  atributos[0]
);

export default function Dashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center p-6">
      <div
        className="w-full max-w-6xl mx-auto h-full flex flex-col"
        style={{ height: "calc(100vh - 150px)" }}
      >
        {/* Linha 1: Saúde Geral e Recomendações */}
        <div className="flex flex-col md:flex-row gap-6 mb-4">
          <TeamHealthCard
            percent={75}
            tendencia="+5%"
            atributos={[
              "União",
              "Empenho",
              "Comunicação",
              "Foco",
              "Saúde Emocional",
            ]}
          />
          <RecommendationCard
            atributo={metricasData[menorAtributo].atributo}
            sugestoes={sugestoesPorAtributo[menorAtributo]}
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
                  setModalData(metricasData.uniao);
                  setActiveModal("uniao");
                }}
              />
              <MetricCard
                card={metricCards.find((c) => c.id === "empenho")}
                onClick={() => {
                  setModalData(metricasData.empenho);
                  setActiveModal("empenho");
                }}
              />
            </div>
            <div className="flex flex-col gap-4 flex-1">
              <MetricCard
                card={metricCards.find((c) => c.id === "foco")}
                onClick={() => {
                  setModalData(metricasData.foco);
                  setActiveModal("foco");
                }}
              />
              <MetricCard
                card={metricCards.find((c) => c.id === "comunicacao")}
                onClick={() => {
                  setModalData(metricasData.comunicacao);
                  setActiveModal("comunicacao");
                }}
              />
            </div>
          </div>
          {/* Emocional ao lado das métricas */}
          <div className="flex-1 flex items-stretch">
            <EmotionalHealthCard
              clima={clima}
              resumo={resumo}
              tendencia={tendencia}
              onClick={() => setActiveModal("emotional-details")}
            />
          </div>
        </div>
      </div>

      {/* Modal União */}
      <Modal
        isOpen={["uniao", "empenho", "comunicacao", "foco"].includes(
          activeModal
        )}
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
                {modalData.pontosFortes.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <span className="block font-semibold mb-1">Pontos Fracos:</span>
              <ul className="list-disc list-inside">
                {modalData.pontosFracos.map((item, idx) => (
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
                {modalData.planoAcao.map((acao, idx) => (
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
            Recomendações para {metricasData[menorAtributo].atributo}
          </h3>
        </div>
        <ul className="list-disc list-inside text-gray-200">
          {sugestoesPorAtributo[menorAtributo].map((s, idx) => (
            <li key={idx}>{s}</li>
          ))}
        </ul>
      </Modal>
    </main>
  );
}
