import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const data = await prisma.skill.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return Response.json({ data });
}
