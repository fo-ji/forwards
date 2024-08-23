import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { cid: string } }) {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.code.findUnique({
    where: {
      id: params.cid,
    },
  });

  return Response.json({ data });
}
