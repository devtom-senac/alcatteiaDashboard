import React, { useState, useEffect, useRef, useCallback } from "react";

import MetricCard from "../../components/MetricCard";
import TeamHealthCard from "../../components/TeamHealthCard";
import EmotionalHealthCard from "../../components/EmotionalHealthCard";
import RecommendationCard from "../../components/RecommendationCard";
import Modal from "../../components/Modal";
import LanguageSwitcher from "../../components/LanguageSwitcher";

import {
  FiInfo,
  FiUsers,
  FiZap,
  FiMessageSquare,
  FiTarget,
  FiHeart,
  FiSmile,
  FiMeh,
  FiFrown,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

import { translations } from "../../locales/translations";

// Hook personalizado para lidar com a tradução.
const useTranslation = (lang) => {
  return useCallback(
    (key) => {
      return translations[lang] && translations[lang][key] !== undefined
        ? translations[lang][key]
        : key;
    },
    [lang]
  );
};

const initialMetrics = {
  uniao: {
    percent: null,
    atributo: "uniaoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  empenho: {
    percent: null,
    atributo: "empenhoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  comunicacao: {
    percent: null,
    atributo: "comunicacaoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  foco: {
    percent: null,
    atributo: "focoAttr",
    pontosFortes: [],
    pontosFracos: [],
    causasRaiz: "",
    planoAcao: [],
  },
  saudeEmocional: { percent: null, atributo: "saudeEmocionalAttr" },
};

const detailedClimateData = [
  { name: "Ótimo", percent: 0 },
  { name: "Bem", percent: 0 },
  { name: "Cansado", percent: 0 },
  { name: "Estressado", percent: 0 },
];

const suggestionsByAttribute = {
  uniao: [
    "Promover dinâmicas de integração e team-building para fortalecer laços.",
    "Realizar reuniões de feedback coletivo para alinhamento constante e celebração de conquistas.",
    "Organizar eventos informais entre a equipe para promover um ambiente descontraído.",
  ],
  comunicacao: [
    "Implementar reuniões diárias rápidas (daily stand-ups) para alinhamento constante.",
    "Criar canais de comunicação específicos para diferentes tópicos, garantindo clareza.",
    "Fazer rodadas de feedback aberto e construtivo para melhorar a troca de informações.",
  ],
  empenho: [
    "Reconhecer conquistas individuais e coletivas de forma pública e significativa.",
    "Definir metas claras, desafiadoras e alcançáveis, com acompanhamento regular.",
    "Promover desafios motivacionais e gamificação para impulsionar o engajamento.",
  ],
  foco: [
    "Estabelecer horários sem interrupções para atividades que exigem alta concentração.",
    "Priorizar tarefas em conjunto e revisar a lista de prioridades diariamente.",
    "Reduzir reuniões desnecessárias e otimizar as existentes para serem mais objetivas.",
  ],
  saudeEmocional: [
    "Fazer check-ins de humor semanais rápidos para identificar tendências e necessidades.",
    "Promover pausas para relaxamento e atividades de mindfulness durante o dia de trabalho.",
    "Estimular conversas abertas sobre bem-estar e oferecer recursos de apoio psicológico.",
  ],
};

const formatDateTime = (date) => {
  if (!date) return "";
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };
  return new Intl.DateTimeFormat("pt-BR", options).format(date);
};

