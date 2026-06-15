// SailSafe — survey definition (single source of truth).
// Edit copy, options, order, or branching here; the UI is fully config-driven.
//
// Field types: 'single' | 'multi' | 'likert' (1–5) | 'scale' (0–10) | 'open'
//   `name`       snake_case column it maps to in the "Respostas" tab of the Sheet
//   `isOther`    on an option → reveals a free-text input ("Outro / especificar")
//   `exclusive`  on an option → clears the others when picked (multi only)
//   `followUp`   rendered inline UNDER its parent question (never a separate step),
//                shown only when `showIf(answers)` is true (or when there is no showIf)
//
// This array is also your codebook: option `value`s are exactly what gets stored.
// Order matters — it drives the on-screen sequence and the "Pergunta X de N" label.

export const questions = [
  // ── Seção 1 — Perfil ──────────────────────────────────────────────────
  {
    id: 'q1',
    name: 'relacao_barco',
    section: 'Perfil',
    type: 'single',
    required: true,
    title: 'Qual é a sua relação com o barco que você usa com mais frequência?',
    options: [
      { value: 'proprietario', label: 'Sou proprietário(a)' },
      { value: 'coproprietario', label: 'Sou coproprietário(a)' },
      {
        value: 'operacao_manutencao',
        label: 'Sou responsável pela operação/manutenção (skipper, marinheiro, gestor)',
      },
      { value: 'instrutor', label: 'Sou instrutor(a) de escola de vela' },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q2',
    name: 'tipo_embarcacao',
    section: 'Perfil',
    type: 'single',
    required: true,
    title: 'Que tipo de embarcação você usa com mais frequência?',
    options: [
      { value: 'lancha', label: 'Lancha / motorboat' },
      { value: 'veleiro_cruzeiro', label: 'Veleiro de cruzeiro' },
      { value: 'veleiro_regata', label: 'Veleiro de regata' },
      { value: 'catamara', label: 'Catamarã' },
      { value: 'pesca_esportiva', label: 'Barco de pesca esportiva' },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q3',
    name: 'regiao_uso',
    section: 'Perfil',
    type: 'single',
    required: true,
    title: 'Em qual região você mais usa o seu barco?',
    options: [
      {
        value: 'litoral_norte_sp',
        label: 'Litoral Norte de SP (Ubatuba, Ilhabela, São Sebastião)',
      },
      { value: 'costa_verde_rj', label: 'Costa Verde RJ (Angra, Paraty)' },
      {
        value: 'santa_catarina',
        label: 'Santa Catarina (Florianópolis, Balneário Camboriú)',
      },
      { value: 'outro_litoral', label: 'Outro litoral do Brasil' },
      { value: 'represas', label: 'Represas / água doce' },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q4',
    name: 'frequencia_uso',
    section: 'Perfil',
    type: 'single',
    required: true,
    title: 'Com que frequência você sai com esse barco?',
    options: [
      { value: 'menos_1_mes', label: 'Menos de 1 vez por mês' },
      { value: '1_2_mes', label: '1–2 vezes por mês' },
      { value: '3_4_mes', label: '3–4 vezes por mês' },
      { value: 'toda_semana', label: 'Toda semana ou quase' },
      { value: 'quase_diario', label: 'Quase todo dia / uso comercial' },
    ],
  },

  // ── Seção 2 — Como cuida da manutenção hoje ──────────────────────────
  {
    id: 'q5',
    name: 'responsavel_manutencao',
    section: 'Como cuida da manutenção hoje',
    type: 'single',
    required: true,
    title: 'Quem cuida principalmente da manutenção do barco?',
    options: [
      { value: 'eu_mesmo', label: 'Eu mesmo(a), faço a maior parte' },
      {
        value: 'eu_organizo',
        label: 'Eu organizo, mas quem faz é um(a) mecânico(a)/marinheiro de confiança',
      },
      { value: 'marina', label: 'A própria marina / estaleiro' },
      { value: 'charter', label: 'Empresa de charter / gestão de frota' },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q6',
    name: 'acompanhamento_manutencao',
    section: 'Como cuida da manutenção hoje',
    type: 'multi',
    required: true,
    title: 'Hoje, como você acompanha o que já foi feito e o que ainda falta na manutenção?',
    help: 'Pode marcar mais de uma.',
    options: [
      { value: 'papel', label: 'Caderno ou ficha em papel a bordo' },
      { value: 'planilha', label: 'Planilha (Excel, Google Sheets)' },
      { value: 'notas_celular', label: 'Notas no celular' },
      { value: 'whatsapp', label: 'WhatsApp com mecânico/marina' },
      { value: 'agenda', label: 'Agenda/calendário no celular' },
      { value: 'app_especifico', label: 'Aplicativo específico de barco/manutenção' },
      { value: 'memoria', label: 'Não registro, vou na memória', exclusive: true },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q7',
    name: 'dificuldades_manutencao',
    section: 'Como cuida da manutenção hoje',
    type: 'multi',
    required: true,
    title: 'O que é mais difícil ou chato na manutenção do barco?',
    help: 'Pode marcar mais de uma.',
    options: [
      { value: 'lembrar_o_que', label: 'Lembrar o que precisa ser feito em cada época' },
      {
        value: 'lembrar_ultima_vez',
        label: 'Lembrar quando foi a última vez que fiz cada coisa',
      },
      {
        value: 'entender_fabricante',
        label: 'Entender as recomendações do fabricante (horas de motor etc.)',
      },
      { value: 'tempo', label: 'Ter tempo para organizar tudo' },
      { value: 'mao_de_obra', label: 'Encontrar mão de obra de confiança' },
      { value: 'custos', label: 'Acompanhar custos e orçamentos' },
      { value: 'saber_em_dia', label: 'Saber se "o barco está em dia" ou não' },
      { value: 'outro', label: 'Outra (especificar)', isOther: true },
    ],
  },
  {
    id: 'q_spend',
    name: 'gastos_manutencao',
    section: 'Como cuida da manutenção hoje',
    type: 'single',
    required: true,
    title: 'Quanto você estima gastar por ano com manutenção e reparos (peças e mão de obra)?',
    help: 'Pensando só em manutenção e reparos, fora taxas de marina e seguro. Sem julgamento, é só pra entender a realidade.',
    options: [
      { value: 'ate_3k', label: 'Até R$ 3.000' },
      { value: '3k_8k', label: 'R$ 3.000 a R$ 8.000' },
      { value: '8k_20k', label: 'R$ 8.000 a R$ 20.000' },
      { value: '20k_50k', label: 'R$ 20.000 a R$ 50.000' },
      { value: 'acima_50k', label: 'Acima de R$ 50.000' },
      { value: 'nao_sei_estimar', label: 'Não sei estimar' },
      { value: 'prefiro_nao_responder', label: 'Prefiro não responder' },
    ],
  },
  {
    id: 'q_behavior',
    name: 'comportamento_duvida',
    section: 'Como cuida da manutenção hoje',
    type: 'multi',
    required: true,
    title:
      'Na vida real, quando você fica na dúvida se algo precisa de manutenção, o que costuma acontecer?',
    help: 'Pode marcar mais de uma. Não existe resposta certa, só queremos entender a real.',
    options: [
      { value: 'pergunto_profissional', label: 'Pergunto para o mecânico ou pessoa de confiança' },
      { value: 'youtube_foruns', label: 'Pesquiso no YouTube ou em fóruns' },
      {
        value: 'grupos_mensageiro',
        label: 'Pergunto em grupos de WhatsApp ou Facebook de velejadores',
      },
      { value: 'manual_fabricante', label: 'Consulto o manual do fabricante' },
      { value: 'espero_dar_problema', label: 'Espero dar problema para entender o que era' },
      { value: 'nao_sei_da_duvida', label: 'Geralmente nem sei que essa dúvida existe' },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },
  {
    id: 'q8',
    name: 'teve_problema',
    section: 'Como cuida da manutenção hoje',
    type: 'single',
    required: true,
    title:
      'Você já teve uma situação em que um problema de manutenção estragou um passeio ou te deixou na mão?',
    options: [
      { value: 'sim', label: 'Sim' },
      { value: 'nao', label: 'Não' },
    ],
    followUp: {
      name: 'problema_relato',
      type: 'open',
      title: 'Conta rapidamente o que aconteceu.',
      placeholder: 'O que rolou?',
      showIf: (a) => a.teve_problema === 'sim',
    },
  },

  // ── Seção 3 — Ritual antes de sair ───────────────────────────────────
  {
    id: 'q9',
    name: 'faz_checklist',
    section: 'Ritual antes de sair',
    type: 'single',
    required: true,
    title: 'Antes de zarpar, você faz algum tipo de checklist ou verificação?',
    options: [
      {
        value: 'checklist_fixo',
        label: 'Sim, tenho um checklist mais ou menos fixo (mental ou anotado)',
      },
      { value: 'as_vezes', label: 'Às vezes dou uma checada geral, sem ser estruturado' },
      { value: 'quase_nunca', label: 'Quase nunca faço uma verificação formal' },
    ],
    followUp: {
      name: 'checklist_itens',
      type: 'open',
      title: 'O que você costuma verificar antes de zarpar?',
      placeholder: 'Ex.: combustível, motor, coletes, previsão do tempo...',
      showIf: (a) => a.faz_checklist === 'checklist_fixo' || a.faz_checklist === 'as_vezes',
    },
  },

  // ── Seção 4 — Estado do barco e apps ─────────────────────────────────
  {
    id: 'q10',
    name: 'estado_manutencao',
    section: 'Confiança e apps',
    type: 'single',
    required: true,
    title: 'Se o barco fosse um paciente, em qual sala de espera ele estaria?',
    help: 'Sem julgamento, a gente só quer entender a real.',
    // Options are in order from healthiest to most critical (encode as 1–5 in analysis).
    options: [
      { value: 'checkup_em_dia', label: 'Check-up anual em dia. Tudo sob controle.' },
      { value: 'exames_atrasados', label: 'Alguns exames atrasados, mas nada grave (acho).' },
      { value: 'precisa_cuidados', label: 'Precisa de cuidados, mas está funcionando.' },
      {
        value: 'apagando_incendios',
        label: 'Vivo apagando incêndio. Manutenção é o que quebrou hoje.',
      },
      { value: 'sem_ideia', label: 'Sinceramente, não faço ideia de como ele está.' },
    ],
  },
  {
    id: 'q11',
    name: 'apps_usados',
    section: 'Confiança e apps',
    type: 'multi',
    required: true,
    title: 'Quais apps ligados ao barco já fazem parte da sua rotina?',
    help: 'Pode marcar mais de uma.',
    options: [
      { value: 'navegacao', label: 'Navegação/cartas (Navionics, Savvy Navvy etc.)' },
      { value: 'navseg', label: 'NAVSEG / app da Marinha' },
      { value: 'monitoramento', label: 'Monitoramento do barco (Navisafe, Navalcare, outro)' },
      { value: 'tempo_mar', label: 'Previsão do tempo/mar (Windy, Windguru etc.)' },
      {
        value: 'manutencao_app',
        label: 'App específico de manutenção (YachtWave, TheBoatApp etc.)',
      },
      { value: 'nenhum', label: 'Nenhum desses', exclusive: true },
      { value: 'outro', label: 'Outro (especificar)', isOther: true },
    ],
  },

  // ── Seção 5 — Reação ao conceito SailSafe (após a tela de conceito) ──
  {
    id: 'q12',
    name: 'reacao_conceito',
    section: 'Reação ao conceito SailSafe',
    type: 'single',
    required: true,
    title: 'De primeira, o que você acha dessa ideia?',
    options: [
      { value: 'muito_interessante', label: 'Muito interessante, eu provavelmente usaria' },
      { value: 'parece_legal', label: 'Parece legal, mas teria que ver na prática' },
      { value: 'indiferente', label: 'Indiferente, não muda muito pra mim' },
      { value: 'nao_faz_sentido', label: 'Não faz sentido pra mim' },
    ],
    followUp: {
      name: 'reacao_motivo',
      type: 'open',
      title: 'Por quê?',
      placeholder: 'O que mais pesou na sua resposta?',
    },
  },
  {
    id: 'q13',
    name: 'hesitacoes',
    section: 'Reação ao conceito SailSafe',
    type: 'multi',
    required: true,
    title: 'O que te deixaria com um pé atrás para usar um app desses?',
    help: 'Pode marcar mais de uma.',
    options: [
      { value: 'burocratico', label: 'Ser mais uma tarefa burocrática pra alimentar' },
      { value: 'depender_falhar', label: 'Medo de depender do app e ele falhar' },
      { value: 'nao_confiar_alertas', label: 'Não confiar nos alertas/recomendações' },
      { value: 'privacidade', label: 'Privacidade dos dados' },
      { value: 'preco_alto', label: 'Preço alto' },
      { value: 'interface_complicada', label: 'Interface complicada' },
      { value: 'prefiro_atual', label: 'Prefiro continuar do jeito que já faço' },
      { value: 'outro', label: 'Outra (especificar)', isOther: true },
    ],
  },

  // ── Seção 6 — Preço e intenção ───────────────────────────────────────
  {
    id: 'q14',
    name: 'modelo_preco',
    section: 'Preço e intenção',
    type: 'single',
    required: true,
    title: 'Qual modelo de preço faz mais sentido pra você?',
    options: [
      { value: 'freemium', label: 'Versão básica gratuita + versão premium paga' },
      { value: 'assinatura_mensal', label: 'Assinatura mensal baixa (até R$ 25/mês)' },
      { value: 'assinatura_anual', label: 'Assinatura anual com desconto' },
      { value: 'incluido_pacote', label: 'Incluído no pacote da marina / escola / seguro' },
      { value: 'pagamento_unico', label: 'Pagamento único, sem assinatura' },
      { value: 'so_gratuito', label: 'Só usaria se fosse gratuito' },
    ],
  },
  {
    id: 'q15',
    name: 'intencao_uso',
    section: 'Preço e intenção',
    type: 'scale',
    required: true,
    // Now measures willingness-to-PAY only (trial intent is captured by the beta question at the end).
    title: 'Se esse app existisse hoje, bem feito e em português, qual a chance de você pagar por ele?',
    minLabel: '0 · Não pagaria',
    maxLabel: '10 · Com certeza',
  },
]

export const TOTAL_QUESTIONS = questions.length
