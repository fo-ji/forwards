import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const skills = await prisma.skill.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  const data = skills.map((skill) => ({ label: skill.name, value: skill.id }));

  return Response.json({ data });
}
