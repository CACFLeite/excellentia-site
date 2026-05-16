CREATE TABLE "CampaignLead" (
    "id" TEXT NOT NULL,
    "campaign" TEXT NOT NULL,
    "source" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "role" TEXT,
    "priority" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CampaignLead_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "CampaignLead_campaign_createdAt_idx" ON "CampaignLead"("campaign", "createdAt");
CREATE INDEX "CampaignLead_email_idx" ON "CampaignLead"("email");
CREATE INDEX "CampaignLead_status_createdAt_idx" ON "CampaignLead"("status", "createdAt");
