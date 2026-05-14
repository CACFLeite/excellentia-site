'use client';

import { useEffect, useMemo, useState } from 'react';

type VaultAttachmentType = 'image' | 'audio' | 'video' | 'pdf' | 'other_document';

type VaultItem = {
  id: string;
  courseSlug: string;
  lessonOrder?: number | null;
  documentKey: string;
  title: string;
  caseReference?: string | null;
  sensitivity: string;
  status: string;
  retentionPolicy: string;
  legalHold: boolean;
  updatedAt: string;
  attachments: Array<{ id: string; type: VaultAttachmentType; originalFilename: string; mimeType: string; sizeBytes: number; storageProvider?: string | null; storageObjectKey?: string | null; checksumSha256?: string | null; fileStatus?: string | null; uploadedAt?: string | null; lastAccessedAt?: string | null; deletedAt?: string | null }>;
  recentAuditEvents: Array<{ id: string; action: string; actor: string; createdAt: string }>;
};

type AttachmentMetadataForm = {
  type: VaultAttachmentType;
  originalFilename: string;
  mimeType: string;
  sizeBytes: string;
  storageProvider: string;
  storageObjectKey: string;
  checksumSha256: string;
};

const emptyAttachment: AttachmentMetadataForm = {
  type: 'image',
  originalFilename: '',
  mimeType: 'image/jpeg',
  sizeBytes: '',
  storageProvider: '',
  storageObjectKey: '',
  checksumSha256: '',
};

const attachmentLimits: Record<VaultAttachmentType, string> = {
  image: 'até 15 MB · png, jpg, webp ou heic',
  audio: 'até 50 MB · mp3, m4a, aac, wav, ogg ou webm',
  video: 'até 250 MB · mp4, mov, webm ou m4v',
  pdf: 'até 30 MB · pdf',
  other_document: 'até 15 MB · doc, docx ou txt',
};

function formatBytes(sizeBytes: number) {
  if (!Number.isFinite(sizeBytes)) return '-';
  if (sizeBytes >= 1024 * 1024) return `${(sizeBytes / (1024 * 1024)).toFixed(1)} MB`;
  if (sizeBytes >= 1024) return `${(sizeBytes / 1024).toFixed(1)} KB`;
  return `${sizeBytes} B`;
}

