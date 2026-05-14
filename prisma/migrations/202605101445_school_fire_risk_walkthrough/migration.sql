-- CreateTable
CREATE TABLE "SchoolFireRiskWalkthrough" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL DEFAULT 'incendio-escolas',
    "lessonOrder" INTEGER NOT NULL DEFAULT 2,
    "areasVisited" TEXT,
    "findingsLog" TEXT,
    "simpleCorrectionsPlan" TEXT,
    "technicalReferrals" TEXT,
    "suspendedAreas" TEXT,
    "photoEvidenceNotes" TEXT,
    "reviewResponsible" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolFireRiskWalkthrough_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SchoolFireRiskWalkthrough_organizationId_courseSlug_lessonOrder_key" ON "SchoolFireRiskWalkthrough"("organizationId", "courseSlug", "lessonOrder");

-- CreateIndex
CREATE INDEX "SchoolFireRiskWalkthrough_organizationId_idx" ON "SchoolFireRiskWalkthrough"("organizationId");

-- AddForeignKey
ALTER TABLE "SchoolFireRiskWalkthrough" ADD CONSTRAINT "SchoolFireRiskWalkthrough_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
