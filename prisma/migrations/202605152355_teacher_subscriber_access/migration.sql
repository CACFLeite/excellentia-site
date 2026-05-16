-- CreateEnum
CREATE TYPE "TeacherSubscriberStatus" AS ENUM ('pending', 'active', 'past_due', 'canceled', 'blocked');

-- CreateTable
CREATE TABLE "TeacherSubscriber" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "status" "TeacherSubscriberStatus" NOT NULL DEFAULT 'pending',
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "currentPeriodEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherSession" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherLoginToken" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT,
    "email" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherLoginToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeacherCourseAccess" (
    "id" TEXT NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "grantedBy" TEXT NOT NULL DEFAULT 'subscription',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TeacherCourseAccess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubscriber_email_key" ON "TeacherSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubscriber_stripeCustomerId_key" ON "TeacherSubscriber"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSubscriber_stripeSubscriptionId_key" ON "TeacherSubscriber"("stripeSubscriptionId");

-- CreateIndex
CREATE INDEX "TeacherSubscriber_status_idx" ON "TeacherSubscriber"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherSession_tokenHash_key" ON "TeacherSession"("tokenHash");

-- CreateIndex
CREATE INDEX "TeacherSession_subscriberId_idx" ON "TeacherSession"("subscriberId");

-- CreateIndex
CREATE INDEX "TeacherSession_expiresAt_idx" ON "TeacherSession"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherLoginToken_tokenHash_key" ON "TeacherLoginToken"("tokenHash");

-- CreateIndex
CREATE INDEX "TeacherLoginToken_email_idx" ON "TeacherLoginToken"("email");

-- CreateIndex
CREATE INDEX "TeacherLoginToken_subscriberId_idx" ON "TeacherLoginToken"("subscriberId");

-- CreateIndex
CREATE INDEX "TeacherLoginToken_expiresAt_idx" ON "TeacherLoginToken"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherCourseAccess_subscriberId_courseId_key" ON "TeacherCourseAccess"("subscriberId", "courseId");

-- CreateIndex
CREATE INDEX "TeacherCourseAccess_subscriberId_idx" ON "TeacherCourseAccess"("subscriberId");

-- CreateIndex
CREATE INDEX "TeacherCourseAccess_courseId_idx" ON "TeacherCourseAccess"("courseId");

-- AddForeignKey
ALTER TABLE "TeacherSession" ADD CONSTRAINT "TeacherSession_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "TeacherSubscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherLoginToken" ADD CONSTRAINT "TeacherLoginToken_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "TeacherSubscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCourseAccess" ADD CONSTRAINT "TeacherCourseAccess_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "TeacherSubscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeacherCourseAccess" ADD CONSTRAINT "TeacherCourseAccess_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
