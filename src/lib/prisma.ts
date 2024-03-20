import { PrismaClient } from '@prisma/client';

import { IS_PRODUCTION } from '@/config/constants';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>; // eslint-disable-line no-var
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (!IS_PRODUCTION) globalThis.prismaGlobal = prisma;
