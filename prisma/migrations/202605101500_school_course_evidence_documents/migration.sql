-- Generic evidence/document layer for Excellentia school-course activities.
-- Covers current and future course artifacts: inventories, checklists, flows,
-- maps, records, plans, referrals and other evidence documents.

CREATE TYPE "SchoolCourseEvidenceDocumentStatus" AS ENUM ('draft', 'submitted', 'reviewed', 'approved', 'archived');

CREATE TABLE "SchoolCourseEvidenceDocument" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL,
    "lessonOrder" INTEGER NOT NULL,
    "documentKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "SchoolCourseEvidenceDocumentStatus" NOT NULL DEFAULT 'draft',
    "content" JSONB NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolCourseEvidenceDocument_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "SchoolCourseEvidenceDocument_unique_doc_key" ON "SchoolCourseEvidenceDocument"("organizationId", "courseSlug", "lessonOrder", "documentKey");

CREATE INDEX "SchoolCourseEvidenceDocument_lesson_lookup_idx" ON "SchoolCourseEvidenceDocument"("organizationId", "courseSlug", "lessonOrder");

CREATE INDEX "SchoolCourseEvidenceDocument_org_status_idx" ON "SchoolCourseEvidenceDocument"("organizationId", "status");

ALTER TABLE "SchoolCourseEvidenceDocument" ADD CONSTRAINT "SchoolCourseEvidenceDocument_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
