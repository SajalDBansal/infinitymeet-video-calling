/*
  Warnings:

  - The primary key for the `MeetingParticipant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `MeetingParticipant` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Meeting" ALTER COLUMN "duration" DROP NOT NULL;

-- AlterTable
ALTER TABLE "MeetingParticipant" DROP CONSTRAINT "MeetingParticipant_pkey",
ADD COLUMN     "email" TEXT,
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ADD CONSTRAINT "MeetingParticipant_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "MeetingParticipant_email_idx" ON "MeetingParticipant"("email");
