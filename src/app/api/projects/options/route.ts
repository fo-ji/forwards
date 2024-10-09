import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const projects = await prisma.project.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const data = projects.map((project) => ({
    label: project.name,
    value: project.id,
  }));

  return Response.json({ data });
}
