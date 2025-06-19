// src/pages/Dashboard/HrDashboard.jsx

import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  FiHeart, FiUsers, FiArrowUpRight, FiArrowDownRight, FiMinus,
  FiUser, FiTarget, FiZap, FiMail, FiInfo, FiCopy
} from "react-icons/fi"; 

// Importar o componente Modal e LanguageSwitcher
import Modal from "../../components/Modal"; 
import LanguageSwitcher from "../../components/LanguageSwitcher"; 

// Importar as traduções
import { translations } from "../../locales/translations"; 

const initialTeamMetrics = {
  saudeGeral: {
    percent: null, 
    tendencia: null
  },
  engajamento: {
    percent: null, 
    tendencia: null
  },
};

const initialIndividualMembers = [
  {
    id: 'm1',
    name: 'Talita Mendes',
    role: 'Líder de Equipe',
    foco: 70,
    empenho: 75,
    saudeEmocional: 60,
    lastCheckIn: "2025-06-17T10:00:00",
    insights: {
      foco: 'Consegue manter o foco na maioria das tarefas, mas pode se dispersar com interrupções.',
      empenho: 'Esforça-se para atingir metas, buscando sempre a melhoria contínua.',
      saudeEmocional: 'Demonstra boa adaptabilidade, mas pode sentir a pressão em momentos de pico.',
    },
    email: 'talita.mendes@proa.com'
  },
  {
    id: 'm2',
    name: 'Gabriel Alves',
    role: 'Desenvolvedor Pleno',
    foco: 85,
    empenho: 90,
    saudeEmocional: 80,
    lastCheckIn: "2025-06-18T14:30:00",
    insights: {
      foco: 'Excelente concentração em suas atividades de desenvolvimento.',
      empenho: 'Altamente motivado e entrega resultados consistentes e de alta qualidade.',
      saudeEmocional: 'Apresenta um ótimo bem-estar emocional, resiliente a desafios.',
    },
    email: 'gabriel.alves@proa.com'
  },
];


// --- FUNÇÕES UTILITÁRIAS (Adaptadas para usar traduções) ---

// Função global para obter o texto traduzido
const useTranslation = (lang) => {
  return useCallback((key) => {
    // Verifique se o idioma existe e a chave existe dentro do idioma
    return translations[lang] && translations[lang][key] !== undefined
           ? translations[lang][key]
           : key; // Retorna a chave se a tradução não for encontrada
  }, [lang]);
};

const formatDateTime = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const options = {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  };
  // Mantém PT-BR para a formatação da data/hora, independente do idioma do conteúdo
  return new Intl.DateTimeFormat('pt-BR', options).format(date); 
};

// Determina a cor e o ícone da tendência (FiArrowUpRight, FiArrowDownRight, FiMinus)
const getTrendDisplay = (tendencia, t) => {
  let icon = <FiMinus className="w-5 h-5" />;
  let color = "text-gray-400";
  let text = t("noChange"); // Usando a tradução

  if (tendencia === null) {
      return { icon: <FiMinus className="w-5 h-5" />, color: "text-gray-500", text: t("noTrendData") };
  }

  if (tendencia && tendencia.startsWith("+")) {
    icon = <FiArrowUpRight className="w-5 h-5" />;
    color = "text-green-400";
    text = `${t("increaseOf")} ${tendencia.substring(1)}`; // Usando a tradução
  } else if (tendencia && tendencia.startsWith("-")) {
    icon = <FiArrowDownRight className="w-5 h-5" />;
    color = "text-red-400";
    text = `${t("decreaseOf")} ${tendencia.substring(1)}`; // Usando a tradução
  } else if (tendencia === "0%") {
    icon = <FiMinus className="w-5 h-5" />;
    color = "text-gray-400";
    text = t("noChange"); // Usando a tradução
  }
  return { icon, color, text };
};

