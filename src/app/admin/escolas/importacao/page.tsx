'use client';

import { useEffect, useMemo, useState } from 'react';

type Preview = {
  employees: Array<{ fullName: string; email?: string; cpf?: string; jobTitle?: string; unitName?: string }>;
  issues: Array<{ row: number; field?: string; message: string }>;
  detectedColumns: Record<string, string>;
};

type ImportedInvite = {
  employeeId: string;
  invitationId: string;
  fullName: string;
  email?: string | null;
  invitationUrl: string;
};

type UnitOption = { id: string; name: string; city?: string | null; state?: string | null };

type ExistingEmployee = {
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
  certificate?: null | { verificationCode: string };
};

const STANDARD_SCHOOL_JOB_TITLES = [
  'Professor(a)',
  'Professor(a) auxiliar',
  'Coordenador(a) pedagógico(a)',
  'Orientador(a) educacional',
  'Diretor(a)',
  'Vice-diretor(a)',
  'Secretário(a) escolar',
  'Auxiliar administrativo',
  'Inspetor(a) escolar',
  'Monitor(a)',
  'Berçarista',
  'Psicopedagogo(a)',
  'Bibliotecário(a)',
  'Porteiro(a)',
  'Auxiliar de limpeza',
  'Merendeiro(a)',
  'Técnico(a) de enfermagem',
  'Recepcionista',
];

function normalizePersonName(value: string) {
  const replacements: Record<string, string> = { jr: 'Junior', 'jr.': 'Junior', junior: 'Junior', filho: 'Filho', neto: 'Neto', sobrinho: 'Sobrinho' };
  const particles = new Set(['da', 'de', 'do', 'das', 'dos', 'e']);
  return value.replace(/\s+/g, ' ').trim().split(' ').filter(Boolean).map((part, index) => {
    const clean = part.toLowerCase();
    if (replacements[clean]) return replacements[clean];
    if (index > 0 && particles.has(clean)) return clean;
    return clean.charAt(0).toLocaleUpperCase('pt-BR') + clean.slice(1);
  }).join(' ');
}

