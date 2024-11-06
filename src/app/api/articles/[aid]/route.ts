import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ aid: string }> },
) {
  const { aid } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.article.findUnique({
    where: {
      id: aid,
    },
  });

  return Response.json({ data });
}
