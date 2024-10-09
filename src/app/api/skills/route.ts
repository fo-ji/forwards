import { searchParamsSkillsListSchema } from '@/features/skills';
import { auth } from '@/lib/next-auth/auth';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  const session = await auth();
  if (!session || !session.user) {
    return new Response(null, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const { page, pageSize, orderBy, sortDirection, name } =
    searchParamsSkillsListSchema.parse({
      page: searchParams.get('page'),
      pageSize: searchParams.get('pageSize'),
      orderBy: searchParams.get('orderBy'),
      sortDirection: searchParams.get('sortDirection'),
      name: searchParams.get('name') ?? undefined,
    });

  const data = await prisma.skill.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
    where: {
      userId: session.user.id,
      name: {
        contains: name,
      },
    },
    orderBy: {
      [orderBy]: sortDirection,
    },
    include: {
      projects: {
        orderBy: {
          updatedAt: 'desc',
        },
      },
    },
  });

  return Response.json({ data });
}
