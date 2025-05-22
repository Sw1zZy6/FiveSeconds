/*
  Warnings:

  - You are about to drop the column `name` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `quizTitle` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_userId_fkey";

-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "name",
ADD COLUMN     "quizTitle" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
