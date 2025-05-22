/*
  Warnings:

  - You are about to drop the column `quizTitle` on the `Quiz` table. All the data in the column will be lost.
  - Added the required column `title` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "quizTitle",
ADD COLUMN     "title" TEXT NOT NULL;
