// src/locales/translations.js

/**
 * Objeto de traduções para diferentes idiomas.
 * As chaves representam os identificadores das strings, e os valores são as traduções para cada idioma.
 */
export const translations = {
  pt: {
    // --- Traducao do Dashboard de RH ---
    dashboardTitleHR: "Visão RH Estratégico",
    dashboardSubtitleHR: "Bem-estar e Performance da Alcatéia",
    lastUpdate: "Última Atualização",
    teamHealth: "Saúde Geral da Equipe",
    teamEngagement: "Engajamento da Equipe",
    individualVision: "Visão Individual dos Colaboradores",
    noCollaborators: "Nenhum colaborador cadastrado ainda.",
    noCollaboratorsDescription: "Os dados individuais aparecerão aqui assim que forem inseridos.",
    viewDetails: "Ver Detalhes",
    memberDetails: "Detalhes de",
    collaboratorDetails: "Detalhes do Colaborador",
    role: "Cargo",
    email: "Email",
    foco: "Foco", // Chave utilizada no HR Dashboard
    empenho: "Empenho", // Chave utilizada no HR Dashboard
    emotionalHealth: "Saúde Emocional", // Chave generica para "Saúde Emocional"
    insights: "Insights",
    copy: "Copiar",
    copied: "Copiado!",
    copyFailed: "Falha ao copiar",
    lastCheckIn: "Último Check-in",
    excellent: "Excelente",
    good: "Bom",
    attention: "Atenção",
    critical: "Crítico",
    noChange: "Sem alteração",
    increaseOf: "Aumento de",
    decreaseOf: "Queda de",
    percentagePoints: "pontos percentuais", // Chave para "pontos percentuais" (usada se o formato "Xpp" for exibido)
    noTrendData: "Sem dados de tendência",
    noData: "Sem dados",
    trend: "Tendência", // Chave para a palavra "Tendência"

    // --- Traducao do Dashboard do Líder ---
    leaderDashboardTitle: "Dashboard do Líder",
    leaderDashboardSubtitle: "Visão de Desempenho e Bem-estar da Equipe",
    updateButton: "Atualizar Dashboard",
    updatingButton: "Atualizando...",
    teamNamePrefix: "Equipe",
    detailedView: "Visão Detalhada",
    understandDashboard: "Entendendo seu Dashboard",
    overviewTitle: "Visão Geral",
    overviewDescription: "Este painel é uma ferramenta estratégica para insights sobre desempenho e bem-estar da equipe.",
    sloganTitle: "O sucesso de um é o sucesso de todos!",
    sloganDescription: "Acreditamos na Alcatéia que o sucesso da equipe depende de cada pessoa, por isso mantenha toda sua equipe saudável.",
    uniaoAttr: "União",
    comunicacaoAttr: "Comunicação",
    focoAttr: "Foco", // Chave para o atributo "Foco" no Leader Dashboard
    empenhoAttr: "Empenho", // Chave para o atributo "Empenho" no Leader Dashboard
    saudeEquipeAttr: "Saúde da Equipe",
    saudeEmocionalAttr: "Saúde Emocional", // Chave para o título do cartão de Saúde Emocional no Leader Dashboard
    recommendationsFor: "Recomendações para",
    recommendations: "Recomendações",
    loadingRecommendations: "Carregando recomendações...",

    // Chaves adicionais para componentes de cartão e outras partes do Leader Dashboard
    emotionalHealthDetails: "Ver detalhes da Saúde Emocional",
    loadingData: "Carregando dados...",
    generalStatus: "Status Geral",
    suggestionsForImprovement: "Sugestões para melhorar",
    viewMore: "Ver mais",

    // Status emocionais detalhados e suas descrições/ações para o Leader Dashboard (Modal ou Detalhes)
    goodEmotionalStatus: "Bom",
    goodEmotionalDescription: "A equipe demonstra alto bem-estar emocional, resiliência e otimismo. Um ambiente saudável para a produtividade e a inovação.",
    goodEmotionalActions: [
      "Incentivar o reconhecimento mútuo e celebração de pequenas vitórias.",
      "Oferecer oportunidades de desenvolvimento pessoal e profissional contínuo.",
      "Manter canais abertos para feedback e escuta ativa sobre bem-estar.",
    ],
    mediumEmotionalStatus: "Médio",
    mediumEmotionalDescription: "O bem-estar emocional da equipe está estável, mas há pontos que merecem atenção para evitar estresse futuro. É um bom momento para intervenções preventivas.",
    mediumEmotionalActions: [
      "Promover workshops de gerenciamento de estresse e bem-estar.",
      "Realizar check-ins individuais regulares para identificar necessidades e preocupações.",
      "Fomentar atividades de relaxamento e desconexão durante o expediente.",
    ],
    badEmotionalStatus: "Ruim",
    badEmotionalDescription: "A equipe está passando por um período de estresse ou insatisfação significativa, o que pode impactar a produtividade e a saúde mental. Ações urgentes são necessárias.",
    badEmotionalActions: [
      "Conduzir reuniões individuais focadas no bem-estar e nas preocupações mais urgentes.",
      "Implementar flexibilidade de horários ou redução de carga temporária para alívio imediato.",
      "Buscar apoio de profissionais de saúde mental para a equipe.",
      "Revisar processos e remover gargalos que geram pressão excessiva e constante.",
    ],
    notEvaluatedEmotionalStatus: "Não Avaliado",
    notEvaluatedEmotionalDescription: "Não há dados suficientes para avaliar a saúde emocional da equipe. É fundamental coletar feedback para obter uma visão clara.",
    notEvaluatedEmotionalActions: [
      "Garantir que a pesquisa de bem-estar emocional seja respondida por todos da equipe.",
      "Comunicar a importância do feedback para o suporte e desenvolvimento do bem-estar da equipe.",
    ],

    // Descrições dos atributos para a seção "Entendendo seu Dashboard" do Líder
    unionDescription: "Mede a coesão e o espírito de equipe, indicando a capacidade de colaborar.",
    empenhoDescription: "Reflete a dedicação e produtividade nas tarefas, essencial para o alcance de metas.",
    communicationDescription: "Avalia a clareza e eficácia da troca de informações, fundamental para alinhamento.",
    focusDescription: "Indica a capacidade de concentração em objetivos, impactando a eficiência do trabalho.",
    emotionalHealthDescription: "Reflete o bem-estar mental do time, base para resiliência e criatividade.",
    teamHealthDescription: "Equilíbrio geral da equipe, ligado a União, Empenho, Comunicação e Foco.",

    // Nomes do clima detalhado (devem corresponder aos 'name's em detailedClimateData no LeaderDashboard.jsx)
    "Ótimo": "Ótimo",
    "Bem": "Bem",
    "Cansado": "Cansado",
    "Estressado": "Estressado",
  },
  en: {
    // --- HR Dashboard Translations ---
    dashboardTitleHR: "Strategic HR Overview",
    dashboardSubtitleHR: "Team Well-being and Performance",
    lastUpdate: "Last Update",
    teamHealth: "Overall Team Health",
    teamEngagement: "Team Engagement",
    individualVision: "Individual Employee View",
    noCollaborators: "No collaborators registered yet.",
    noCollaboratorsDescription: "Individual data will appear here once entered.",
    viewDetails: "View Details",
    memberDetails: "Details of",
    collaboratorDetails: "Collaborator Details",
    role: "Role",
    email: "Email",
    foco: "Focus", // Used in HR Dashboard
    empenho: "Commitment", // Used in HR Dashboard
    emotionalHealth: "Emotional Health",
    insights: "Insights",
    copy: "Copy",
    copied: "Copied!",
    copyFailed: "Failed to copy",
    lastCheckIn: "Last Check-in",
    excellent: "Excellent",
    good: "Good",
    attention: "Attention",
    critical: "Critical",
    noChange: "No change",
    increaseOf: "Increase of",
    decreaseOf: "Decrease of",
    percentagePoints: "percentage points",
    noTrendData: "No trend data",
    noData: "No data",
    trend: "Trend",

    // --- Leader Dashboard Translations ---
    leaderDashboardTitle: "Leader Dashboard",
    leaderDashboardSubtitle: "Team Performance and Well-being Overview",
    updateButton: "Update Dashboard",
    updatingButton: "Updating...",
    teamNamePrefix: "Team",
    detailedView: "Detailed View",
    understandDashboard: "Understanding Your Dashboard",
    overviewTitle: "Overview",
    overviewDescription: "This dashboard is a strategic tool for insights into team performance and well-being.",
    sloganTitle: "Everyone's success is everyone's success!",
    sloganDescription: "We believe at Alcatéia that team success depends on each person, so keep your entire team healthy.",
    uniaoAttr: "Unity",
    comunicacaoAttr: "Communication",
    focoAttr: "Focus", // Attribute for Leader Dashboard
    empenhoAttr: "Commitment", // Attribute for Leader Dashboard
    saudeEquipeAttr: "Team Health",
    saudeEmocionalAttr: "Emotional Health", // Title for Emotional Health card in Leader Dashboard
    recommendationsFor: "Recommendations for",
    recommendations: "Recommendations",
    loadingRecommendations: "Loading recommendations...",

    // Additional keys for card components and other parts of the Leader Dashboard
    emotionalHealthDetails: "View Emotional Health Details",
    loadingData: "Loading data...",
    generalStatus: "Overall Status",
    suggestionsForImprovement: "Suggestions for improving",
    viewMore: "View more",

    // Detailed emotional statuses and their descriptions/actions for the Leader Dashboard
    goodEmotionalStatus: "Good",
    goodEmotionalDescription: "The team shows high emotional well-being, resilience, and optimism. A healthy environment for productivity and innovation.",
    goodEmotionalActions: [
      "Encourage mutual recognition and celebration of small victories.",
      "Offer continuous personal and professional development opportunities.",
      "Maintain open channels for feedback and active listening about well-being.",
    ],
    mediumEmotionalStatus: "Medium",
    mediumEmotionalDescription: "The team's emotional well-being is stable, but there are points that deserve attention to avoid future stress. It's a good time for preventive interventions.",
    mediumEmotionalActions: [
      "Promote stress management and well-being workshops.",
      "Conduct regular individual check-ins to identify needs and concerns.",
      "Foster relaxation and disconnection activities during work hours.",
    ],
    badEmotionalStatus: "Bad",
    badEmotionalDescription: "The team is experiencing a period of significant stress or dissatisfaction, which can impact productivity and mental health. Urgent actions are needed.",
    badEmotionalActions: [
      "Conduct individual meetings focused on well-being and most urgent concerns.",
      "Implement flexible hours or temporary workload reduction for immediate relief.",
      "Seek support from mental health professionals for the team.",
      "Review processes and remove bottlenecks that generate excessive and constant pressure.",
    ],
    notEvaluatedEmotionalStatus: "Not Evaluated",
    notEvaluatedEmotionalDescription: "There is insufficient data to evaluate the team's emotional health. It is essential to collect feedback to gain a clear view.",
    notEvaluatedEmotionalActions: [
      "Ensure that the emotional well-being survey is answered by everyone on the team.",
      "Communicate the importance of feedback for supporting and developing team well-being.",
    ],

    // Descriptions of attributes for the "Understanding Your Dashboard" section of the Leader
    unionDescription: "Measures cohesion and team spirit, indicating the ability to collaborate.",
    empenhoDescription: "Reflects dedication and productivity in tasks, essential for achieving goals.",
    communicationDescription: "Evaluates clarity and effectiveness of information exchange, crucial for alignment.",
    focusDescription: "Indicates the ability to concentrate on objectives, impacting work efficiency.",
    emotionalHealthDescription: "Reflects the team's mental well-being, a base for resilience and creativity.",
    teamHealthDescription: "Overall team balance, linked to Unity, Commitment, Communication, and Focus.",

    // Detailed climate names (must match 'name's in detailedClimateData in LeaderDashboard.jsx)
    "Ótimo": "Great",
    "Bem": "Good",
    "Cansado": "Tired",
    "Estressado": "Stressed",
  },
  es: {
    // --- Traducao do Dashboard de RH ---
    dashboardTitleHR: "Visión Estratégica de RRHH",
    dashboardSubtitleHR: "Bienestar y Rendimiento del Equipo",
    lastUpdate: "Última Actualización",
    teamHealth: "Salud General del Equipo",
    teamEngagement: "Compromiso del Equipo",
    individualVision: "Vista Individual de Colaboradores",
    noCollaborators: "Aún no hay colaboradores registrados.",
    noCollaboratorsDescription: "Los datos individuales aparecerán aquí una vez ingresados.",
    viewDetails: "Ver Detalles",
    memberDetails: "Detalles de",
    collaboratorDetails: "Detalles del Colaborador",
    role: "Rol",
    email: "Correo Electrónico",
    foco: "Enfoque", // Utilizado en HR Dashboard
    empenho: "Compromiso", // Utilizado en HR Dashboard
    emotionalHealth: "Salud Emocional",
    insights: "Percepciones",
    copy: "Copiar",
    copied: "¡Copiado!",
    copyFailed: "Error al copiar",
    lastCheckIn: "Último Check-in",
    excellent: "Excelente",
    good: "Bueno",
    attention: "Atención",
    critical: "Crítico",
    noChange: "Sin cambios",
    increaseOf: "Aumento de",
    decreaseOf: "Disminución de",
    percentagePoints: "puntos porcentuales",
    noTrendData: "Sin datos de tendencia",
    noData: "Sin datos",
    trend: "Tendencia",

    // --- Traducao do Dashboard del Líder ---
    leaderDashboardTitle: "Panel del Líder",
    leaderDashboardSubtitle: "Vista de Rendimiento y Bienestar del Equipo",
    updateButton: "Actualizar Panel",
    updatingButton: "Actualizando...",
    teamNamePrefix: "Equipo",
    detailedView: "Vista Detallada",
    understandDashboard: "Entendiendo tu Panel",
    overviewTitle: "Resumen",
    overviewDescription: "Este panel es una herramienta estratégica para obtener información sobre el rendimiento y el bienestar del equipo.",
    sloganTitle: "¡El éxito de uno es el éxito de todos!",
    sloganDescription: "Creemos en Alcatéia que el éxito del equipo depende de cada persona, por eso mantén a todo tu equipo saludable.",
    uniaoAttr: "Unión",
    comunicacaoAttr: "Comunicación",
    focoAttr: "Enfoque", // Atributo para el Leader Dashboard
    empenhoAttr: "Compromiso", // Atributo para el Leader Dashboard
    saudeEquipeAttr: "Salud del Equipo",
    saudeEmocionalAttr: "Salud Emocional", // Título para el card de Salud Emocional en Leader Dashboard
    recommendationsFor: "Recomendaciones para",
    recommendations: "Recomendaciones",
    loadingRecommendations: "Cargando recomendaciones...",

    // Chaves adicionales para componentes de tarjeta y otras partes del Leader Dashboard
    emotionalHealthDetails: "Ver detalles de Salud Emocional",
    loadingData: "Cargando datos...",
    generalStatus: "Estado General",
    suggestionsForImprovement: "Sugerencias para mejorar",
    viewMore: "Ver más",

    // Detailed emotional statuses and their descriptions/actions for the Leader Dashboard
    goodEmotionalStatus: "Bueno",
    goodEmotionalDescription: "El equipo muestra un alto bienestar emocional, resiliencia y optimismo. Un entorno saludable para la productividad y la innovación.",
    goodEmotionalActions: [
      "Fomentar el reconocimiento mutuo y la celebración de pequeñas victorias.",
      "Ofrecer oportunidades de desarrollo personal y profesional continuo.",
      "Mantener canales abiertos para la retroalimentación y la escucha activa sobre el bienestar.",
    ],
    mediumEmotionalStatus: "Medio",
    mediumEmotionalDescription: "El bienestar emocional del equipo es estable, pero hay puntos que merecen atención para evitar el estrés futuro. Es un buen momento para intervenciones preventivas.",
    mediumEmotionalActions: [
      "Promover talleres de manejo del estrés y el bienestar.",
      "Realizar controles individuales regulares para identificar necesidades y preocupaciones.",
      "Fomentar actividades de relajación y desconexión durante el horario laboral.",
    ],
    badEmotionalStatus: "Malo",
    badEmotionalDescription: "El equipo está experimentando un período de estrés o insatisfacción significativa, lo que puede afectar la productividad y la salud mental. Se necesitan acciones urgentes.",
    badEmotionalActions: [
      "Realizar reuniones individuales centradas en el bienestar y las preocupaciones más urgentes.",
      "Implementar flexibilidad de horarios o reducción temporal de la carga para un alivio inmediato.",
      "Buscar apoyo de profesionales de la salud mental para el equipo.",
      "Revisar procesos y eliminar cuellos de botella que generen presión excesiva y constante.",
    ],
    notEvaluatedEmotionalStatus: "No Evaluado",
    notEvaluatedEmotionalDescription: "No hay datos suficientes para evaluar la salud emocional del equipo. Es esencial recopilar comentarios para obtener una vista clara.",
    notEvaluatedEmotionalActions: [
      "Asegurar que la encuesta de bienestar emocional sea respondida por todos en el equipo.",
      "Comunicar la importancia de la retroalimentación para apoyar y desarrollar el bienestar del equipo.",
    ],

    // Descripciones de atributos para la sección "Understanding Your Dashboard" del Líder
    unionDescription: "Mide la cohesión y el espíritu de equipo, indicando la capacidad de colaborar.",
    empenhoDescription: "Refleja la dedicación y productividad en las tareas, esencial para el logro de metas.",
    communicationDescription: "Evalúa la claridad y eficacia del intercambio de información, fundamental para la alineación.",
    focusDescription: "Indica la capacidad de concentración en objetivos, impactando la eficiencia del trabajo.",
    emotionalHealthDescription: "Refleja el bienestar mental del equipo, base para la resiliencia y creatividad.",
    teamHealthDescription: "Equilibrio general del equipo, ligado a Unión, Compromiso, Comunicación y Enfoque.",

    // Nombres del clima detallado (deben corresponder a los 'name's en detailedClimateData en LeaderDashboard.jsx)
    "Ótimo": "Excelente",
    "Bem": "Bien",
    "Cansado": "Cansado",
    "Estressado": "Estresado",
  },
};