export default function LeaderDashboard() {
  const [lang, setLang] = useState(
    () => localStorage.getItem("appLang") || "pt"
  );
  const t = useTranslation(lang);

  const getEmotionalHealthGuidelines = useCallback(
    (currentLang) => ({
      bom: {
        status: translations[currentLang].goodEmotionalStatus,
        color: "text-gray-300",
        icon: FiSmile,
        description: translations[currentLang].goodEmotionalDescription,
        actions: translations[currentLang].goodEmotionalActions,
      },
      medio: {
        status: translations[currentLang].mediumEmotionalStatus,
        color: "text-gray-300",
        icon: FiMeh,
        description: translations[currentLang].mediumEmotionalDescription,
        actions: translations[currentLang].mediumEmotionalActions,
      },
      ruim: {
        status: translations[currentLang].badEmotionalStatus,
        color: "text-gray-300",
        icon: FiFrown,
        description: translations[currentLang].badEmotionalDescription,
        actions: translations[currentLang].badEmotionalActions,
      },
      neutro: {
        status: translations[currentLang].notEvaluatedEmotionalStatus,
        color: "text-gray-300",
        icon: FiBarChart2,
        description: translations[currentLang].notEvaluatedEmotionalDescription,
        actions: translations[currentLang].notEvaluatedEmotionalActions,
      },
    }),
    []
  );

  const getEmotionalHealthStatus = useCallback(
    (detailedClimate, currentLang) => {
      const emotionalHealthGuidelines =
        getEmotionalHealthGuidelines(currentLang);

      if (!detailedClimate || detailedClimate.length === 0) {
        return emotionalHealthGuidelines.neutro;
      }

      const cansadoPercent =
        detailedClimate.find((e) => e.name === "Cansado")?.percent || 0;
      const estressadoPercent =
        detailedClimate.find((e) => e.name === "Estressado")?.percent || 0;
      const otimoPercent =
        detailedClimate.find((e) => e.name === "Ótimo")?.percent || 0;
      const bemPercent =
        detailedClimate.find((e) => e.name === "Bem")?.percent || 0;

      const negativoTotal = cansadoPercent + estressadoPercent;
      const positivoTotal = otimoPercent + bemPercent;

      if (negativoTotal >= 50) {
        return emotionalHealthGuidelines.ruim;
      } else if (negativoTotal >= 25 && negativoTotal < 50) {
        return emotionalHealthGuidelines.medio;
      } else if (positivoTotal >= 70) {
        return emotionalHealthGuidelines.bom;
      } else if (positivoTotal >= 50 && negativoTotal < 25) {
        return emotionalHealthGuidelines.medio;
      }

      return emotionalHealthGuidelines.medio;
    },
    [getEmotionalHealthGuidelines]
  );

  const calculateLowestAttribute = (metrics) => {
    const attributesToCheck = ["uniao", "comunicacao", "empenho", "foco"];
    let lowest = null;
    let lowestPercent = Infinity;

    const availableMetrics = attributesToCheck.filter(
      (attr) => metrics[attr] && metrics[attr].percent !== null
    );

    if (availableMetrics.length === 0) {
      return null;
    }

    availableMetrics.forEach((attr) => {
      const metric = metrics[attr];
      if (metric.percent < lowestPercent) {
        lowestPercent = metric.percent;
        lowest = attr;
      }
    });

    if (lowestPercent === 0 && availableMetrics.length > 0) {
      return availableMetrics[0];
    }

    return lowest;
  };

  const calculateAverageTeamHealth = (metrics) => {
    const attributesForTeamHealth = ["uniao", "comunicacao", "empenho", "foco"];
    const validMetrics = attributesForTeamHealth.filter(
      (m) => metrics[m].percent !== null
    );
    const totalHealthPercent = validMetrics.reduce(
      (sum, m) => sum + metrics[m].percent,
      0
    );
    const averageHealth =
      validMetrics.length > 0
        ? (totalHealthPercent / validMetrics.length).toFixed(0)
        : null;
    return averageHealth;
  };

  const calculateTrend = useCallback((currentValue, previousValue) => {
    if (
      currentValue === null ||
      previousValue === null ||
      previousValue === undefined
    ) {
      return "---";
    }

    const diff = currentValue - previousValue;

    if (diff > 0) {
      return `+${diff.toFixed(0)}pp`;
    } else if (diff < 0) {
      return `${diff.toFixed(0)}pp`;
    } else {
      return "---";
    }
  }, []); // Dependência vazia, pois não depende de nenhum estado ou prop.

  const [metrics, setMetrics] = useState(initialMetrics);
  const [climate, setClimate] = useState(detailedClimateData);
  const [activeModal, setActiveModal] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(null);
  const [updateTrigger, setUpdateTrigger] = useState(0); // Estado para controlar a simulação de dados
  const [isLoading, setIsLoading] = useState(false);

  const previousMetricsRef = useRef(initialMetrics);
  const previousClimateRef = useRef(detailedClimateData);

  const [teamName] = useState("Alcatteia");

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  // Esta função simula a chamada à sua API (mockada)
  const fetchDataFromApi = async (currentTriggerValue) => {
    // Aceita o valor do trigger
    setIsLoading(true); // Move o isLoading para DENTRO da função de busca
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula delay de rede

    let newMetricsData;
    let newClimateData;

    // A lógica de simulação de dados baseada no trigger
    if (currentTriggerValue % 3 === 0) {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 50 },
        empenho: { ...initialMetrics.empenho, percent: 65 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 70 },
        foco: { ...initialMetrics.foco, percent: 40 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 40 },
        { name: "Bem", percent: 30 },
        { name: "Cansado", percent: 20 },
        { name: "Estressado", percent: 10 },
      ];
    } else if (currentTriggerValue % 3 === 1) {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 75 },
        empenho: { ...initialMetrics.empenho, percent: 50 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 70 },
        foco: { ...initialMetrics.foco, percent: 45 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 50 },
        { name: "Bem", percent: 35 },
        { name: "Cansado", percent: 10 },
        { name: "Estressado", percent: 5 },
      ];
    } else {
      newMetricsData = {
        uniao: { ...initialMetrics.uniao, percent: 70 },
        empenho: { ...initialMetrics.empenho, percent: 55 },
        comunicacao: { ...initialMetrics.comunicacao, percent: 68 },
        foco: { ...initialMetrics.foco, percent: 20 },
        saudeEmocional: { ...initialMetrics.saudeEmocional, percent: null },
      };
      newClimateData = [
        { name: "Ótimo", percent: 35 },
        { name: "Bem", percent: 40 },
        { name: "Cansado", percent: 15 },
        { name: "Estressado", percent: 10 },
      ];
    }

    // Calcular saúde emocional baseada nos novos dados
    const totalCurrentPositiveClimatePercent =
      (newClimateData.find((item) => item.name === "Ótimo")?.percent || 0) +
      (newClimateData.find((item) => item.name === "Bem")?.percent || 0);
    const newSaudeEmocionalPercent =
      totalCurrentPositiveClimatePercent > 0
        ? totalCurrentPositiveClimatePercent
        : null;

    // Salvar o estado ANTERIOR antes de atualizar
    previousMetricsRef.current = metrics;
    previousClimateRef.current = climate;

    setMetrics((prev) => ({
      ...newMetricsData,
      saudeEmocional: {
        ...prev.saudeEmocional,
        percent: newSaudeEmocionalPercent,
        previousPercent:
          (previousClimateRef.current.find((item) => item.name === "Ótimo")
            ?.percent || 0) +
          (previousClimateRef.current.find((item) => item.name === "Bem")
            ?.percent || 0), // Define previousPercent aqui
      },
    }));
    setClimate(newClimateData);
    setLastUpdateDateTime(new Date());
    setIsLoading(false); // Move o isLoading para DENTRO da função de busca
  };

  // useEffect para a busca inicial na montagem do componente
  // Ele executa fetchDataFromApi APENAS UMA VEZ ao carregar a página
  useEffect(() => {
    fetchDataFromApi(updateTrigger); // Chama com o updateTrigger inicial (0)
  }, []); // Array de dependências vazio, roda apenas uma vez

  // Função para lidar com o clique do botão de atualização
  const handleUpdateDashboard = () => {
    setUpdateTrigger((prev) => {
      const newTriggerValue = prev + 1;
      fetchDataFromApi(newTriggerValue); // Dispara a busca com o NOVO valor do trigger
      return newTriggerValue; // Retorna o novo valor para o estado
    });
  };

  const currentEmotionalStatus = getEmotionalHealthStatus(climate, lang);
  const lowestAttributeKey = calculateLowestAttribute(metrics);
  const lowestAttributeTranslatedName = lowestAttributeKey
    ? t(metrics[lowestAttributeKey].atributo)
    : t("loadingRecommendations");

  const averageHealth = calculateAverageTeamHealth(metrics);
  const previousAverageHealth = calculateAverageTeamHealth(
    previousMetricsRef.current
  );
  const teamHealthTrend = calculateTrend(
    parseFloat(averageHealth),
    parseFloat(previousAverageHealth)
  );

  const metricCards = [
    {
      id: "uniao",
      title: t("uniaoAttr"),
      icon: FiUsers,
      percent: metrics.uniao.percent,
      trend: calculateTrend(
        metrics.uniao.percent,
        previousMetricsRef.current.uniao.percent
      ),
      barColor: "bg-blue-500",
      borderColor: "border-blue-500",
    },
    {
      id: "empenho",
      title: t("empenhoAttr"),
      icon: FiZap,
      percent: metrics.empenho.percent,
      trend: calculateTrend(
        metrics.empenho.percent,
        previousMetricsRef.current.empenho.percent
      ),
      barColor: "bg-pink-500",
      borderColor: "border-pink-500",
    },
    {
      id: "comunicacao",
      title: t("comunicacaoAttr"),
      icon: FiMessageSquare,
      percent: metrics.comunicacao.percent,
      trend: calculateTrend(
        metrics.comunicacao.percent,
        previousMetricsRef.current.comunicacao.percent
      ),
      barColor: "bg-orange-500",
      borderColor: "border-orange-500",
    },
    {
      id: "foco",
      title: t("focoAttr"),
      icon: FiTarget,
      percent: metrics.foco.percent,
      trend: calculateTrend(
        metrics.foco.percent,
        previousMetricsRef.current.foco.percent
      ),
      barColor: "bg-yellow-500",
      borderColor: "border-yellow-500",
    },
  ];

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center p-6 overflow-y-auto">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-4 h-full">
        <div className="pt-2 pb-4 border-b border-gray-700 mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {t("leaderDashboardTitle")}
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("leaderDashboardSubtitle")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={handleUpdateDashboard}
              className={`w-full sm:w-auto bg-purple-800 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200 shadow-md ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FiRefreshCw className="w-5 h-5" />
              )}
              {isLoading ? t("updatingButton") : t("updateButton")}
            </button>

            <LanguageSwitcher
              currentLang={lang}
              onLanguageChange={handleLanguageChange}
              className="w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="text-right -mt-6 mb-4">
          <p className="text-xl font-bold text-white">
            {t("teamNamePrefix")}: {teamName}
          </p>
          <p className="text-gray-500 text-sm">{t("detailedView")}</p>
          {lastUpdateDateTime && (
            <p className="text-gray-500 text-xs mt-1">
              {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <TeamHealthCard
              percent={averageHealth}
              tendencia={teamHealthTrend}
              className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
              t={t}
            />

            <RecommendationCard
              atributo={lowestAttributeTranslatedName}
              sugestoes={
                lowestAttributeKey
                  ? suggestionsByAttribute[lowestAttributeKey]
                  : [t("loadingRecommendations")]
              }
              onVerMais={() => {
                if (
                  lowestAttributeKey &&
                  metrics[lowestAttributeKey].percent !== null
                ) {
                  setModalData(metrics[lowestAttributeKey]);
                  setActiveModal("recommendations-modal");
                }
              }}
              className="w-full md:w-[calc(60%-8px)] md:flex-shrink-0"
              t={t}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 flex-1 items-stretch">
            <EmotionalHealthCard
              percent={metrics.saudeEmocional.percent}
              status={currentEmotionalStatus.status}
              statusColor={currentEmotionalStatus.color}
              statusIcon={currentEmotionalStatus.icon}
              detailedClimate={climate}
              className="w-full md:w-[calc(40%-8px)] md:flex-shrink-0"
              t={t}
              title={t("saudeEmocionalAttr")}
            />

            <div className="flex flex-col gap-4 w-full md:w-[calc(60%-8px)] md:flex-shrink-0">
              <div className="grid grid-cols-2 gap-4 h-full">
                {metricCards.map((card) => (
                  <MetricCard
                    key={card.id}
                    card={card}
                    icon={card.icon}
                    className="w-full h-full"
                    t={t}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO ENTENDA SEU DASHBOARD */}
        <h2 className="text-3xl md:text-3xl font-extrabold text-white tracking-tight text-center mt-6 mb-4">
          <FiInfo className="inline-block w-8 h-8 mr-3 text-white align-middle" />
          {t("understandDashboard")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
            <div className="flex-auto">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("overviewTitle")}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {t("overviewDescription")}
              </p>
            </div>
          </div>

          <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col md:col-span-1">
            <div className="flex-auto">
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("sloganTitle")}
              </h3>
              <p className="text-white text-sm leading-relaxed">
                {t("sloganDescription")}
              </p>
            </div>
          </div>

          {/* Descrições detalhadas dos atributos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:col-span-2">
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiUsers className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-blue-400">
                    {t("uniaoAttr")}
                  </p>
                  <p className="text-sm text-white">{t("unionDescription")}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiZap className="w-8 h-8 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-pink-400">
                    {t("empenhoAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("empenhoDescription")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiMessageSquare className="w-8 h-8 text-orange-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-orange-400">
                    {t("comunicacaoAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("communicationDescription")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiTarget className="w-8 h-8 text-yellow-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-yellow-400">
                    {t("focoAttr")}
                  </p>
                  <p className="text-sm text-white">{t("focusDescription")}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiBarChart2 className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-purple-400">
                    {t("saudeEmocionalAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("emotionalHealthDescription")}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#1e293b] p-5 rounded-lg shadow-lg border border-gray-700 flex flex-col">
              <div className="flex items-start gap-3 mb-2 flex-auto">
                <FiHeart className="w-8 h-8 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-green-400">
                    {t("saudeEquipeAttr")}
                  </p>
                  <p className="text-sm text-white">
                    {t("teamHealthDescription")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={activeModal === "recommendations-modal"}
          onClose={() => setActiveModal(null)}
          title={
            lowestAttributeKey &&
            metrics[lowestAttributeKey] &&
            metrics[lowestAttributeKey].percent !== null ? (
              <span className="text-white">
                {t("recommendationsFor")}{" "}
                {t(metrics[lowestAttributeKey].atributo)}
              </span>
            ) : (
              <span className="text-white">{t("recommendations")}</span>
            )
          }
          footerContent={
            lastUpdateDateTime &&
            lowestAttributeKey &&
            metrics[lowestAttributeKey].percent !== null ? (
              <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                {t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}
              </p>
            ) : null
          }
        >
          {lowestAttributeKey &&
          metrics[lowestAttributeKey] &&
          metrics[lowestAttributeKey].percent !== null ? (
            <ul className="list-disc list-inside text-gray-200">
              {suggestionsByAttribute[lowestAttributeKey].map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400 text-center py-4">
              {t("loadingRecommendations")}
            </p>
          )}
        </Modal>
      </div>
    </main>
  );
}