function formatCpf(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

export default function ImportacaoColaboradoresPage() {
  const [organizationId, setOrganizationId] = useState('');
  const [csv, setCsv] = useState('Nome Completo;E-mail;CPF;Cargo;Unidade\nMaria Silva;maria@escola.com;12345678901;Professora;Fundamental');
  const [manual, setManual] = useState({ fullName: '', email: '', cpf: '', jobTitle: '', unitId: '' });
  const [preview, setPreview] = useState<Preview | null>(null);
  const [imported, setImported] = useState<ImportedInvite[]>([]);
  const [existingEmployees, setExistingEmployees] = useState<ExistingEmployee[]>([]);
  const [units, setUnits] = useState<UnitOption[]>([]);
  const [jobTitles, setJobTitles] = useState<string[]>(STANDARD_SCHOOL_JOB_TITLES);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const canCommit = useMemo(() => Boolean(preview?.employees.length && !preview.issues.length), [preview]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('organizationId');
    if (id) setOrganizationId(id);
  }, []);

  useEffect(() => {
    if (organizationId) loadExistingEmployees(organizationId);
  }, [organizationId]);

  async function loadExistingEmployees(id = organizationId) {
    if (!id) return;
    setLoadingEmployees(true);
    const response = await fetch(`/api/escolas/${id}/painel`);
    const data = await response.json();
    if (response.ok) {
      setExistingEmployees(data.employees ?? []);
      setUnits(data.units ?? []);
      const mergedTitles = Array.from(new Set([...STANDARD_SCHOOL_JOB_TITLES, ...(data.jobTitles ?? [])])).sort((a, b) => a.localeCompare(b, 'pt-BR'));
      setJobTitles(mergedTitles);
    }
    setLoadingEmployees(false);
  }

  async function submit(mode: 'preview' | 'commit') {
    setLoading(true);
    setResult(null);
    if (mode === 'preview') setImported([]);

    const response = await fetch('/api/escolas/colaboradores/importacao', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ organizationId, csv, mode }),
    });
    const data = await response.json();

    if (mode === 'preview') {
      setPreview(data);
    } else if (response.ok) {
      setImported(data.imported ?? []);
      setResult(`${data.imported?.length ?? 0} colaboradores importados e convites gerados.`);
      await loadExistingEmployees();
    } else {
      setResult(data.error ?? 'Não foi possível importar.');
      if (data.employees) setPreview(data);
    }

    setLoading(false);
  }

  async function addManualEmployee() {
    setLoading(true);
    setResult(null);
    setImported([]);

    const response = await fetch('/api/escolas/convites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        organizationId,
        employees: [{
          fullName: manual.fullName,
          email: manual.email,
          cpf: manual.cpf.replace(/\D/g, ''),
          jobTitle: manual.jobTitle,
          unitId: (manual as typeof manual & { unitId?: string }).unitId,
        }],
      }),
    });
    const data = await response.json();

    if (response.ok) {
      const invitations = data.invitations ?? [];
      setImported(invitations);
      setResult('Colaborador cadastrado e convite gerado.');
      setManual({ fullName: '', email: '', cpf: '', jobTitle: '', unitId: '' });
      await loadExistingEmployees();
    } else {
      setResult(data.error ?? 'Não foi possível cadastrar colaborador.');
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-gold">Área interna Excellentia</p>
            <h1 className="text-3xl font-extrabold text-navy mt-2">Colaboradores da escola</h1>
            <p className="text-gray-600 mt-2 max-w-3xl">Veja quem já foi importado, cadastre alguém manualmente ou use importação em massa por planilha/CSV.</p>
          </div>
          <button onClick={() => window.history.back()} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-5 py-2 rounded-lg text-sm">Voltar</button>
        </div>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-xl font-bold text-navy mb-4">Cadastrar colaborador manualmente</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input value={manual.fullName} onChange={(event) => setManual({ ...manual, fullName: event.target.value })} onBlur={() => setManual((current) => ({ ...current, fullName: normalizePersonName(current.fullName) }))} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Nome completo" />
            <input type="email" value={manual.email} onChange={(event) => setManual({ ...manual, email: event.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="E-mail" />
            <input value={manual.cpf} onChange={(event) => setManual({ ...manual, cpf: formatCpf(event.target.value) })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="CPF" inputMode="numeric" />
            <input value={manual.jobTitle} onChange={(event) => setManual({ ...manual, jobTitle: event.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="Cargo/função" list="school-job-titles" />
            <datalist id="school-job-titles">
              {jobTitles.map((title) => <option key={title} value={title} />)}
            </datalist>
            <select value={manual.unitId} onChange={(event) => setManual({ ...manual, unitId: event.target.value })} className="rounded-lg border border-gray-300 px-3 py-2 text-sm">
              <option value="">Unidade não informada</option>
              {units.map((unit) => <option key={unit.id} value={unit.id}>{unit.name}{unit.city ? ` · ${unit.city}/${unit.state ?? ''}` : ''}</option>)}
            </select>
          </div>
          <button onClick={addManualEmployee} disabled={loading || !organizationId || !manual.fullName.trim()} className="mt-4 bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">Cadastrar e gerar convite</button>
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-navy">Importação em massa</h2>
              <p className="text-sm text-gray-600 mt-1">Use quando houver planilha. Os cabeçalhos são reconhecidos sem depender de maiúsculas/minúsculas, acentos ou nomes rígidos de coluna.</p>
            </div>
            <button onClick={() => setShowBulkImport((value) => !value)} className="bg-navy hover:bg-blue-950 text-white font-bold px-5 py-3 rounded-xl text-sm">{showBulkImport ? 'Ocultar importação' : 'Importar por planilha'}</button>
          </div>

          {showBulkImport && (
            <div className="mt-5">
              <label className="block">
                <span className="text-sm font-medium text-gray-700">Cole aqui a planilha/CSV</span>
                <textarea value={csv} onChange={(event) => setCsv(event.target.value)} className="mt-2 w-full min-h-64 rounded-xl border border-gray-300 p-4 font-mono text-sm" />
              </label>
              <div className="mt-4 flex flex-wrap gap-3">
                <button onClick={() => submit('preview')} disabled={loading || !organizationId || !csv.trim()} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">{loading ? 'Processando...' : 'Pré-validar'}</button>
                <button onClick={() => submit('commit')} disabled={loading || !canCommit} className="bg-gold hover:bg-yellow-600 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">Gerar convites</button>
              </div>
            </div>
          )}
          {result && <p className="mt-4 text-sm font-medium text-navy">{result}</p>}
        </section>

        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
            <div>
              <h2 className="text-xl font-bold text-navy">Colaboradores já cadastrados</h2>
              <p className="text-sm text-gray-600 mt-1">{loadingEmployees ? 'Carregando...' : `${existingEmployees.length} colaborador(es) nesta escola.`}</p>
            </div>
            <button onClick={() => loadExistingEmployees()} disabled={!organizationId || loadingEmployees} className="bg-navy hover:bg-blue-950 disabled:opacity-50 text-white font-bold px-4 py-2 rounded-xl text-sm">Atualizar lista</button>
          </div>

          {existingEmployees.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="py-2 pr-4">Nome</th>
                    <th className="py-2 pr-4">Cargo</th>
                    <th className="py-2 pr-4">Unidade</th>
                    <th className="py-2 pr-4">Convite</th>
                    <th className="py-2 pr-4">NR-1</th>
                    <th className="py-2 pr-4">Certificado</th>
                  </tr>
                </thead>
                <tbody>
                  {existingEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-gray-100">
                      <td className="py-3 pr-4"><p className="font-medium text-navy">{employee.fullName}</p><p className="text-xs text-gray-500">{employee.email}</p></td>
                      <td className="py-3 pr-4">{employee.jobTitle ?? '-'}</td>
                      <td className="py-3 pr-4">{employee.unitName ?? '-'}</td>
                      <td className="py-3 pr-4">{employee.invitationStatus ?? '-'}</td>
                      <td className="py-3 pr-4">{employee.answeredCount}/{employee.totalActivities} · {employee.progressPercent}%</td>
                      <td className="py-3 pr-4">{employee.certificate?.verificationCode ?? '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p className="text-sm text-gray-500">Nenhum colaborador carregado ainda.</p>}
        </section>

        {imported.length > 0 && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-navy">Convites gerados</h2>
                <p className="text-sm text-gray-600 mt-1">Copie os links abaixo para enviar aos colaboradores ou abra o painel da escola.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`/admin/escolas/${organizationId}/painel`} className="bg-navy hover:bg-blue-950 text-white font-bold px-4 py-2 rounded-xl text-sm">Abrir painel</a>
                <a href={`/admin/escolas/${organizationId}/comunicacoes`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-xl text-sm">Comunicados</a>
                <a href={`/admin/escolas/${organizationId}/relatorios/nr1`} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-4 py-2 rounded-xl text-sm">Relatório NR-1</a>
              </div>
            </div>
            <div className="space-y-3">
              {imported.map((item) => (
                <div key={item.invitationId} className="rounded-xl bg-gray-50 border border-gray-100 p-4">
                  <p className="font-bold text-navy">{item.fullName}</p>
                  <p className="text-xs text-gray-500 mt-1">{item.email}</p>
                  <a href={item.invitationUrl} className="block text-sm text-gold font-bold mt-2 break-all hover:underline">{item.invitationUrl}</a>
                </div>
              ))}
            </div>
          </section>
        )}

        {preview && showBulkImport && (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
              <div>
                <h2 className="text-xl font-bold text-navy">Prévia da importação</h2>
                <p className="text-sm text-gray-600 mt-1">{preview.employees.length} colaboradores reconhecidos.</p>
              </div>
              <div className="text-xs text-gray-500">Colunas detectadas: {Object.entries(preview.detectedColumns).map(([from, to]) => `${from} → ${to}`).join(', ') || 'nenhuma'}</div>
            </div>

            {preview.issues.length > 0 && (
              <div className="mb-5 rounded-xl bg-red-50 border border-red-100 p-4">
                <p className="font-bold text-red-800 mb-2">Ajustes necessários</p>
                <ul className="list-disc pl-5 text-sm text-red-700 space-y-1">
                  {preview.issues.map((issue, index) => <li key={`${issue.row}-${issue.field}-${index}`}>Linha {issue.row || 'cabeçalho'}: {issue.message}</li>)}
                </ul>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-gray-200">
                    <th className="py-2 pr-4">Nome</th><th className="py-2 pr-4">E-mail</th><th className="py-2 pr-4">CPF</th><th className="py-2 pr-4">Cargo</th><th className="py-2 pr-4">Unidade</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.employees.map((employee, index) => (
                    <tr key={`${employee.fullName}-${index}`} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium text-navy">{employee.fullName}</td><td className="py-2 pr-4">{employee.email}</td><td className="py-2 pr-4">{formatCpf(employee.cpf ?? '')}</td><td className="py-2 pr-4">{employee.jobTitle}</td><td className="py-2 pr-4">{employee.unitName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">ID da escola/organização</span>
            <input value={organizationId} onChange={(event) => setOrganizationId(event.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" placeholder="org_..." />
          </label>
          {!organizationId && <p className="mt-3 text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl p-3">Para vir preenchido automaticamente, entre por “Escolas cadastradas” e clique em “Importar” na escola desejada.</p>}
        </section>

      </div>
    </main>
  );
}
