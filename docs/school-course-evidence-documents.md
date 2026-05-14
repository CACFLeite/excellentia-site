# School course evidence documents

Excellentia has a generic persistence layer for course activity evidence in addition to the first course-specific tables.

## Generic model

Use `SchoolCourseEvidenceDocument` for new school-course activity outputs. It is scoped by:

- `organizationId`
- `courseSlug`
- `lessonOrder`
- `documentKey`

The model is broad enough for current and future courses: inventories, checklists, flows, maps, registers, plans, referrals, walkthrough logs and other evidence documents. Store the structured activity answer in `content` and auxiliary UI/source/version data in `metadata`.

Statuses: `draft`, `submitted`, `reviewed`, `approved`, `archived`.

## Security and minimization rules

This endpoint stores school operational evidence, which can become sensitive — especially in courses such as Proteção contra Violência Escolar.

Current hardening in the API:

- internal/admin access via `assertInternalAccess`;
- organization existence check before reads/writes;
- records are always scoped by `organizationId` and unique by `organizationId + courseSlug + lessonOrder + documentKey`;
- course slug allowlist for known Excellentia school courses;
- safe identifier validation for `courseSlug`, `documentKey` and JSON field names;
- bounded title, content and metadata sizes;
- bounded JSON depth/field count and no arrays for now, to keep activity documents predictable;
- blocks attachment/file/image/base64-style keys and direct file links;
- blocks obvious CPF/CNPJ patterns and highly sensitive incident terms that should not be pasted into the form;
- server-set metadata for classification, retention review and minimization.

Operational rule: do not paste CPF, CNPJ, photos, attachments, laudos, boletins de ocorrência, prontuários, names of children/adolescents, raw incident narratives or allegations into `content`. Use minimal school-internal references, codinames/initials only when strictly necessary, and keep sensitive source documents in the school’s restricted repository outside this form.

For violence-school evidence, keep entries formative and procedural: what protocol exists, who is responsible, what safe referral path is used, where restricted files are kept, and what follow-up is due — not the full facts of a real case.

## API

Internal endpoint, protected with `assertInternalAccess`:

`/api/escolas/[organizationId]/evidencias`

### List

`GET /api/escolas/[organizationId]/evidencias?courseSlug=incendio-escolas&lessonOrder=1`

Optional filters: `courseSlug`, `lessonOrder`, `documentKey`, `status`.

### Save/upsert

`POST /api/escolas/[organizationId]/evidencias`

```json
{
  "courseSlug": "incendio-escolas",
  "lessonOrder": 1,
  "documentKey": "incendio-mapa-papeis-governanca-v1",
  "title": "Mapa de Papéis e Governança Preventiva",
  "status": "draft",
  "content": {
    "preventionResponsible": "Coordenação operacional",
    "preventionEvidence": "Pasta interna restrita: Segurança > Incêndio > Evidências 2026",
    "preventionGaps": "Atualizar treinamento prático com responsável habilitado"
  },
  "metadata": {
    "source": "course-activity",
    "schemaVersion": 1
  }
}
```

The unique key is `organizationId + courseSlug + lessonOrder + documentKey`, so repeated saves update the same activity document.

## Compatibility notes

Do not remove the legacy specific models yet:

- `SchoolEmergencyRolesMap`
- `SchoolFireRiskWalkthrough`

They remain compatible with existing panels/flows. For new activities, prefer `SchoolCourseEvidenceDocument`. A later migration can backfill generic documents using these mappings:

- `SchoolEmergencyRolesMap` → canonical `documentKey: "incendio-mapa-papeis-governanca-v1"`, `lessonOrder: 1`
- `SchoolFireRiskWalkthrough` → canonical `documentKey: "incendio-caminhada-observacional-prevencao-v1"`, `lessonOrder: 2`

Current compatibility aliases to backfill/accept only during transition:

- `emergency-roles-map` → `incendio-mapa-papeis-governanca-v1`
- `fire-risk-walkthrough` → `incendio-caminhada-observacional-prevencao-v1`
- `inventario-documental` → `incendio-inventario-documental-sistemas-v1`

After panels read/write the generic endpoint, the legacy tables can be treated as historical compatibility tables or removed in a separate explicit migration.

## Remaining gaps before receiving highly sensitive evidence

