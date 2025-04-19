/*
  Warnings:

  - You are about to alter the column `name` on the `Skill` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `url` on the `Skill` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - A unique constraint covering the columns `[userId,name]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Skill" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "url" SET DATA TYPE VARCHAR(2000);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_userId_name_key" ON "Skill"("userId", "name");
