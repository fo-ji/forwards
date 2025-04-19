import { searchParamsSkillsCountSchema } from '@/features/skills';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const { name } = searchParamsSkillsCountSchema.parse({
    name: searchParams.get('name') ?? undefined,
  });

  const data = await prisma.skill.count({
    where: {
      userId: session.user.id,
      name: {
        contains: name,
      },
    },
  });

  return Response.json({ data });
}
