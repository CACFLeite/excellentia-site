CREATE TABLE IF NOT EXISTS "DataSubjectRequest" (
  "id" TEXT NOT NULL,
  "organizationId" TEXT,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "cpf" TEXT,
  "requestType" TEXT NOT NULL,
  "details" TEXT,
  "status" TEXT NOT NULL DEFAULT 'pending_verification',
  "verificationTokenHash" TEXT NOT NULL,
  "verificationExpiresAt" TIMESTAMP(3) NOT NULL,
  "verifiedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  "deliveryEmail" TEXT,
  "exportData" JSONB,
  "auditLog" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "DataSubjectRequest_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "DataSubjectRequest_verificationTokenHash_key" ON "DataSubjectRequest"("verificationTokenHash");
CREATE INDEX IF NOT EXISTS "DataSubjectRequest_email_status_idx" ON "DataSubjectRequest"("email", "status");
CREATE INDEX IF NOT EXISTS "DataSubjectRequest_createdAt_idx" ON "DataSubjectRequest"("createdAt");

DO $$ BEGIN
  ALTER TABLE "DataSubjectRequest" ADD CONSTRAINT "DataSubjectRequest_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS "PrivacyPolicyVersion" (
  "id" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL,
  "policyUrl" TEXT NOT NULL,
  "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "notificationLog" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "PrivacyPolicyVersion_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PrivacyPolicyVersion_version_key" ON "PrivacyPolicyVersion"("version");

CREATE TABLE IF NOT EXISTS "PrivacyPolicyNotification" (
  "id" TEXT NOT NULL,
  "versionId" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "status" TEXT NOT NULL DEFAULT 'pending',
  "provider" TEXT,
  "error" TEXT,
  "sentAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PrivacyPolicyNotification_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "PrivacyPolicyNotification_versionId_email_key" ON "PrivacyPolicyNotification"("versionId", "email");
CREATE INDEX IF NOT EXISTS "PrivacyPolicyNotification_email_status_idx" ON "PrivacyPolicyNotification"("email", "status");

DO $$ BEGIN
  ALTER TABLE "PrivacyPolicyNotification" ADD CONSTRAINT "PrivacyPolicyNotification_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "PrivacyPolicyVersion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
