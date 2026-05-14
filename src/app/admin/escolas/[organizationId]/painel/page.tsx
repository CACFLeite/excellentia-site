"use client";

import { use, useEffect, useState } from "react";
import SensitiveEvidenceVaultPanel from "@/components/admin/SensitiveEvidenceVaultPanel";

type EmergencyRolesMap = {
  preventionResponsible?: string | null;
  preventionSubstitute?: string | null;
  preventionEvidence?: string | null;
  preventionGaps?: string | null;
  alertResponsible?: string | null;
  alertSubstitute?: string | null;
  alertEvidence?: string | null;
  alertGaps?: string | null;
  evacuationResponsible?: string | null;
  evacuationSubstitute?: string | null;
  evacuationEvidence?: string | null;
  evacuationGaps?: string | null;
  communicationResponsible?: string | null;
  communicationSubstitute?: string | null;
  communicationEvidence?: string | null;
  communicationGaps?: string | null;
};

type FireRiskWalkthrough = {
  areasVisited?: string | null;
  findingsLog?: string | null;
  simpleCorrectionsPlan?: string | null;
  technicalReferrals?: string | null;
  suspendedAreas?: string | null;
  photoEvidenceNotes?: string | null;
  reviewResponsible?: string | null;
};

const fireRiskWalkthroughFields = [
  [
    "areasVisited",
    "Áreas observadas",
    "Ex.: entrada/portaria, rota de circulação, cozinha/cantina, laboratório, depósito",
  ],
  [
    "findingsLog",
    "Achados da caminhada observacional",
    "Registre pelo menos cinco achados com local, descrição e categoria: corrigir agora, encaminhar tecnicamente ou suspender/avaliar",
  ],
  [
    "simpleCorrectionsPlan",
    "Correções simples com prazo e responsável",
    "O que pode ser corrigido pela rotina da escola, por quem e até quando",
  ],
  [
    "technicalReferrals",
    "Encaminhamentos técnicos",
    "Itens que exigem fornecedor, manutenção especializada, responsável habilitado ou autoridade competente",
  ],
  [
    "suspendedAreas",
    "Ambientes/atividades suspensos ou sob avaliação",
    "Registre se algum uso ficou suspenso até avaliação competente",
  ],
  [
    "photoEvidenceNotes",
    "Evidências fotográficas/documentais",
    "Indique se houve registro fotográfico interno e onde está guardado, sem expor pessoas/dados indevidamente",
  ],
  [
    "reviewResponsible",
    "Responsável pela revisão",
    "Nome/cargo de quem acompanhará prazos e atualização do registro",
  ],
] as const;

type FireRiskWalkthroughField = (typeof fireRiskWalkthroughFields)[number][0];

type EvidenceDocumentKey =
  | "incendio-aula-01"
  | "incendio-aula-02"
  | "incendio-aula-03";

type CourseEvidenceDocument = {
  id: string;
  courseSlug: string;
  lessonOrder: number;
  documentKey: string;
  title: string;
  status: string;
  content: Record<string, unknown>;
  updatedAt: string;
};

const documentInventoryFields = [
  [
    "documentsFound",
    "Documentos/evidências encontrados",
    "Ex.: AVCB/CLCB, planta/croqui, manutenção de extintores, iluminação, sinalização, treinamentos, atas e simulados",
  ],
  [
    "storageLocation",
    "Onde estão guardados",
    "Informe pasta física/digital, setor responsável e regra de acesso interno",
  ],
  [
    "validityReview",
    "Validade ou próxima revisão",
    "Registre datas conhecidas, pendências de renovação e quem acompanha prazos",
  ],
  [
    "gapsAndReferrals",
    "Lacunas e encaminhamentos",
    "O que falta localizar, atualizar, contratar, revisar ou encaminhar a responsável habilitado",
  ],
  [
    "responsibleNotes",
    "Responsável interno e observações",
    "Nome/cargo da pessoa que acompanhará a atualização deste inventário",
  ],
] as const;

type DocumentInventoryField = (typeof documentInventoryFields)[number][0];

const emptyDocumentInventory = documentInventoryFields.reduce(
  (accumulator, [field]) => {
    accumulator[field] = "";
    return accumulator;
  },
  {} as Record<DocumentInventoryField, string>,
);

function buildDocumentInventoryForm(document?: CourseEvidenceDocument | null) {
  const form = { ...emptyDocumentInventory };
  const content = document?.content ?? {};

  documentInventoryFields.forEach(([field]) => {
    const value = content[field];
    form[field] = typeof value === "string" ? value : "";
  });

  return form;
}

const emptyFireRiskWalkthrough = fireRiskWalkthroughFields.reduce(
  (accumulator, [field]) => {
    accumulator[field] = "";
    return accumulator;
  },
  {} as Record<FireRiskWalkthroughField, string>,
);

function buildFireRiskWalkthroughForm(map?: FireRiskWalkthrough | null) {
  const form = { ...emptyFireRiskWalkthrough };

  fireRiskWalkthroughFields.forEach(([field]) => {
    const value = map?.[field];
    form[field] = typeof value === "string" ? value : "";
  });

  return form;
}

const roleBlocks = [
  {
    key: "prevention",
    title: "Prevenção",
    description:
      "Quem acompanha inspeções, rotinas preventivas e redução de risco antes da ocorrência.",
  },
  {
    key: "alert",
    title: "Alerta",
    description:
      "Quem aciona o primeiro aviso interno e confirma sinais de emergência.",
  },
  {
    key: "evacuation",
    title: "Abandono",
    description:
      "Quem coordena saída, rotas, ponto de encontro e conferência de pessoas.",
  },
  {
    key: "communication",
    title: "Comunicação",
    description:
      "Quem fala com direção, famílias, bombeiros/serviços externos e registra informações.",
  },
] as const;

type RoleBlockKey = (typeof roleBlocks)[number]["key"];
type RoleFieldSuffix = "Responsible" | "Substitute" | "Evidence" | "Gaps";
type EmergencyRolesMapField = `${RoleBlockKey}${RoleFieldSuffix}`;

const emptyEmergencyRolesMap = roleBlocks.reduce(
  (accumulator, block) => {
    accumulator[`${block.key}Responsible`] = "";
    accumulator[`${block.key}Substitute`] = "";
    accumulator[`${block.key}Evidence`] = "";
    accumulator[`${block.key}Gaps`] = "";
    return accumulator;
  },
  {} as Record<EmergencyRolesMapField, string>,
);

