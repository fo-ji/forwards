import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkillMetaSkelton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-[120px]" />
        <Skeleton className="h-4 w-[240px]" />
      </CardHeader>
      <CardContent className="mt-3 grid gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-[50px] rounded-2xl" />
          <Skeleton className="h-5 w-[50px] rounded-2xl" />
        </div>
        <Skeleton className="w-full border-b" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-6 w-[60px]" />
        </div>
        <Skeleton className="w-full border-b" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-6 w-[60px]" />
        </div>
        <Skeleton className="w-full border-b" />
      </CardContent>
    </Card>
  );
};