- Replace admin-only access with organization/member roles and least privilege (e.g. owner, compliance manager, reviewer, read-only).
- Add course/document schemas per activity, including Proteção contra Violência Escolar-specific forms that prohibit real-case narratives by design.
- Add explicit UX states for sensitive courses before enabling their evidence forms.

## Dedicated sensitive evidence vault foundation

Highly sensitive materials — prints, audios, videos, PDFs or documents tied to real violence-school cases — must not be stored in `SchoolCourseEvidenceDocument.content`. A separate foundation now exists for metadata-only cataloging:

- `SchoolSensitiveEvidenceVaultItem`: organization-scoped vault record with `courseSlug`, optional `lessonOrder`, `documentKey`, title, internal `caseReference`, sensitivity classification, status, retention policy, `legalHold`, archive fields and safe metadata.
- `SchoolSensitiveEvidenceAttachment`: attachment metadata only — type, original filename, MIME type, byte size, optional private storage provider/object key and checksum. It does **not** store binary content or public URLs.
- `SchoolSensitiveEvidenceAuditEvent`: row-level audit events for listing and creation, with actor label and hashed IP/user-agent when available.

Internal API, protected with `assertInternalAccess`:

`/api/escolas/[organizationId]/evidencias-sensiveis`

### List sensitive vault records

`GET /api/escolas/[organizationId]/evidencias-sensiveis?courseSlug=violencia-escolar-protecao`

Every list call writes a `list_vault_items` audit event scoped to the organization.

### Create metadata-only vault record

`POST /api/escolas/[organizationId]/evidencias-sensiveis`

```json
{
  "courseSlug": "violencia-escolar-protecao",
  "lessonOrder": 4,
  "documentKey": "violencia-escolar-anexos-sensiveis",
  "title": "Registro sensível de proteção escolar",
  "caseReference": "caso-interno-2026-001",
  "sensitivity": "child_protection",
  "retentionPolicy": "legal-hold-until-released",
  "legalHold": true,
  "status": "stored_externally",
  "metadata": {
    "source": "school-dashboard-sensitive-vault"
  },
  "attachments": [
    {
      "type": "image",
      "originalFilename": "registro-001.jpg",
      "mimeType": "image/jpeg",
      "sizeBytes": 1048576,
      "storageProvider": "s3",
      "storageObjectKey": "org/example/vault/registro-001.jpg",
      "checksumSha256": "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    }
  ]
}
```

Validated attachment classes and size ceilings:

- images: png, jpg/jpeg, webp, heic up to 15 MB;
- audio: mp3, m4a, aac, wav, ogg, webm up to 50 MB;
- video: mp4, mov, webm, m4v up to 250 MB;
- PDF up to 30 MB;
- doc/docx/txt up to 15 MB.

Sensitivity classifications currently accepted: `restricted`, `highly_sensitive`, `child_protection`, `legal_hold`.

Retention policies currently accepted: `contract-plus-legal-obligation-review`, `school-defined-retention-review`, `legal-hold-until-released`, `archive-after-case-closure-review`.

## UI/UX for sensitive attachments

The school admin dashboard now shows a separate “cofre separado · evidências sensíveis” panel for Proteção contra Violência Escolar. The panel deliberately:

- warns that content must not include names of children/adolescents, full narratives, CPF, medical/legal documents or public links;
- accepts only metadata for one externally stored attachment at a time;
- defaults to `child_protection` + legal hold;
- explains that real files must be kept in private encrypted storage with signed access.

## Real secure storage recommendation before production use

Before enabling actual uploads for schools, implement a storage service that keeps binary content outside the application database:

1. Use private object storage (S3, Google Cloud Storage, Cloudflare R2 or equivalent) with buckets separated by environment and tenant path prefix.
2. Generate short-lived signed upload/download URLs server-side only after authorization.
3. Encrypt at rest with managed KMS keys; for the highest-risk school-protection cases, consider per-organization envelope encryption.
4. Store object keys and checksums in `SchoolSensitiveEvidenceAttachment`; never store public URLs or base64 payloads.
5. Enforce least privilege by organization/member role before replacing `assertInternalAccess`.
6. Add status transitions for archive/delete/export with legal-hold checks and audit event per action.
7. Define incident-response and data-subject boundaries with counsel before allowing deletion or export of child-protection evidence.

