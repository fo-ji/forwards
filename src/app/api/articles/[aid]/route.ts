import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { aid: string } }) {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.article.findUnique({
    where: {
      id: params.aid,
    },
  });

  return Response.json({ data });
}