function buildEmergencyRolesMapForm(map?: EmergencyRolesMap | null) {
  const form = { ...emptyEmergencyRolesMap };

  roleBlocks.forEach((block) => {
    (["Responsible", "Substitute", "Evidence", "Gaps"] as const).forEach(
      (suffix) => {
        const field = `${block.key}${suffix}` as EmergencyRolesMapField;
        const value = map?.[field];
        form[field] = typeof value === "string" ? value : "";
      },
    );
  });

  return form;
}

type PanelArea = "dashboard" | "courses" | "evidence" | "vault" | "governance";

const panelAreas: Array<{
  key: PanelArea;
  eyebrow: string;
  title: string;
  description: string;
}> = [
  {
    key: "dashboard",
    eyebrow: "visão geral",
    title: "Resumo executivo",
    description:
      "Indicadores, atalhos e próximos blocos de trabalho sem abrir todos os formulários de uma vez.",
  },
  {
    key: "courses",
    eyebrow: "operação",
    title: "Cursos e colaboradores",
    description:
      "Atribuição por curso, seleção por função/pessoa, convites e acompanhamento individual.",
  },
  {
    key: "evidence",
    eyebrow: "documentos formativos",
    title: "Evidências dos cursos",
    description:
      "Registros pedagógicos não sensíveis, vinculados à aula e ao curso correto.",
  },
  {
    key: "vault",
    eyebrow: "separado",
    title: "Cofre sensível",
    description:
      "Anexos, prints, áudios, vídeos e registros de proteção escolar fora das evidências comuns.",
  },
  {
    key: "governance",
    eyebrow: "gestão",
    title: "Governança e relatórios",
    description:
      "PGR, comunicados recentes e saídas institucionais de acompanhamento.",
  },
];

type Dashboard = {
  organization: {
    id: string;
    name: string;
    slug: string;
    status: string;
    employeeLimit?: number | null;
  };
  summary: {
    employeeCount: number;
    activeCount: number;
    invitedCount: number;
    completedCount: number;
    completionPercent: number;
    totalActivities: number;
    communicationCount: number;
    pgrCount: number;
  };
  employees: Array<{
    id: string;
    fullName: string;
    email?: string | null;
    jobTitle?: string | null;
    unitName?: string | null;
    status: string;
    invitationStatus?: string | null;
    answeredCount: number;
    totalActivities: number;
    progressPercent: number;
    courseStatus: string;
    courseEnrollments: Array<{
      courseSlug: string;
      courseTitle: string;
      status: string;
      completedAt?: string | null;
      certificateCode?: string | null;
    }>;
    certificate?: null | {
      verificationCode: string;
      issuedAt: string;
      status: string;
    };
  }>;
  jobTitles: string[];
  courses: Array<{
    slug: string;
    title: string;
    shortTitle: string;
    status: string;
    availability: string;
    area: string;
    targetAudience: string;
    suggestedProfiles: unknown[];
    enrolledCount: number;
    lessonsCount: number;
    canAssign: boolean;
  }>;
  communications: Array<{
    id: string;
    kind: string;
    category?: string | null;
    message: string;
    status: string;
    createdAt: string;
  }>;
  pgrDocuments: Array<{
    id: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    signedAt?: string | null;
    signedBy?: string | null;
  }>;
  emergencyRolesMap?: EmergencyRolesMap | null;
  fireRiskWalkthrough?: FireRiskWalkthrough | null;
  featureAvailability?: {
    schoolEvidenceMaps?: boolean;
  };
};

