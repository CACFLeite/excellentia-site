-- Add local/private file lifecycle fields for the sensitive evidence vault.
-- Existing metadata-only rows remain valid; real uploads start as fileStatus='stored'.

ALTER TABLE "SchoolSensitiveEvidenceAttachment"
  ADD COLUMN "fileStatus" TEXT NOT NULL DEFAULT 'metadata_only',
  ADD COLUMN "uploadedAt" TIMESTAMP(3),
  ADD COLUMN "lastAccessedAt" TIMESTAMP(3),
  ADD COLUMN "deletedAt" TIMESTAMP(3),
  ADD COLUMN "deletedBy" TEXT;

CREATE INDEX "SchoolSensitiveEvidenceAttachment_organizationId_fileStatus_idx" ON "SchoolSensitiveEvidenceAttachment"("organizationId", "fileStatus");
