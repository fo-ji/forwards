-- CreateTable
CREATE TABLE "Code" (
    "id" TEXT NOT NULL,
    "skillId" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "block" VARCHAR(2000) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
