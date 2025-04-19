import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ sid: string }> },
) {
  const { sid } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.skill.findUnique({
    where: {
      id: sid,
      userId: session.user.id,
    },
    include: {
      articles: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
      codes: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
      projects: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
  });

  return Response.json({ data });
}