// Determina o status textual e a cor para porcentagens (geral e individual)
const getStatusColorAndText = (percent, t) => {
  if (percent === null) return { status: t("noData"), color: "text-gray-400" };
  if (percent >= 80) return { status: t("excellent"), color: "text-green-400" };
  if (percent >= 60) return { status: t("good"), color: "text-yellow-400" };
  if (percent >= 40) return { status: t("attention"), color: "text-orange-400" };
  return { status: t("critical"), color: "text-red-400" };
};


// --- COMPONENTES REUTILIZÁVEIS (Adaptados para usar traduções) ---

const BaseCard = ({ children, className = "", onClick }) => (
  <div
    className={`bg-[#1a1a2e] rounded-xl p-6 shadow-lg border border-gray-700 flex flex-col ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

const GeneralMetricCard = ({ title, percent, trend, icon: IconComponent, t }) => {
  const { icon: trendIcon, color: trendColor, text: trendText } = getTrendDisplay(trend, t);
  const { color: percentColor } = getStatusColorAndText(percent, t);

  return (
    <BaseCard className="items-center justify-center min-h-[180px]">
      <div className="flex items-center gap-3 mb-4">
        {IconComponent && <IconComponent className="w-9 h-9 text-purple-400" />}
        <h3 className="font-semibold text-white text-2xl">{title}</h3>
      </div>
      <div className="flex items-center gap-2 mb-2">
        <div className={`text-6xl font-bold ${percentColor} leading-none`}>
          {percent !== null ? `${percent}%` : t("noData")}
        </div>
      </div>
      <div className={`flex items-center text-base font-bold ${trendColor}`}>
        {trendIcon}
        <span className="ml-1">{percent !== null ? trendText : t("noData")}</span>
      </div>
    </BaseCard>
  );
};


const MemberSummaryCard = ({ member, onOpenDetails, t }) => {
  const { color: focoColor } = getStatusColorAndText(member.foco, t);
  const { color: empenhoColor } = getStatusColorAndText(member.empenho, t);
  const { color: saudeColor } = getStatusColorAndText(member.saudeEmocional, t);

  return (
    <BaseCard className="w-full flex flex-col justify-between overflow-hidden">
      <div className="flex items-center gap-4 mb-4">
        <FiUser className="w-12 h-12 text-indigo-400 p-2 bg-indigo-900/30 rounded-full flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white truncate">{member.name}</h3>
          <p className="text-gray-400 text-sm truncate">{member.role}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg"><FiTarget className="text-yellow-400" /> {t("foco")}:</span>
          <span className={`${focoColor} font-bold text-lg`}>{member.foco}%</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg"><FiZap className="text-pink-400" /> {t("empenho")}:</span>
          <span className={`${empenhoColor} font-bold text-lg`}>{member.empenho}%</span>
        </div>
        <div className="flex items-center justify-between text-gray-300">
          <span className="flex items-center gap-2 text-lg"><FiHeart className="text-teal-400" /> {t("emotionalHealth")}:</span>
          <span className={`${saudeColor} font-bold text-lg`}>{member.saudeEmocional}%</span>
        </div>
      </div>

      <button
        className="w-full bg-blue-700 hover:bg-blue-600 text-white font-medium px-4 py-3 rounded-md flex items-center justify-center gap-2 transition shadow mt-auto"
        onClick={() => onOpenDetails(member)}
      >
        <FiInfo className="w-5 h-5" /> {t("viewDetails")}
      </button>
    </BaseCard>
  );
};


// --- COMPONENTE PRINCIPAL: HR DASHBOARD ---
export default function HrDashboard() {
  // Estado para o idioma, lendo do localStorage ao iniciar
  const [lang, setLang] = useState(() => localStorage.getItem('appLang') || 'pt');
  
  // Função de tradução memoizada
  const t = useTranslation(lang);

  const [teamMetrics, setTeamMetrics] = useState(initialTeamMetrics);
  const [individualMembers, setIndividualMembers] = useState(initialIndividualMembers);
  const [lastUpdateDateTime, setLastUpdateDateTime] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  // Efeito para salvar o idioma no localStorage sempre que ele mudar
  useEffect(() => {
    localStorage.setItem('appLang', lang);
  }, [lang]);

  // Função para mudar o idioma
  const handleLanguageChange = (newLang) => {
    setLang(newLang);
  };

  // --- Lógica para CALCULAR métricas gerais baseadas nos membros individuais ---
  useEffect(() => {
    if (individualMembers.length > 0) {
      const totalFoco = individualMembers.reduce((sum, member) => sum + member.foco, 0);
      const totalEmpenho = individualMembers.reduce((sum, member) => sum + member.empenho, 0);
      const totalSaudeEmocional = individualMembers.reduce((sum, member) => sum + member.saudeEmocional, 0);

      const avgFoco = Math.round(totalFoco / individualMembers.length);
      const avgEmpenho = Math.round(totalEmpenho / individualMembers.length);
      const avgSaudeEmocional = Math.round(totalSaudeEmocional / individualMembers.length);

      const newEngagement = Math.round((avgFoco + avgEmpenho) / 2);
      const newSaudeGeral = avgSaudeEmocional;

      setTeamMetrics(prev => ({
        saudeGeral: {
          percent: newSaudeGeral,
          tendencia: prev.saudeGeral.percent === null ? null : (newSaudeGeral > prev.saudeGeral.percent ? `+${newSaudeGeral - prev.saudeGeral.percent}%` : (newSaudeGeral < prev.saudeGeral.percent ? `-${prev.saudeGeral.percent - newSaudeGeral}%` : "0%"))
        },
        engajamento: {
          percent: newEngagement,
          tendencia: prev.engajamento.percent === null ? null : (newEngagement > prev.engajamento.percent ? `+${newEngagement - prev.engajamento.percent}%` : (newEngagement < prev.engajamento.percent ? `-${prev.engajamento.percent - newEngagement}%` : "0%"))
        },
      }));

    } else {
      // Se não houver membros, redefina as métricas para seus estados iniciais nulos
      setTeamMetrics(initialTeamMetrics); 
    }
  }, [individualMembers]); // Dependência em individualMembers

  const handleOpenMemberDetails = (member) => {
    setSelectedMember(member);
    setCopyStatus('');
  };

  const handleCloseMemberDetails = () => {
    setSelectedMember(null);
  };

  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyStatus(t('copied')); // Usando tradução
      setTimeout(() => setCopyStatus(''), 2000);
    } catch (err) {
      setCopyStatus(t('copyFailed')); // Usando tradução
      console.error('Erro ao copiar email:', err);
    }
  };

  return (
    <main className="flex-1 bg-[#0B0011] text-gray-200 font-poppins flex justify-center p-6 overflow-y-auto custom-scrollbar">
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 h-full">

        {/* Cabeçalho do Dashboard */}
        <div className="flex justify-between items-end pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              {t("dashboardTitle")} <span className="text-pink-400">RH Estratégico</span>
            </h1>
            <p className="text-gray-400 text-lg mt-1">
              {t("dashboardSubtitle")}
            </p>
          </div>
          <div className="text-right flex flex-col items-end">
            {/* Adicione o seletor de idioma aqui */}
            <LanguageSwitcher currentLang={lang} onLanguageChange={handleLanguageChange} />
            <p className="text-gray-500 text-sm mt-2">{t("lastUpdate")}: {formatDateTime(lastUpdateDateTime)}</p>
          </div>
        </div>

        {/* Seção de Métricas Gerais da Equipe */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GeneralMetricCard
            title={t("teamHealth")}
            percent={teamMetrics.saudeGeral.percent}
            trend={teamMetrics.saudeGeral.tendencia}
            icon={FiHeart}
            t={t} // Passa a função de tradução
          />
          <GeneralMetricCard
            title={t("teamEngagement")}
            percent={teamMetrics.engajamento.percent}
            trend={teamMetrics.engajamento.tendencia}
            icon={FiUsers}
            t={t} // Passa a função de tradução
          />
        </div>

        {/* Seção de Métricas Individuais dos Membros (com cards de sumário) */}
        <div className="mt-8">
          <div className="flex items-center gap-4 mb-6">
            <FiUser className="w-9 h-9 text-indigo-400" />
            <h2 className="text-3xl font-bold text-indigo-300">{t("individualVision")}</h2>
          </div>
          {individualMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {individualMembers.map(member => (
                <MemberSummaryCard
                  key={member.id}
                  member={member}
                  onOpenDetails={handleOpenMemberDetails}
                  t={t} // Passa a função de tradução
                />
              ))}
            </div>
          ) : (
            <div className="bg-[#1a1a2e] p-8 rounded-xl text-center text-gray-400 text-lg">
              <p className="mb-4">{t("noCollaborators")}</p>
              <p>{t("noCollaboratorsDescription")}</p>
            </div>
          )}
        </div>

        {/* --- MODAL DE DETALHES DO MEMBRO --- */}
        <Modal
          isOpen={!!selectedMember}
          onClose={handleCloseMemberDetails}
          title={
            selectedMember ?
              <span className="text-white">{t("memberDetails")} {selectedMember.name}</span>
              : <span className="text-white">{t("collaboratorDetails")}</span>
          }
          footerContent={
            selectedMember && selectedMember.lastCheckIn ? (
              <p className="text-gray-500 text-sm mt-4 border-t border-gray-700 pt-3">
                {t("lastCheckIn")}: {formatDateTime(selectedMember.lastCheckIn)}
              </p>
            ) : null
          }
          size="md"
        >
          {selectedMember && (
            <div className="space-y-4 text-gray-300">
              {/* Informações básicas do membro */}
              <div className="flex items-center justify-between">
                <p className="text-lg"><span className="font-semibold text-white">{t("role")}:</span> {selectedMember.role}</p>
              </div>

              {/* Email com botão de copiar */}
              <div className="flex items-center justify-between gap-2 bg-gray-800/50 p-3 rounded-md border border-gray-700">
                <span className="font-semibold text-white text-lg mr-2 flex-shrink-0">{t("email")}:</span>
                <span className="text-gray-300 text-md truncate flex-grow">{selectedMember.email}</span>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-3 py-1 rounded-md flex items-center gap-1 transition shadow-sm text-sm whitespace-nowrap"
                  onClick={() => handleCopyEmail(selectedMember.email)}
                  title={t("copy")}
                >
                  <FiCopy className="w-4 h-4" /> {copyStatus || t("copy")}
                </button>
              </div>

              {/* Métricas detalhadas no modal - layout mais denso */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2"><FiTarget className="text-yellow-400" /> {t("foco")}: <span className={`${getStatusColorAndText(selectedMember.foco, t).color} text-base`}>{selectedMember.foco}%</span></h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedMember.insights.foco}</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2"><FiZap className="text-pink-400" /> {t("empenho")}: <span className={`${getStatusColorAndText(selectedMember.empenho, t).color} text-base`}>{selectedMember.empenho}%</span></h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedMember.insights.empenho}</p>
                </div>
                <div className="p-3 bg-gray-800/50 rounded-md border border-gray-700">
                  <h4 className="font-semibold text-lg text-gray-200 mb-2 flex items-center gap-2"><FiHeart className="text-teal-400" /> {t("emotionalHealth")}: <span className={`${getStatusColorAndText(selectedMember.saudeEmocional, t).color} text-base`}>{selectedMember.saudeEmocional}%</span></h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{selectedMember.insights.saudeEmocional}</p>
                </div>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </main>
  );
}