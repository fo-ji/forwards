import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(_: Request, { params }: { params: { pid: string } }) {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.project.findUnique({
    where: {
      id: params.pid,
    },
    include: {
      skills: true,
    },
  });

  return Response.json({ data });
}
