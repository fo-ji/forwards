import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resetDB = async (
  modelNames: Prisma.ModelName[],
): Promise<void> => {
  await Promise.all(
    modelNames.map(async (modelName) => {
      try {
        await prisma.$executeRawUnsafe(
          `TRUNCATE TABLE "public"."${modelName}" RESTART IDENTITY CASCADE;`,
        );
      } catch (error) {
        console.log({ error });
      }
    }),
  );
};
