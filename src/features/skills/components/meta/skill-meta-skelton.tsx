import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const SkillMetaSkelton = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-[120px]" />
        <Skeleton className="h-4 w-[240px]" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-6 w-[120px]" />
        </div>
        <div className="flex justify-end pb-4">
          <Skeleton className="h-10 w-[180px]" />
        </div>
        <div className="space-y-6">
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-5 w-[240px]" />
          </div>
          <div className="mb-4 flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-5 w-[240px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="size-2 rounded-full" />
            <Skeleton className="h-5 w-[240px]" />
          </div>
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