## Remaining gaps before receiving highly sensitive evidence in production

- Replace admin-only access with organization/member roles and least privilege.
- Add update/status-change/archive/delete endpoints that enforce retention and legal hold.
- Add private object-storage integration with signed URLs and encryption.
- Add per-action authorization policies and export boundaries.
- Add a formal retention schedule per school contract and legal basis.

## Local/dev private upload foundation implemented

The sensitive vault can now receive real files through protected API routes while keeping binary content outside Prisma/PostgreSQL.

### Storage behavior

- Default provider: `local-private`.
- Default path: `.private-storage/sensitive-evidence-vault/<organizationId>/<vaultItemId>/<uuid>-<safe-filename>`.
- Override for dev/staging: set `SENSITIVE_EVIDENCE_VAULT_DIR` to an absolute private directory outside `public/` and outside any static/CDN mount.
- `.private-storage/` is gitignored. Do not commit sensitive files.
- The application never stores public URLs for sensitive evidence. `storageObjectKey` is an internal key only.

### Upload a file into an existing vault record

`POST /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments`

Multipart form-data:

- `file`: binary file;
- `type`: `image`, `audio`, `video`, `pdf` or `other_document`;
- `metadata` optional JSON object with only simple values.

Server-side controls:

- admin/internal guard via `assertInternalAccess`;
- organization + vault item scoping;
- max 10 attachments per vault item;
- parent status must be `intake_pending`, `metadata_only` or `stored_externally`;
- extension + MIME + size validation by declared type;
- SHA-256 checksum persisted in `SchoolSensitiveEvidenceAttachment.checksumSha256`;
- generated private object key, never caller-provided;
- attachment lifecycle fields: `fileStatus`, `uploadedAt`, `lastAccessedAt`, `deletedAt`, `deletedBy`;
- `upload_attachment` audit event with hashed IP/user-agent when available.

### Download a file

`GET /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments/[attachmentId]`

The route checks authorization/scope, refuses deleted files, reads from private storage, verifies SHA-256 before returning bytes, sets `Cache-Control: no-store`, forces attachment download, and writes a `download_attachment` audit event.

### Delete a file by policy

`DELETE /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments/[attachmentId]`

The route blocks deletion while `legalHold` is active or the retention policy is `legal-hold-until-released`. When permitted, it removes the private local file, marks the row as `fileStatus: deleted_by_policy`, sets deletion metadata, and writes `delete_attachment_by_policy` audit.

### Cloudflare R2 / S3-compatible private storage

The storage implementation is now abstracted behind `src/lib/sensitiveEvidenceStorage.ts` and supports:

- `local-private` (default): private local dev/staging directory;
- `cloudflare-r2`: S3-compatible private Cloudflare R2 bucket using server-side signed `PUT`, `GET` and `DELETE` requests.

Set the provider only after the private bucket and R2 S3 credentials exist:

```bash
SENSITIVE_EVIDENCE_STORAGE_PROVIDER=cloudflare-r2
CLOUDFLARE_R2_ACCOUNT_ID=<account-id>
CLOUDFLARE_R2_ACCESS_KEY_ID=<r2-access-key-id>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<r2-secret-access-key>
CLOUDFLARE_R2_SENSITIVE_EVIDENCE_BUCKET=excellentia-sensitive-evidence-vault-prod
```

Implementation rules:

1. Configure a private bucket per environment; block all public access and disable public ACLs.
2. Prefix every key with tenant scope: `<organizationId>/<vaultItemId>/<uuid>-<safe-filename>`.
3. Rely on HTTPS in transit and Cloudflare R2 encryption at rest; for child-protection cases, evaluate additional per-organization envelope encryption.
4. For direct browser upload at scale, generate short-lived signed upload URLs only after the same authorization, type, extension and size checks; require checksum headers where supported.
5. For download, generate short-lived signed download URLs only after writing an audit event, or proxy bytes through the app when audit-before-disclosure is mandatory. Current code proxies through the authenticated API.
6. Persist only provider name, object key, checksum, byte size, MIME and lifecycle status; never persist signed URLs or public URLs.
7. Keep legal-hold checks server-side before delete/archive/export operations.
8. See `docs/sensitive-evidence-r2-vault.md` for Cloudflare setup status, required env vars, roles, retention, content policy and incident plan.
