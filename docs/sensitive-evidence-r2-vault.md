# Cloudflare R2 private vault for sensitive school evidence

Status on 2026-05-10: application code supports a `cloudflare-r2` storage provider. Local verification found R2/S3 credential variables present in the private operator env file, and the latest operator note records a successful private R2 PUT/GET/DELETE healthcheck against `excellentia-sensitive-evidence-vault-prod`, with the test object deleted. Do not treat this as production enablement: production still requires deployment secrets, migrated schema, organization-scoped authorization, contracts/DPA, retention schedule and operational runbooks before real school evidence is accepted.

## Target bucket

Recommended production bucket name:

`excellentia-sensitive-evidence-vault-prod`

Rules:

- private bucket only; no public bucket, public custom domain, public ACL, static website, or CDN exposure;
- encryption at rest by Cloudflare R2 plus HTTPS/TLS in transit;
- object keys must be internal only and prefixed by tenant and vault item: `<organizationId>/<vaultItemId>/<uuid>-<safe-filename>`;
- no object key may include personal names, CPF, case narratives, child/adolescent names, or school incident facts;
- do not store signed URLs or public URLs in Prisma; store only provider, object key, checksum, MIME, size and lifecycle fields;
- downloads remain through authenticated/audited API endpoints unless a later endpoint issues short-lived signed URLs after recording audit.

## Required environment variables

Use Vercel/production secrets, never committed files:

```bash
SENSITIVE_EVIDENCE_STORAGE_PROVIDER=cloudflare-r2
CLOUDFLARE_R2_ACCOUNT_ID=<cloudflare account id> # may equal CLOUDFLARE_ACCOUNT_ID
CLOUDFLARE_R2_ACCESS_KEY_ID=<r2 s3 access key id>
CLOUDFLARE_R2_SECRET_ACCESS_KEY=<r2 s3 secret access key>
CLOUDFLARE_R2_SENSITIVE_EVIDENCE_BUCKET=excellentia-sensitive-evidence-vault-prod
# accepted alias used by current operator env, if the specific variable above is not set:
CLOUDFLARE_R2_BUCKET=excellentia-sensitive-evidence-vault-prod
# optional override; default is https://<accountId>.r2.cloudflarestorage.com
CLOUDFLARE_R2_ENDPOINT=https://<accountId>.r2.cloudflarestorage.com
```

Important: the Cloudflare REST API token that can manage zones/accounts is not enough for S3-compatible object operations. R2 needs a separate R2/S3 access key pair with narrow bucket permissions.

## Minimum Cloudflare setup still needed

1. Reconfirm the production bucket name/environment before deploy and keep it private.
2. Use an R2/S3 access key scoped only to that bucket with object read/write/delete needed by the app.
3. Do not enable public access or public CORS by default. If direct browser upload is added later, configure CORS only for the exact Excellentia origin and only the required methods/headers.
4. Keep bucket lifecycle/retention conservative until counsel validates school-specific retention.
5. Enable/route Cloudflare audit logs where available and reconcile them with application audit rows.
6. Put the provider and R2 variables into production deployment secrets; never rely on local operator env files for production.

## Application behavior

`src/lib/sensitiveEvidenceStorage.ts` selects storage by `SENSITIVE_EVIDENCE_STORAGE_PROVIDER`:

- unset or any value other than `cloudflare-r2`/`r2`: local private dev storage under `.private-storage/sensitive-evidence-vault`;
- `cloudflare-r2`: S3-compatible R2 `PUT`, `GET` and `DELETE` using AWS Signature V4 via built-in Node crypto/fetch, with no extra SDK dependency.

Existing protected routes keep the same database/API contract:

- upload: `POST /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments`;
- download/proxy: `GET /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments/[attachmentId]`;
- policy delete: `DELETE /api/escolas/[organizationId]/evidencias-sensiveis/[vaultItemId]/attachments/[attachmentId]`.

Each successful create/list/upload/download/delete action writes an application audit row. Unauthorized admin attempts on these sensitive routes now attempt to write `denied_*` audit events scoped to the route organization.

## Roles and access model

Production must replace the current internal admin gate with organization-scoped least privilege before school use:

- `owner`: contract owner; can view audit exports and approve retention/legal-hold policy changes;
- `admin`: manages school users but should not automatically see highly sensitive evidence;
- `compliance_manager`: can create records and upload/download evidence for assigned cases;
- `legal_reviewer`: can review/export under legal basis and legal hold rules;
- `pedagogical_manager`: can see metadata/status needed for course follow-up, not raw files by default;
- `viewer`: no raw sensitive file access.

Recommended rule: raw file download requires `owner`, `compliance_manager` or `legal_reviewer` plus same `organizationId`, explicit purpose, and audit-before-disclosure.

## Retention, deletion and legal hold

Accepted policy keys in code today:

- `contract-plus-legal-obligation-review`;
- `school-defined-retention-review`;
- `legal-hold-until-released`;
- `archive-after-case-closure-review`.

Deletion is blocked when `legalHold=true` or retention policy is `legal-hold-until-released`. A real production schedule must be attached to the school contract/DPA and validated legally before receiving child-protection or violence-school evidence.

## Content policy for schools

Allowed only when necessary for a documented school case or legal/compliance obligation:

- prints/screenshots;
- audio/video relevant to a school safety or protection record;
- PDFs or documents linked to internal handling, referrals or formal obligations.

Prohibited in uploads unless a legal reviewer explicitly authorizes and the contract/DPA covers it:

- unnecessary copies of IDs, CPF, full medical records, health diagnoses, intimate images, unrelated family data, or broad device dumps;
- public/social-media reposts when a restricted screenshot or link reference is sufficient;
- files unrelated to a school duty, training evidence, protection protocol or documented case;
- filenames or metadata exposing child/adolescent names or full narratives.

## Incident/leak response baseline

If exposure, mistaken access, leaked URL, lost credential, or suspicious download is suspected:

1. revoke/rotate R2 access keys and admin sessions;
2. block affected downloads and preserve audit logs;
3. identify organizations, object keys, actors, timestamps and IP/user-agent hashes;
4. notify Caio/internal responsible and legal/privacy counsel;
5. determine school controller notification duties and ANPD/data-subject duties under LGPD;
6. document containment, impact, notifications, and corrective actions before reopening access.

## Contractual/data protection position

Default operating assumption: the school/organization is controller of case evidence and Excellentia is operator/platform for storage, audit and workflow, unless a later legal design says otherwise. Contracts/DPA must state purpose, access roles, retention, deletion, incident notification, subprocessors/cloud provider, international transfer/storage implications, and legal-hold handling.
