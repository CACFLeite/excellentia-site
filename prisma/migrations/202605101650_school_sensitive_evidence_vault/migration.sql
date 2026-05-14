-- Dedicated metadata-only vault for sensitive school course evidence.
-- It intentionally stores attachment metadata and storage references only; binary content must stay in private object storage.

CREATE TYPE "SensitiveEvidenceVaultStatus" AS ENUM ('intake_pending', 'metadata_only', 'stored_externally', 'archived', 'deleted_by_policy');
CREATE TYPE "SensitiveEvidenceAttachmentType" AS ENUM ('image', 'audio', 'video', 'pdf', 'other_document');

CREATE TABLE "SchoolSensitiveEvidenceVaultItem" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "courseSlug" TEXT NOT NULL,
  "lessonOrder" INTEGER,
  "documentKey" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "caseReference" TEXT,
  "sensitivity" TEXT NOT NULL DEFAULT 'restricted',
  "status" "SensitiveEvidenceVaultStatus" NOT NULL DEFAULT 'metadata_only',
  "retentionPolicy" TEXT NOT NULL DEFAULT 'contract-plus-legal-obligation-review',
  "legalHold" BOOLEAN NOT NULL DEFAULT false,
  "archivedAt" TIMESTAMP(3),
  "archiveReason" TEXT,
  "metadata" JSONB,
  "createdBy" TEXT,
  "updatedBy" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "SchoolSensitiveEvidenceVaultItem_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SchoolSensitiveEvidenceAttachment" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "vaultItemId" TEXT NOT NULL,
  "type" "SensitiveEvidenceAttachmentType" NOT NULL,
  "originalFilename" TEXT NOT NULL,
  "mimeType" TEXT NOT NULL,
  "sizeBytes" INTEGER NOT NULL,
  "storageProvider" TEXT,
  "storageObjectKey" TEXT,
  "checksumSha256" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "SchoolSensitiveEvidenceAttachment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SchoolSensitiveEvidenceAuditEvent" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT NOT NULL,
  "vaultItemId" TEXT,
  "action" TEXT NOT NULL,
  "actor" TEXT NOT NULL,
  "actorRole" TEXT,
  "ipHash" TEXT,
  "userAgentHash" TEXT,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "SchoolSensitiveEvidenceAuditEvent_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "SchoolSensitiveEvidenceVaultItem_organizationId_courseSlug_documentKey_idx" ON "SchoolSensitiveEvidenceVaultItem"("organizationId", "courseSlug", "documentKey");
CREATE INDEX "SchoolSensitiveEvidenceVaultItem_organizationId_status_idx" ON "SchoolSensitiveEvidenceVaultItem"("organizationId", "status");
CREATE INDEX "SchoolSensitiveEvidenceVaultItem_organizationId_sensitivity_idx" ON "SchoolSensitiveEvidenceVaultItem"("organizationId", "sensitivity");
CREATE INDEX "SchoolSensitiveEvidenceVaultItem_organizationId_legalHold_idx" ON "SchoolSensitiveEvidenceVaultItem"("organizationId", "legalHold");
CREATE INDEX "SchoolSensitiveEvidenceAttachment_organizationId_vaultItemId_idx" ON "SchoolSensitiveEvidenceAttachment"("organizationId", "vaultItemId");
CREATE INDEX "SchoolSensitiveEvidenceAttachment_organizationId_type_idx" ON "SchoolSensitiveEvidenceAttachment"("organizationId", "type");
CREATE INDEX "SchoolSensitiveEvidenceAuditEvent_organizationId_createdAt_idx" ON "SchoolSensitiveEvidenceAuditEvent"("organizationId", "createdAt");
CREATE INDEX "SchoolSensitiveEvidenceAuditEvent_organizationId_action_idx" ON "SchoolSensitiveEvidenceAuditEvent"("organizationId", "action");
CREATE INDEX "SchoolSensitiveEvidenceAuditEvent_vaultItemId_createdAt_idx" ON "SchoolSensitiveEvidenceAuditEvent"("vaultItemId", "createdAt");

ALTER TABLE "SchoolSensitiveEvidenceVaultItem" ADD CONSTRAINT "SchoolSensitiveEvidenceVaultItem_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSensitiveEvidenceAttachment" ADD CONSTRAINT "SchoolSensitiveEvidenceAttachment_vaultItemId_fkey" FOREIGN KEY ("vaultItemId") REFERENCES "SchoolSensitiveEvidenceVaultItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSensitiveEvidenceAuditEvent" ADD CONSTRAINT "SchoolSensitiveEvidenceAuditEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SchoolSensitiveEvidenceAuditEvent" ADD CONSTRAINT "SchoolSensitiveEvidenceAuditEvent_vaultItemId_fkey" FOREIGN KEY ("vaultItemId") REFERENCES "SchoolSensitiveEvidenceVaultItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