export default function PainelEscolaPage({
  params,
}: {
  params: Promise<{ organizationId: string }>;
}) {
  const resolvedParams = use(params);
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [savingRolesMap, setSavingRolesMap] = useState(false);
  const [rolesMapMessage, setRolesMapMessage] = useState<string | null>(null);
  const [rolesMapForm, setRolesMapForm] = useState<
    Record<EmergencyRolesMapField, string>
  >(emptyEmergencyRolesMap);
  const [savingWalkthrough, setSavingWalkthrough] = useState(false);
  const [walkthroughMessage, setWalkthroughMessage] = useState<string | null>(
    null,
  );
  const [walkthroughForm, setWalkthroughForm] = useState<
    Record<FireRiskWalkthroughField, string>
  >(emptyFireRiskWalkthrough);
  const [courseEvidenceDocuments, setCourseEvidenceDocuments] = useState<
    CourseEvidenceDocument[]
  >([]);
  const [savingInventory, setSavingInventory] = useState(false);
  const [inventoryMessage, setInventoryMessage] = useState<string | null>(null);
  const [inventoryForm, setInventoryForm] = useState<
    Record<DocumentInventoryField, string>
  >(emptyDocumentInventory);
  const [activeEvidenceDocument, setActiveEvidenceDocument] =
    useState<EvidenceDocumentKey>("incendio-aula-01");
  const [inviteLinks, setInviteLinks] = useState<Record<string, string>>({});
  const [inviteMessages, setInviteMessages] = useState<Record<string, string>>(
    {},
  );
  const [selectedCourseSlug, setSelectedCourseSlug] = useState("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [assignmentLinks, setAssignmentLinks] = useState<
    Record<string, string>
  >({});
  const [assignmentMessage, setAssignmentMessage] = useState<string | null>(
    null,
  );
  const [assigningCourse, setAssigningCourse] = useState(false);
  const [activeArea, setActiveArea] = useState<PanelArea>("dashboard");

  const rolesMapHasData = Object.values(rolesMapForm).some(
    (value) => value.trim().length > 0,
  );
  const walkthroughHasData = Object.values(walkthroughForm).some(
    (value) => value.trim().length > 0,
  );
  const genericInventoryDocument = courseEvidenceDocuments.find(
    (document) =>
      document.courseSlug === "incendio-escolas" &&
      document.lessonOrder === 3 &&
      document.documentKey === "incendio-inventario-documental-sistemas-v1",
  );
  const schoolEvidenceMapsAvailable =
    dashboard?.featureAvailability?.schoolEvidenceMaps !== false;
  const inventoryHasData =
    Object.values(inventoryForm).some((value) => value.trim().length > 0) ||
    Boolean(genericInventoryDocument);
  const hasDocumentInventory =
    inventoryHasData || Boolean(dashboard?.pgrDocuments.length);
  const assignableCourses =
    dashboard?.courses.filter((course) => course.canAssign) ?? [];
  const selectedCourse =
    dashboard?.courses.find((course) => course.slug === selectedCourseSlug) ??
    assignableCourses[0] ??
    dashboard?.courses[0];
  const selectedEmployees =
    dashboard?.employees.filter((employee) =>
      selectedEmployeeIds.includes(employee.id),
    ) ?? [];
  const employeesAlreadyInSelectedCourse = selectedCourse
    ? new Set(
        dashboard?.employees
          .filter((employee) =>
            employee.courseEnrollments.some(
              (enrollment) => enrollment.courseSlug === selectedCourse.slug,
            ),
          )
          .map((employee) => employee.id) ?? [],
      )
    : new Set<string>();

  const evidenceDocuments: Array<{
    key: EvidenceDocumentKey;
    course: string;
    lesson: string;
    title: string;
    description: string;
    status: string;
  }> = [
    {
      key: "incendio-aula-01",
      course: "Prevenção e Combate a Incêndio na Escola",
      lesson: "Aula 01",
      title: "Mapa de Papéis",
      description:
        "Responsáveis, substitutos, evidências existentes e lacunas antes, durante e depois de uma emergência.",
      status: rolesMapHasData ? "Em preenchimento" : "Pendente",
    },
    {
      key: "incendio-aula-02",
      course: "Prevenção e Combate a Incêndio na Escola",
      lesson: "Aula 02",
      title: "Caminhada Observacional",
      description:
        "Achados de prevenção, correções simples, encaminhamentos técnicos e evidências internas guardadas pela escola.",
      status: walkthroughHasData ? "Em preenchimento" : "Pendente",
    },
    {
      key: "incendio-aula-03",
      course: "Prevenção e Combate a Incêndio na Escola",
      lesson: "Aula 03",
      title: "Inventário Documental de Incêndio e Sistemas",
      description:
        "Organização dos documentos existentes e próximos registros, usando o modelo genérico de evidências quando disponível e PGR como apoio.",
      status: inventoryHasData
        ? "Em preenchimento"
        : hasDocumentInventory
          ? `${dashboard?.pgrDocuments.length} PGR salvo(s)`
          : "Pendente",
    },
  ];

  async function loadCourseEvidenceDocuments() {
    setCourseEvidenceDocuments([]);
    setInventoryForm(emptyDocumentInventory);
    try {
      const response = await fetch(
        `/api/escolas/${resolvedParams.organizationId}/evidencias?courseSlug=incendio-escolas`,
      );
      if (!response.ok) return;
      const data = await response.json();
      const documents = Array.isArray(data.documents)
        ? (data.documents as CourseEvidenceDocument[])
        : [];
      setCourseEvidenceDocuments(documents);
      const inventoryDocument = documents.find(
        (document) =>
          document.lessonOrder === 3 &&
          document.documentKey === "incendio-inventario-documental-sistemas-v1",
      );
      setInventoryForm(buildDocumentInventoryForm(inventoryDocument));
    } catch {
      // Fallback intencional: instalações sem a rota genérica continuam usando os formulários locais e PGR.
    }
  }

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/escolas/${resolvedParams.organizationId}/painel`,
        {},
      );
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "Não foi possível carregar o painel.");
        setLoading(false);
        return;
      }

      setDashboard(data);
      setSelectedCourseSlug(
        (current) =>
          current ||
          data.courses?.find(
            (course: { canAssign: boolean }) => course.canAssign,
          )?.slug ||
          data.courses?.[0]?.slug ||
          "",
      );
      setRolesMapForm(buildEmergencyRolesMapForm(data.emergencyRolesMap));
      setWalkthroughForm(buildFireRiskWalkthroughForm(data.fireRiskWalkthrough));
      setLoading(false);
      await loadCourseEvidenceDocuments();
    } catch {
      setError("Não foi possível carregar o painel da escola.");
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.organizationId]);

  function hasValidEmail(email?: string | null) {
    return Boolean(email && /^\S+@\S+\.\S+$/.test(email));
  }

  function toggleEmployeeSelection(employeeId: string) {
    setSelectedEmployeeIds((current) =>
      current.includes(employeeId)
        ? current.filter((id) => id !== employeeId)
        : [...current, employeeId],
    );
  }

  function selectEmployeesByJobTitle(jobTitle?: string | null) {
    if (!dashboard) return;
    const ids = dashboard.employees
      .filter((employee) => (jobTitle ? employee.jobTitle === jobTitle : true))
      .map((employee) => employee.id);
    setSelectedEmployeeIds(ids);
  }

  async function assignSelectedCourse() {
    if (!selectedCourse || !selectedEmployeeIds.length) {
      setAssignmentMessage("Selecione um curso e ao menos um colaborador.");
      return;
    }

    setAssigningCourse(true);
    setAssignmentMessage(null);
    setAssignmentLinks({});
    setError(null);

    const response = await fetch(
      `/api/escolas/${resolvedParams.organizationId}/painel`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: selectedCourse.slug,
          employeeIds: selectedEmployeeIds,
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      const message = data.error ?? "Não foi possível atribuir o curso.";
      setError(message);
      setAssignmentMessage(message);
      setAssigningCourse(false);
      return;
    }

    const links = (Array.isArray(data.assigned) ? data.assigned : []).reduce(
      (
        accumulator: Record<string, string>,
        item: { employeeId: string; invitationUrl: string },
      ) => {
        accumulator[item.employeeId] = item.invitationUrl;
        return accumulator;
      },
      {},
    );
    setAssignmentLinks(links);
    setAssignmentMessage(
      `${data.assigned?.length ?? 0} colaborador(es) vinculados a ${data.course?.title ?? selectedCourse.title}. Links individuais gerados; nenhum e-mail foi enviado automaticamente.`,
    );
    setAssigningCourse(false);
    await load();
  }

  async function resendInvite(employeeId: string, sendEmail = false) {
    setError(null);
    setInviteMessages((current) => ({
      ...current,
      [employeeId]: sendEmail ? "Enviando e-mail..." : "Gerando link...",
    }));
    const response = await fetch(
      `/api/escolas/${resolvedParams.organizationId}/convites/${employeeId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sendEmail }),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      const message = data.error ?? "Não foi possível gerar novo convite.";
      setError(message);
      setInviteMessages((current) => ({ ...current, [employeeId]: message }));
      return;
    }
    setInviteLinks((current) => ({
      ...current,
      [employeeId]: data.invitationUrl,
    }));
    if (sendEmail) {
      const message = data.emailResult?.sent
        ? "E-mail enviado."
        : (data.emailResult?.error ??
          "Convite gerado, mas o e-mail não foi enviado.");
      setInviteMessages((current) => ({ ...current, [employeeId]: message }));
      if (!data.emailResult?.sent) setError(message);
    } else {
      setInviteMessages((current) => ({
        ...current,
        [employeeId]: "Link gerado.",
      }));
    }
    await load();
  }

  function updateRolesMapField(field: EmergencyRolesMapField, value: string) {
    setRolesMapForm((current) => ({ ...current, [field]: value }));
  }

  function updateWalkthroughField(
    field: FireRiskWalkthroughField,
    value: string,
  ) {
    setWalkthroughForm((current) => ({ ...current, [field]: value }));
  }

  function updateInventoryField(field: DocumentInventoryField, value: string) {
    setInventoryForm((current) => ({ ...current, [field]: value }));
  }

  async function saveDocumentInventory() {
    setSavingInventory(true);
    setInventoryMessage(null);
    setError(null);

    const response = await fetch(
      `/api/escolas/${resolvedParams.organizationId}/evidencias`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseSlug: "incendio-escolas",
          lessonOrder: 3,
          documentKey: "incendio-inventario-documental-sistemas-v1",
          title: "Inventário Documental de Incêndio e Sistemas",
          status: "draft",
          content: inventoryForm,
          metadata: { source: "school-dashboard", fallback: "pgr-documents" },
        }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      const message =
        data.error ?? "Não foi possível salvar o inventário documental.";
      setError(message);
      setInventoryMessage(
        `${message} Use o PGR como fallback enquanto a rota genérica não estiver disponível.`,
      );
      setSavingInventory(false);
      return;
    }

    setInventoryForm(buildDocumentInventoryForm(data.document));
    setInventoryMessage("Inventário documental salvo.");
    setSavingInventory(false);
    await loadCourseEvidenceDocuments();
  }

  async function saveEmergencyRolesMap() {
    setSavingRolesMap(true);
    setRolesMapMessage(null);
    setError(null);

    const response = await fetch(
      `/api/escolas/${resolvedParams.organizationId}/painel`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emergencyRolesMap: rolesMapForm }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      const message = data.error ?? "Não foi possível salvar o mapa de papéis.";
      setError(message);
      setRolesMapMessage(message);
      setSavingRolesMap(false);
      return;
    }

    setRolesMapForm(buildEmergencyRolesMapForm(data.emergencyRolesMap));
    setRolesMapMessage("Mapa de papéis salvo.");
    setSavingRolesMap(false);
    await load();
  }

  async function saveFireRiskWalkthrough() {
    setSavingWalkthrough(true);
    setWalkthroughMessage(null);
    setError(null);

    const response = await fetch(
      `/api/escolas/${resolvedParams.organizationId}/painel`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fireRiskWalkthrough: walkthroughForm }),
      },
    );
    const data = await response.json();

    if (!response.ok) {
      const message =
        data.error ?? "Não foi possível salvar a caminhada observacional.";
      setError(message);
      setWalkthroughMessage(message);
      setSavingWalkthrough(false);
      return;
    }

    setWalkthroughForm(buildFireRiskWalkthroughForm(data.fireRiskWalkthrough));
    setWalkthroughMessage("Caminhada observacional salva.");
    setSavingWalkthrough(false);
    await load();
  }

  return (
    <main className="min-h-screen bg-[#f7f4ec] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">
              Área interna Excellentia
            </p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">
              Painel da escola
            </h1>
            <p className="text-gray-600 mt-2 max-w-3xl">
              Área organizada por blocos: resumo executivo, cursos e
              colaboradores, evidências formativas, cofre sensível e governança.
              Assim a gestão escolar não precisa operar tudo em uma única tela
              longa.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.history.back()}
              className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-5 py-2 rounded-lg text-sm"
            >
              Voltar
            </button>
            <button
              onClick={load}
              disabled={loading}
              className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-2 rounded-lg text-sm"
            >
              {loading ? "Carregando..." : "Atualizar painel"}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl bg-red-50 border border-red-100 text-red-700 p-4 text-sm">
            {error}
          </div>
        )}

        {dashboard && (
          <>
            <section className="relative overflow-hidden rounded-[2rem] border border-navy/10 bg-[#06101c] p-6 text-white shadow-xl md:p-8">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(244,219,118,.22),transparent_28%),linear-gradient(145deg,#06101c_0%,#0a2749_52%,#02060b_100%)]" />
              <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(244,219,118,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(244,219,118,.07)_1px,transparent_1px)] [background-size:64px_64px]" />
              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.24em] text-gold-light">
                    escola em operação
                  </p>
                  <h2 className="text-3xl font-black tracking-[-0.03em] text-white mt-2">
                    {dashboard.organization.name}
                  </h2>
                  <p className="text-sm text-slate-300 mt-2">
                    {dashboard.organization.slug} ·{" "}
                    {dashboard.organization.status}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`/admin/escolas/importacao?organizationId=${dashboard.organization.id}`}
                    className="bg-white/10 border border-white/20 hover:border-gold-light text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    Colaboradores
                  </a>
                  <a
                    href={`/admin/escolas/${dashboard.organization.id}/relatorios/nr1`}
                    className="bg-white/10 border border-white/20 hover:border-gold-light text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    Relatório NR-1
                  </a>
                  <a
                    href={`/admin/escolas/${dashboard.organization.id}/comunicacoes`}
                    className="bg-white/10 border border-white/20 hover:border-gold-light text-white font-bold px-4 py-2 rounded-lg text-sm transition"
                  >
                    Comunicações
                  </a>
                  <a
                    href={`/pgr/formulario?organizationId=${dashboard.organization.id}`}
                    className="bg-gold hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-lg text-sm shadow-lg shadow-gold/20"
                  >
                    Criar PGR
                  </a>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                ["Colaboradores", dashboard.summary.employeeCount],
                ["Ativos", dashboard.summary.activeCount],
                ["Convites pendentes", dashboard.summary.invitedCount],
                ["Concluíram NR-1", dashboard.summary.completedCount],
                ["Conclusão", `${dashboard.summary.completionPercent}%`],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5"
                >
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                    {label}
                  </p>
                  <p className="text-3xl font-extrabold text-navy mt-2">
                    {value}
                  </p>
                </div>
              ))}
            </section>

            <section className="rounded-[2rem] border border-white/70 bg-white p-5 shadow-sm">
              <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                    áreas do painel
                  </p>
                  <h2 className="mt-1 text-2xl font-black tracking-[-0.02em] text-navy">
                    Escolha o bloco de trabalho
                  </h2>
                </div>
                <p className="max-w-2xl text-sm leading-6 text-slate-600">
                  Todos os recursos continuam disponíveis, mas separados por
                  intenção operacional para reduzir carga cognitiva.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                {panelAreas.map((area) => {
                  const active = activeArea === area.key;
                  const metric =
                    area.key === "courses"
                      ? `${dashboard.courses.length} cursos · ${dashboard.summary.employeeCount} pessoas`
                      : area.key === "evidence"
                        ? `${evidenceDocuments.filter((document) => document.status !== "Pendente").length}/${evidenceDocuments.length} em andamento`
                        : area.key === "vault"
                          ? "cofre isolado"
                          : area.key === "governance"
                            ? `${dashboard.summary.communicationCount} comunicados · ${dashboard.summary.pgrCount} PGR`
                            : `${dashboard.summary.completionPercent}% conclusão`;
                  return (
                    <button
                      key={area.key}
                      type="button"
                      onClick={() => setActiveArea(area.key)}
                      className={`rounded-2xl border p-4 text-left transition ${active ? "border-gold bg-yellow-50 shadow-sm" : "border-slate-100 bg-slate-50 hover:border-gold/60 hover:bg-white"}`}
                    >
                      <p className="text-[11px] font-black uppercase tracking-[0.18em] text-gold">
                        {area.eyebrow}
                      </p>
                      <h3 className="mt-2 text-base font-black text-navy">
                        {area.title}
                      </h3>
                      <p className="mt-2 min-h-12 text-xs leading-5 text-slate-600">
                        {area.description}
                      </p>
                      <p
                        className={`mt-3 text-xs font-bold ${active ? "text-navy" : "text-slate-500"}`}
                      >
                        {metric}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            {activeArea === "dashboard" && (
              <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm lg:col-span-2">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gold">
                    leitura rápida
                  </p>
                  <h2 className="mt-2 text-2xl font-black tracking-[-0.02em] text-navy">
                    O que precisa de atenção agora
                  </h2>
                  <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setActiveArea("courses")}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-gold"
                    >
                      <h3 className="font-black text-navy">
                        Cursos e colaboradores
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Atribua formações por curso, cargo ou pessoa e gere
                        links individuais sem envio automático.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveArea("evidence")}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-gold"
                    >
                      <h3 className="font-black text-navy">
                        Evidências formativas
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Preencha mapas e documentos internos ligados às aulas,
                        sem misturar material sensível.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveArea("vault")}
                      className="rounded-2xl border border-red-100 bg-red-50 p-4 text-left hover:border-red-300"
                    >
                      <h3 className="font-black text-red-900">
                        Cofre sensível separado
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-red-800">
                        Registros de proteção escolar, anexos e arquivos
                        privados ficam fora das evidências comuns.
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveArea("governance")}
                      className="rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left hover:border-gold"
                    >
                      <h3 className="font-black text-navy">
                        Governança e relatórios
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        Acesse PGR, relatórios NR-1 e comunicados recentes da
                        escola.
                      </p>
                    </button>
                  </div>
                </div>
                <div className="rounded-[2rem] border border-amber-100 bg-amber-50 p-6 shadow-sm">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-amber-700">
                    limite operacional
                  </p>
                  <h3 className="mt-2 text-xl font-black text-amber-950">
                    Público-alvo é orientação, não bloqueio.
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-amber-900">
                    A escola escolhe quem recebe cada curso por função, risco e
                    política interna. O acesso e o certificado dependem do
                    vínculo/convite individual.
                  </p>
                </div>
              </section>
            )}

            {activeArea === "evidence" && (
              <>
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-5">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                        documentos formativos
                      </p>
                      <h2 className="text-2xl font-black tracking-[-0.02em] text-navy mt-1">
                        Evidências dos cursos
                      </h2>
                      <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                        Selecione um documento por curso e aula. A ideia é
                        evitar uma página infinita de formulários e manter cada
                        evidência ligada ao momento formativo correto.
                      </p>
                      <p className="text-xs text-red-800 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-3 max-w-3xl">
                        Privacidade: registre só o mínimo necessário. Não cole
                        CPF, laudos, boletins, prontuários, fotos, anexos, nomes
                        de crianças/adolescentes ou relatos sensíveis
                        identificáveis; use referência interna e guarda segura
                        fora deste formulário.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-900 lg:max-w-sm">
                      Evidência interna ajuda a escola a organizar rotina,
                      responsáveis e registros. Ela não substitui laudo,
                      vistoria, AVCB (Auto de Vistoria do Corpo de Bombeiros),
                      CLCB (Certificado de Licença do Corpo de Bombeiros),
                      brigada, treinamento prático ou responsável habilitado
                      quando aplicável.
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {evidenceDocuments.map((document) => {
                      const active = activeEvidenceDocument === document.key;
                      return (
                        <button
                          key={document.key}
                          type="button"
                          onClick={() =>
                            setActiveEvidenceDocument(document.key)
                          }
                          className={`text-left rounded-2xl border p-5 transition ${active ? "border-gold bg-yellow-50 shadow-sm" : "border-gray-100 bg-gray-50 hover:border-gold/60 hover:bg-white"}`}
                        >
                          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400">
                            {document.course}
                          </p>
                          <div className="mt-3 flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs font-bold uppercase tracking-wide text-gold">
                                {document.lesson}
                              </p>
                              <h3 className="text-lg font-black text-navy mt-1">
                                {document.title}
                              </h3>
                            </div>
                            <span
                              className={`rounded-full px-3 py-1 text-[11px] font-bold ${active ? "bg-gold text-white" : "bg-white text-gray-500 border border-gray-200"}`}
                            >
                              {document.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-3 leading-6">
                            {document.description}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </section>

                {activeEvidenceDocument === "incendio-aula-01" && (
                  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                          incêndio nas escolas · aula 01
                        </p>
                        <h2 className="text-xl font-bold text-navy mt-1">
                          Mapa de Papéis de Prevenção e Emergência
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                          Documento institucional para registrar responsáveis,
                          substitutos, evidências existentes e lacunas nos
                          quatro momentos da rotina de segurança.
                        </p>
                        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-3 max-w-3xl">
                          Use como mapa interno de responsabilidade. Quando
                          houver exigência técnica ou legal, valide protocolos,
                          rotas, planos e treinamentos com profissional
                          habilitado e autoridade competente.
                        </p>
                      </div>
                      <button
                        onClick={saveEmergencyRolesMap}
                        disabled={savingRolesMap || !schoolEvidenceMapsAvailable}
                        className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap"
                      >
                        {savingRolesMap ? "Salvando..." : "Salvar mapa"}
                      </button>
                    </div>
                    {!schoolEvidenceMapsAvailable && (
                      <p className="mb-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
                        Evidências formativas em modo somente leitura neste ambiente: as tabelas novas ainda precisam de migration no banco de produção. O restante do painel segue disponível.
                      </p>
                    )}
                    {rolesMapMessage && (
                      <p className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
                        {rolesMapMessage}
                      </p>
                    )}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-4">
                      {roleBlocks.map((block) => (
                        <div
                          key={block.key}
                          className="rounded-2xl border border-gray-100 bg-gray-50 p-4"
                        >
                          <h3 className="text-lg font-extrabold text-navy">
                            {block.title}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1 min-h-12">
                            {block.description}
                          </p>
                          <div className="mt-4 space-y-3">
                            {[
                              [
                                "Responsible",
                                "Responsável",
                                "Nome/cargo de quem assume esta frente",
                              ],
                              [
                                "Substitute",
                                "Substituto",
                                "Quem cobre ausências ou impedimentos",
                              ],
                              [
                                "Evidence",
                                "Evidência/documento existente",
                                "Ex.: ata, protocolo, planta, lista, treinamento",
                              ],
                              [
                                "Gaps",
                                "Lacunas/observações",
                                "O que ainda precisa ser definido, treinado ou documentado",
                              ],
                            ].map(([suffix, label, placeholder]) => {
                              const field =
                                `${block.key}${suffix}` as EmergencyRolesMapField;
                              return (
                                <label key={field} className="block">
                                  <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                    {label}
                                  </span>
                                  <textarea
                                    value={rolesMapForm[field] ?? ""}
                                    onChange={(event) =>
                                      updateRolesMapField(
                                        field,
                                        event.target.value,
                                      )
                                    }
                                    rows={
                                      suffix === "Gaps" || suffix === "Evidence"
                                        ? 3
                                        : 2
                                    }
                                    className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                                    placeholder={placeholder}
                                  />
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeEvidenceDocument === "incendio-aula-02" && (
                  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                          incêndio nas escolas · aula 02
                        </p>
                        <h2 className="text-xl font-bold text-navy mt-1">
                          Caminhada Observacional e Evidências de Prevenção
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                          Registro operacional dos achados de prevenção antes da
                          emergência. Não substitui vistoria, laudo, AVCB (Auto
                          de Vistoria do Corpo de Bombeiros), CLCB (Certificado
                          de Licença do Corpo de Bombeiros) ou avaliação por
                          responsável habilitado.
                        </p>
                      </div>
                      <button
                        onClick={saveFireRiskWalkthrough}
                        disabled={savingWalkthrough || !schoolEvidenceMapsAvailable}
                        className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap"
                      >
                        {savingWalkthrough
                          ? "Salvando..."
                          : "Salvar evidências"}
                      </button>
                    </div>
                    {!schoolEvidenceMapsAvailable && (
                      <p className="mb-4 rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-900">
                        Caminhada observacional em modo somente leitura neste ambiente até a aplicação das migrations de evidências formativas.
                      </p>
                    )}
                    {walkthroughMessage && (
                      <p className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
                        {walkthroughMessage}
                      </p>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {fireRiskWalkthroughFields.map(
                        ([field, label, placeholder]) => (
                          <label
                            key={field}
                            className="block rounded-2xl border border-gray-100 bg-gray-50 p-4"
                          >
                            <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                              {label}
                            </span>
                            <textarea
                              value={walkthroughForm[field] ?? ""}
                              onChange={(event) =>
                                updateWalkthroughField(
                                  field,
                                  event.target.value,
                                )
                              }
                              rows={field === "findingsLog" ? 7 : 4}
                              className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                              placeholder={placeholder}
                            />
                          </label>
                        ),
                      )}
                    </div>
                  </section>
                )}

                {activeEvidenceDocument === "incendio-aula-03" && (
                  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                          incêndio nas escolas · aula 03
                        </p>
                        <h2 className="text-xl font-bold text-navy mt-1">
                          Inventário Documental
                        </h2>
                        <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                          Estrutura reservada para reunir documentos existentes:
                          AVCB/CLCB, planta ou croqui, manutenção de extintores,
                          iluminação e sinalização, atas, treinamentos,
                          simulados, fornecedores e registros de correção.
                        </p>
                        <p className="text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-3 max-w-3xl">
                          Este documento usa a rota genérica de evidências
                          quando disponível. Se a rota estiver indisponível em
                          algum ambiente, o PGR e os documentos salvos abaixo
                          seguem como fallback de navegação, sem substituir
                          laudo, vistoria ou responsável habilitado.
                        </p>
                      </div>
                      <button
                        onClick={saveDocumentInventory}
                        disabled={savingInventory}
                        className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap"
                      >
                        {savingInventory ? "Salvando..." : "Salvar inventário"}
                      </button>
                    </div>
                    {inventoryMessage && (
                      <p className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
                        {inventoryMessage}
                      </p>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <h3 className="text-lg font-extrabold text-navy">
                          Registro da aula 03
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                          Preencha como inventário interno de documentos e
                          evidências. Quando houver exigência técnica, registre
                          também o encaminhamento para profissional habilitado.
                        </p>
                        <div className="mt-4 space-y-3">
                          {documentInventoryFields.map(
                            ([field, label, placeholder]) => (
                              <label key={field} className="block">
                                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                                  {label}
                                </span>
                                <textarea
                                  value={inventoryForm[field] ?? ""}
                                  onChange={(event) =>
                                    updateInventoryField(
                                      field,
                                      event.target.value,
                                    )
                                  }
                                  rows={
                                    field === "documentsFound" ||
                                    field === "gapsAndReferrals"
                                      ? 5
                                      : 3
                                  }
                                  className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                                  placeholder={placeholder}
                                />
                              </label>
                            ),
                          )}
                        </div>
                      </div>
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="text-lg font-extrabold text-navy">
                              Documentos já salvos
                            </h3>
                            <p className="text-sm text-gray-600 mt-2">
                              Evidências genéricas e PGR disponíveis para esta
                              escola.
                            </p>
                          </div>
                          <a
                            href={`/pgr/formulario?organizationId=${dashboard.organization.id}`}
                            className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs whitespace-nowrap"
                          >
                            Criar PGR
                          </a>
                        </div>
                        <div className="mt-4 space-y-3">
                          {courseEvidenceDocuments.length
                            ? courseEvidenceDocuments.map((item) => (
                                <div
                                  key={item.id}
                                  className="rounded-xl border border-gray-100 bg-white p-4"
                                >
                                  <p className="font-medium text-navy">
                                    {item.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {item.courseSlug} · aula {item.lessonOrder}{" "}
                                    · {item.status}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Atualizado em{" "}
                                    {new Date(item.updatedAt).toLocaleString(
                                      "pt-BR",
                                    )}
                                  </p>
                                </div>
                              ))
                            : null}
                          {dashboard.pgrDocuments.length
                            ? dashboard.pgrDocuments.map((item) => (
                                <div
                                  key={item.id}
                                  className="rounded-xl border border-gray-100 bg-white p-4"
                                >
                                  <div className="flex items-center justify-between gap-3">
                                    <p className="font-medium text-navy">
                                      PGR · {item.status}
                                    </p>
                                    <a
                                      href={`/admin/pgr/${item.id}`}
                                      className="text-xs font-bold text-gold hover:underline"
                                    >
                                      Abrir
                                    </a>
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Atualizado em{" "}
                                    {new Date(item.updatedAt).toLocaleString(
                                      "pt-BR",
                                    )}
                                  </p>
                                </div>
                              ))
                            : null}
                          {!courseEvidenceDocuments.length &&
                            !dashboard.pgrDocuments.length && (
                              <p className="text-sm text-gray-500">
                                Nenhum documento salvo ainda.
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}

            {activeArea === "vault" && (
              <SensitiveEvidenceVaultPanel
                organizationId={dashboard.organization.id}
              />
            )}

            {activeArea === "courses" && (
              <>
                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">
                        atribuição de cursos
                      </p>
                      <h2 className="text-2xl font-black tracking-[-0.02em] text-navy mt-1">
                        A escola escolhe quem recebe cada formação
                      </h2>
                      <p className="text-sm text-gray-600 mt-2 max-w-3xl">
                        O público-alvo sugerido orienta a decisão por
                        perfil/função, mas não bloqueia a escola. Selecione um
                        curso e marque colaboradores por cargo ou
                        individualmente; o sistema cria vínculo e link
                        individual somente para os escolhidos.
                      </p>
                    </div>
                    <button
                      onClick={assignSelectedCourse}
                      disabled={
                        assigningCourse ||
                        !selectedCourse?.canAssign ||
                        !selectedEmployeeIds.length
                      }
                      className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm whitespace-nowrap"
                    >
                      {assigningCourse
                        ? "Gerando links..."
                        : "Atribuir curso selecionado"}
                    </button>
                  </div>

                  {assignmentMessage && (
                    <p className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">
                      {assignmentMessage}
                    </p>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <label className="block">
                        <span className="text-xs font-bold uppercase tracking-wide text-gray-500">
                          Curso
                        </span>
                        <select
                          value={selectedCourse?.slug ?? ""}
                          onChange={(event) =>
                            setSelectedCourseSlug(event.target.value)
                          }
                          className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/20"
                        >
                          {dashboard.courses.map((course) => (
                            <option key={course.slug} value={course.slug}>
                              {course.shortTitle || course.title}
                              {course.canAssign ? "" : " · indisponível"}
                            </option>
                          ))}
                        </select>
                      </label>
                      {selectedCourse && (
                        <div className="mt-4 space-y-3 text-sm text-gray-700">
                          <p>
                            <strong className="text-navy">
                              Público-alvo sugerido:
                            </strong>{" "}
                            {selectedCourse.targetAudience}
                          </p>
                          <p className="text-xs text-gray-500">
                            {selectedCourse.area} ·{" "}
                            {selectedCourse.lessonsCount} aula(s) ·{" "}
                            {selectedCourse.enrolledCount} colaborador(es) já
                            vinculado(s)
                          </p>
                          {!selectedCourse.canAssign && (
                            <p className="text-xs text-red-700 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                              Curso ainda não publicado no banco; não é seguro
                              gerar convites para ele.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="lg:col-span-2 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <button
                          type="button"
                          onClick={() => selectEmployeesByJobTitle()}
                          className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs"
                        >
                          Selecionar todos
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedEmployeeIds([])}
                          className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs"
                        >
                          Limpar
                        </button>
                        {dashboard.jobTitles.map((jobTitle) => (
                          <button
                            key={jobTitle}
                            type="button"
                            onClick={() => selectEmployeesByJobTitle(jobTitle)}
                            className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs"
                          >
                            {jobTitle}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mb-3">
                        Selecionados: {selectedEmployees.length}. Já vinculados
                        ao curso:{" "}
                        {
                          selectedEmployees.filter((employee) =>
                            employeesAlreadyInSelectedCourse.has(employee.id),
                          ).length
                        }
                        .
                      </p>
                      <div className="max-h-96 overflow-auto rounded-xl border border-gray-100 bg-white">
                        {dashboard.employees.map((employee) => {
                          const checked = selectedEmployeeIds.includes(
                            employee.id,
                          );
                          const alreadyAssigned = selectedCourse
                            ? employee.courseEnrollments.some(
                                (enrollment) =>
                                  enrollment.courseSlug === selectedCourse.slug,
                              )
                            : false;
                          return (
                            <label
                              key={employee.id}
                              className={`flex items-start gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer ${checked ? "bg-yellow-50" : "bg-white"}`}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() =>
                                  toggleEmployeeSelection(employee.id)
                                }
                                className="mt-1"
                              />
                              <span className="flex-1">
                                <span className="font-medium text-navy block">
                                  {employee.fullName}
                                </span>
                                <span className="text-xs text-gray-500 block">
                                  {employee.jobTitle || "Sem cargo"} ·{" "}
                                  {employee.email || "sem e-mail"}
                                </span>
                                {alreadyAssigned && (
                                  <span className="inline-block mt-1 rounded-full bg-blue-50 text-blue-800 border border-blue-100 px-2 py-0.5 text-[11px] font-bold">
                                    já vinculado
                                  </span>
                                )}
                                {assignmentLinks[employee.id] && (
                                  <button
                                    type="button"
                                    onClick={(event) => {
                                      event.preventDefault();
                                      navigator.clipboard?.writeText(
                                        assignmentLinks[employee.id],
                                      );
                                    }}
                                    className="ml-2 inline-block rounded-full bg-gold text-white px-2 py-0.5 text-[11px] font-bold"
                                  >
                                    copiar link
                                  </button>
                                )}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-xl font-bold text-navy mb-4">
                    Colaboradores
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                      <thead>
                        <tr className="text-left border-b border-gray-200">
                          <th className="py-2 pr-4">Nome</th>
                          <th className="py-2 pr-4">Cargo</th>
                          <th className="py-2 pr-4">Unidade</th>
                          <th className="py-2 pr-4">Convite</th>
                          <th className="py-2 pr-4">NR-1</th>
                          <th className="py-2 pr-4">Cursos atribuídos</th>
                          <th className="py-2 pr-4">Certificado</th>
                          <th className="py-2 pr-4">Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dashboard.employees.map((employee) => (
                          <tr
                            key={employee.id}
                            className="border-b border-gray-100"
                          >
                            <td className="py-3 pr-4">
                              <p className="font-medium text-navy">
                                {employee.fullName}
                              </p>
                              <p className="text-xs text-gray-500">
                                {employee.email}
                              </p>
                            </td>
                            <td className="py-3 pr-4">{employee.jobTitle}</td>
                            <td className="py-3 pr-4">{employee.unitName}</td>
                            <td className="py-3 pr-4">
                              {employee.invitationStatus ?? "-"}
                            </td>
                            <td className="py-3 pr-4">
                              {employee.answeredCount}/
                              {employee.totalActivities} ·{" "}
                              {employee.progressPercent}%
                            </td>
                            <td className="py-3 pr-4 min-w-56">
                              <div className="flex flex-wrap gap-1">
                                {employee.courseEnrollments.length ? (
                                  employee.courseEnrollments.map(
                                    (enrollment) => (
                                      <span
                                        key={enrollment.courseSlug}
                                        className="rounded-full bg-gray-50 border border-gray-200 px-2 py-1 text-[11px] text-gray-700"
                                      >
                                        {enrollment.courseTitle} ·{" "}
                                        {enrollment.status}
                                      </span>
                                    ),
                                  )
                                ) : (
                                  <span className="text-gray-400">-</span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 pr-4">
                              {employee.certificate ? (
                                <a
                                  href={`/certificados/${employee.certificate.verificationCode}`}
                                  className="text-gold font-bold hover:underline"
                                >
                                  {employee.certificate.verificationCode}
                                </a>
                              ) : (
                                "-"
                              )}
                            </td>
                            <td className="py-3 pr-4 min-w-64">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => resendInvite(employee.id)}
                                  className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs"
                                >
                                  Gerar link
                                </button>
                                <button
                                  onClick={() =>
                                    resendInvite(employee.id, true)
                                  }
                                  disabled={!hasValidEmail(employee.email)}
                                  title={
                                    !hasValidEmail(employee.email)
                                      ? "Cadastre um e-mail válido para enviar."
                                      : undefined
                                  }
                                  className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-3 py-2 rounded-lg text-xs"
                                >
                                  Enviar por e-mail
                                </button>
                                {inviteLinks[employee.id] && (
                                  <button
                                    onClick={() =>
                                      navigator.clipboard?.writeText(
                                        inviteLinks[employee.id],
                                      )
                                    }
                                    className="bg-gold hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg text-xs"
                                  >
                                    Copiar link
                                  </button>
                                )}
                              </div>
                              {inviteMessages[employee.id] && (
                                <p className="mt-2 text-xs text-gray-600">
                                  {inviteMessages[employee.id]}
                                </p>
                              )}
                              {!hasValidEmail(employee.email) && (
                                <p className="mt-2 text-xs text-red-700">
                                  E-mail inválido ou ausente. Gere/copiei o link
                                  ou corrija o cadastro.
                                </p>
                              )}
                              {inviteLinks[employee.id] && (
                                <a
                                  href={inviteLinks[employee.id]}
                                  className="block mt-2 text-xs text-gold break-all hover:underline"
                                >
                                  {inviteLinks[employee.id]}
                                </a>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </>
            )}

            {activeArea === "governance" && (
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <h2 className="text-xl font-bold text-navy mb-4">
                    Comunicados recentes
                  </h2>
                  <div className="space-y-3">
                    {dashboard.communications.length ? (
                      dashboard.communications.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-100 rounded-xl p-4"
                        >
                          <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                            {item.kind} · {item.status}
                          </p>
                          <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                            {item.message}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Nenhum comunicado ainda.
                      </p>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-navy">PGR</h2>
                      <p className="text-xs text-gray-500 mt-1">
                        Inventário de riscos e plano de ação NR-1.
                      </p>
                    </div>
                    {dashboard && (
                      <a
                        href={`/pgr/formulario?organizationId=${dashboard.organization.id}`}
                        className="bg-gold hover:bg-yellow-600 text-white font-bold px-3 py-2 rounded-lg text-xs whitespace-nowrap"
                      >
                        Criar PGR
                      </a>
                    )}
                  </div>
                  <div className="space-y-3">
                    {dashboard.pgrDocuments.length ? (
                      dashboard.pgrDocuments.map((item) => (
                        <div
                          key={item.id}
                          className="border border-gray-100 rounded-xl p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-medium text-navy">
                              {item.status}
                            </p>
                            <a
                              href={`/admin/pgr/${item.id}`}
                              className="text-xs font-bold text-gold hover:underline"
                            >
                              Abrir
                            </a>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            Atualizado em{" "}
                            {new Date(item.updatedAt).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Nenhum PGR salvo ainda.
                      </p>
                    )}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