export default function SensitiveEvidenceVaultPanel({ organizationId }: { organizationId: string }) {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState('Registro sensível de proteção escolar');
  const [caseReference, setCaseReference] = useState('');
  const [lessonOrder, setLessonOrder] = useState('');
  const [documentKey, setDocumentKey] = useState('violencia-escolar-anexos-sensiveis');
  const [sensitivity, setSensitivity] = useState('child_protection');
  const [retentionPolicy, setRetentionPolicy] = useState('legal-hold-until-released');
  const [legalHold, setLegalHold] = useState(true);
  const [attachment, setAttachment] = useState<AttachmentMetadataForm>(emptyAttachment);
  const [uploadTypeByItem, setUploadTypeByItem] = useState<Record<string, VaultAttachmentType>>({});
  const [uploadFileByItem, setUploadFileByItem] = useState<Record<string, File | null>>({});
  const [uploadingItemId, setUploadingItemId] = useState<string | null>(null);
  const [deletingAttachmentId, setDeletingAttachmentId] = useState<string | null>(null);

  const itemCount = items.length;
  const attachmentCount = useMemo(() => items.reduce((total, item) => total + item.attachments.length, 0), [items]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/escolas/${organizationId}/evidencias-sensiveis?courseSlug=violencia-escolar-protecao`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? 'Não foi possível carregar o cofre sensível.');
        setLoading(false);
        return;
      }
      setItems(Array.isArray(data.items) ? data.items : []);
    } catch {
      setError('Não foi possível carregar o cofre sensível.');
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [organizationId]);

  function updateAttachment(field: keyof AttachmentMetadataForm, value: string) {
    setAttachment((current) => {
      const next = { ...current, [field]: value };
      if (field === 'type') {
        next.mimeType = value === 'image' ? 'image/jpeg' : value === 'audio' ? 'audio/mpeg' : value === 'video' ? 'video/mp4' : value === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      }
      return next;
    });
  }

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);

    const hasAttachment = attachment.originalFilename.trim() || attachment.sizeBytes.trim() || attachment.storageObjectKey.trim();
    const attachments = hasAttachment ? [{
      type: attachment.type,
      originalFilename: attachment.originalFilename.trim(),
      mimeType: attachment.mimeType.trim(),
      sizeBytes: Number(attachment.sizeBytes),
      storageProvider: attachment.storageProvider.trim() || undefined,
      storageObjectKey: attachment.storageObjectKey.trim() || undefined,
      checksumSha256: attachment.checksumSha256.trim() || undefined,
      metadata: { intake: 'metadata-only-ui' },
    }] : [];

    const response = await fetch(`/api/escolas/${organizationId}/evidencias-sensiveis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        courseSlug: 'violencia-escolar-protecao',
        lessonOrder: lessonOrder ? Number(lessonOrder) : undefined,
        documentKey,
        title,
        caseReference: caseReference.trim() || undefined,
        sensitivity,
        retentionPolicy,
        legalHold,
        status: attachments.length ? 'stored_externally' : 'metadata_only',
        metadata: {
          source: 'school-dashboard-sensitive-vault',
          note: 'metadata-only; binary content must stay in private storage',
        },
        attachments,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? 'Não foi possível salvar o registro sensível.');
      setSaving(false);
      return;
    }

    setMessage('Registro sensível salvo. Agora você pode anexar um arquivo real no cartão do registro; o arquivo fica no storage privado local/dev, sem link público.');
    setAttachment(emptyAttachment);
    setSaving(false);
    await load();
  }

  async function uploadAttachment(itemId: string) {
    const file = uploadFileByItem[itemId];
    const type = uploadTypeByItem[itemId] ?? 'image';
    if (!file) {
      setError('Selecione um arquivo antes de enviar.');
      return;
    }

    setUploadingItemId(itemId);
    setError(null);
    setMessage(null);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('metadata', JSON.stringify({ source: 'school-dashboard-sensitive-vault', confidentiality: 'private-local-upload' }));

    const response = await fetch(`/api/escolas/${organizationId}/evidencias-sensiveis/${itemId}/attachments`, { method: 'POST', body: formData });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? 'Não foi possível enviar o arquivo sensível.');
      setUploadingItemId(null);
      return;
    }

    setMessage('Arquivo recebido no storage privado local/dev com checksum SHA-256 e auditoria de upload.');
    setUploadFileByItem((current) => ({ ...current, [itemId]: null }));
    setUploadingItemId(null);
    await load();
  }

  async function deleteAttachment(itemId: string, attachmentId: string) {
    setDeletingAttachmentId(attachmentId);
    setError(null);
    setMessage(null);
    const response = await fetch(`/api/escolas/${organizationId}/evidencias-sensiveis/${itemId}/attachments/${attachmentId}`, { method: 'DELETE' });
    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? 'Não foi possível excluir o anexo sensível.');
      setDeletingAttachmentId(null);
      return;
    }
    setMessage(data.alreadyDeleted ? 'Anexo já estava marcado como excluído por política.' : 'Anexo excluído por política e evento registrado na auditoria.');
    setDeletingAttachmentId(null);
    await load();
  }

  function downloadAttachment(itemId: string, attachmentId: string) {
    window.open(`/api/escolas/${organizationId}/evidencias-sensiveis/${itemId}/attachments/${attachmentId}`, '_blank', 'noopener,noreferrer');
  }

  return (
    <section className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-red-700">cofre separado · evidências sensíveis</p>
          <h2 className="text-xl font-bold text-navy mt-1">Proteção contra Violência Escolar</h2>
          <p className="text-sm text-gray-600 mt-2 max-w-3xl">
            Use esta área para registrar e receber prints, áudios, vídeos ou documentos sensíveis em cofre privado. Os arquivos reais ficam fora do banco de dados, em storage privado local/dev nesta fundação, com checksum, status de arquivo e auditoria de upload/download/exclusão.
          </p>
          <p className="text-xs text-red-800 bg-red-50 border border-red-100 rounded-xl px-3 py-2 mt-3 max-w-3xl">
            Atenção: não escreva nomes de crianças/adolescentes, relatos completos, CPF, prontuários, laudos ou links públicos. Use referência interna curta. Nunca cole URL pública: download passa somente pelo endpoint protegido e auditado.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3 text-xs leading-5 text-gray-700 lg:max-w-sm">
          <strong>{itemCount}</strong> registro(s) · <strong>{attachmentCount}</strong> anexo(s) catalogado(s). Toda listagem e criação gera evento de auditoria com ator interno e hashes de IP/user-agent quando disponíveis.
        </div>
      </div>

      {error && <p className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-700">{error}</p>}
      {message && <p className="mb-4 rounded-xl bg-blue-50 border border-blue-100 px-4 py-3 text-sm text-blue-800">{message}</p>}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <h3 className="text-lg font-extrabold text-navy">Novo registro de metadados</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <label className="block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Título interno</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Referência interna curta</span>
              <input value={caseReference} onChange={(event) => setCaseReference(event.target.value)} placeholder="Ex.: caso-interno-2026-001" className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Aula vinculada (opcional)</span>
              <input value={lessonOrder} onChange={(event) => setLessonOrder(event.target.value)} inputMode="numeric" placeholder="Ex.: 4" className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Chave documental</span>
              <input value={documentKey} onChange={(event) => setDocumentKey(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Classificação</span>
              <select value={sensitivity} onChange={(event) => setSensitivity(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                <option value="restricted">Restrito</option>
                <option value="highly_sensitive">Altamente sensível</option>
                <option value="child_protection">Proteção de criança/adolescente</option>
                <option value="legal_hold">Retenção legal</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Retenção</span>
              <select value={retentionPolicy} onChange={(event) => setRetentionPolicy(event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                <option value="contract-plus-legal-obligation-review">Contrato + revisão de obrigação legal</option>
                <option value="school-defined-retention-review">Retenção definida pela escola</option>
                <option value="legal-hold-until-released">Legal hold até liberação</option>
                <option value="archive-after-case-closure-review">Arquivar após revisão de encerramento</option>
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-sm text-amber-900 md:col-span-2">
              <input type="checkbox" checked={legalHold} onChange={(event) => setLegalHold(event.target.checked)} />
              Ativar legal hold / bloqueio de descarte até revisão responsável.
            </label>
          </div>

          <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-4">
            <h4 className="font-bold text-navy">Metadados de anexo externo (opcional)</h4>
            <p className="text-xs text-gray-500 mt-1">Use só quando o arquivo já estiver em storage privado institucional. Para upload real local/dev, salve o registro e envie o arquivo pelo cartão criado à direita.</p>
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Tipo</span>
                <select value={attachment.type} onChange={(event) => updateAttachment('type', event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20">
                  <option value="image">Print/foto</option>
                  <option value="audio">Áudio</option>
                  <option value="video">Vídeo</option>
                  <option value="pdf">PDF</option>
                  <option value="other_document">Documento</option>
                </select>
                <span className="mt-1 block text-[11px] text-gray-500">{attachmentLimits[attachment.type]}</span>
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">MIME type</span>
                <input value={attachment.mimeType} onChange={(event) => updateAttachment('mimeType', event.target.value)} className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Nome original</span>
                <input value={attachment.originalFilename} onChange={(event) => updateAttachment('originalFilename', event.target.value)} placeholder="registro-001.jpg" className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Tamanho em bytes</span>
                <input value={attachment.sizeBytes} onChange={(event) => updateAttachment('sizeBytes', event.target.value)} inputMode="numeric" placeholder="1048576" className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Storage privado</span>
                <input value={attachment.storageProvider} onChange={(event) => updateAttachment('storageProvider', event.target.value)} placeholder="s3, gcs, r2..." className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-wide text-gray-500">Chave do objeto</span>
                <input value={attachment.storageObjectKey} onChange={(event) => updateAttachment('storageObjectKey', event.target.value)} placeholder="org/id/cofre/arquivo.jpg" className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/20" />
              </label>
            </div>
          </div>

          <button onClick={save} disabled={saving} className="mt-5 bg-red-700 hover:bg-red-800 disabled:opacity-50 text-white font-bold px-5 py-3 rounded-xl text-sm">
            {saving ? 'Salvando...' : 'Salvar no cofre sensível'}
          </button>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-extrabold text-navy">Registros recentes</h3>
            <button onClick={load} disabled={loading} className="bg-white border border-gray-200 hover:border-gold text-navy font-bold px-3 py-2 rounded-lg text-xs">{loading ? 'Carregando...' : 'Atualizar'}</button>
          </div>
          <div className="mt-4 space-y-3">
            {items.length ? items.map((item) => (
              <div key={item.id} className="rounded-xl border border-gray-100 bg-white p-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div>
                    <p className="font-bold text-navy">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.documentKey}{item.lessonOrder ? ` · aula ${item.lessonOrder}` : ''} · {item.status}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-[11px] font-bold ${item.legalHold ? 'bg-red-50 text-red-700 border border-red-100' : 'bg-gray-50 text-gray-600 border border-gray-100'}`}>{item.legalHold ? 'legal hold' : item.sensitivity}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Retenção: {item.retentionPolicy} · atualizado em {new Date(item.updatedAt).toLocaleString('pt-BR')}</p>
                <div className="mt-3 space-y-2">
                  {item.attachments.map((file) => (
                    <div key={file.id} className="rounded-lg bg-gray-50 border border-gray-100 px-3 py-2 text-xs text-gray-700">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2">
                        <div>
                          <strong>{file.type}</strong> · {file.originalFilename} · {file.mimeType} · {formatBytes(file.sizeBytes)}
                          {file.storageProvider && <span> · {file.storageProvider}</span>}
                          <span className={`ml-2 rounded-full px-2 py-0.5 ${file.fileStatus === 'stored' ? 'bg-green-50 text-green-700' : file.fileStatus === 'deleted_by_policy' ? 'bg-red-50 text-red-700' : 'bg-gray-100 text-gray-600'}`}>{file.fileStatus ?? 'metadata_only'}</span>
                          {file.checksumSha256 && <span className="block mt-1 text-[11px] text-gray-400">SHA-256: {file.checksumSha256.slice(0, 16)}…</span>}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button onClick={() => downloadAttachment(item.id, file.id)} disabled={file.fileStatus !== 'stored'} className="rounded-lg border border-gray-200 bg-white px-3 py-1 font-bold text-navy disabled:opacity-40">Baixar auditado</button>
                          <button onClick={() => deleteAttachment(item.id, file.id)} disabled={item.legalHold || file.fileStatus === 'deleted_by_policy' || deletingAttachmentId === file.id} className="rounded-lg border border-red-100 bg-white px-3 py-1 font-bold text-red-700 disabled:opacity-40" title={item.legalHold ? 'Legal hold ativo bloqueia exclusão' : undefined}>{deletingAttachmentId === file.id ? 'Excluindo...' : 'Excluir por política'}</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-red-100 bg-red-50/50 p-3">
                  <p className="text-xs font-bold uppercase tracking-wide text-red-700">Adicionar arquivo real ao cofre privado</p>
                  <div className="mt-2 grid grid-cols-1 lg:grid-cols-[160px_1fr_auto] gap-2">
                    <select value={uploadTypeByItem[item.id] ?? 'image'} onChange={(event) => setUploadTypeByItem((current) => ({ ...current, [item.id]: event.target.value as VaultAttachmentType }))} className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs outline-none focus:border-gold">
                      <option value="image">Print/foto</option>
                      <option value="audio">Áudio</option>
                      <option value="video">Vídeo</option>
                      <option value="pdf">PDF</option>
                      <option value="other_document">Documento</option>
                    </select>
                    <input type="file" onChange={(event) => setUploadFileByItem((current) => ({ ...current, [item.id]: event.target.files?.[0] ?? null }))} className="rounded-lg border border-gray-200 bg-white px-2 py-2 text-xs" />
                    <button onClick={() => uploadAttachment(item.id)} disabled={uploadingItemId === item.id} className="rounded-lg bg-red-700 px-3 py-2 text-xs font-bold text-white disabled:opacity-50">{uploadingItemId === item.id ? 'Enviando...' : 'Enviar privado'}</button>
                  </div>
                  <p className="mt-2 text-[11px] text-red-800">Validação: MIME + extensão + tamanho, SHA-256, chave interna sem URL pública e evento de auditoria.</p>
                </div>
                {item.recentAuditEvents.length ? <p className="text-[11px] text-gray-400 mt-3">Última auditoria: {item.recentAuditEvents[0].action} · {new Date(item.recentAuditEvents[0].createdAt).toLocaleString('pt-BR')}</p> : null}
              </div>
            )) : <p className="text-sm text-gray-500">Nenhum registro sensível catalogado ainda.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
