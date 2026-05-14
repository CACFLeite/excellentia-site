-- CreateTable
CREATE TABLE "SchoolEmergencyRolesMap" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "courseSlug" TEXT NOT NULL DEFAULT 'incendio-escolas',
    "lessonOrder" INTEGER NOT NULL DEFAULT 1,
    "preventionResponsible" TEXT,
    "preventionSubstitute" TEXT,
    "preventionEvidence" TEXT,
    "preventionGaps" TEXT,
    "alertResponsible" TEXT,
    "alertSubstitute" TEXT,
    "alertEvidence" TEXT,
    "alertGaps" TEXT,
    "evacuationResponsible" TEXT,
    "evacuationSubstitute" TEXT,
    "evacuationEvidence" TEXT,
    "evacuationGaps" TEXT,
    "communicationResponsible" TEXT,
    "communicationSubstitute" TEXT,
    "communicationEvidence" TEXT,
    "communicationGaps" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SchoolEmergencyRolesMap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchoolEmergencyRolesMap_organizationId_idx" ON "SchoolEmergencyRolesMap"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "SchoolEmergencyRolesMap_organizationId_courseSlug_lessonOrder_key" ON "SchoolEmergencyRolesMap"("organizationId", "courseSlug", "lessonOrder");

-- AddForeignKey
ALTER TABLE "SchoolEmergencyRolesMap" ADD CONSTRAINT "SchoolEmergencyRolesMap_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
