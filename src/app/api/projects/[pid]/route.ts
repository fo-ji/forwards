import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ pid: string }> },
) {
  const { pid } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.project.findUnique({
    where: {
      id: pid,
    },
    include: {
      skills: true,
    },
  });

  return Response.json({ data });
}
