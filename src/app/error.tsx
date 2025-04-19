'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/ui/footer';
import { Icon } from '@/components/ui/icon';

export default function RootError({
  _,
  reset,
}: {
  _: Error & { digest?: string };
  reset: () => void;
}) {
  // todo サイトロゴを入れたい

  return (
    <div className="relative flex h-dvh items-center justify-center">
      <Card className="sm:p-6">
        <CardContent className="mx-auto grid max-w-sm justify-center gap-4 pt-6 sm:pt-0">
          <div className="mx-auto">
            <Icon name="TriangleAlert" size={48} />
          </div>
          <h1 className="text-xl">システムエラーが発生しました</h1>
          <Button variant="link" onClick={() => reset()}>
            ページ再読み込み
          </Button>
        </CardContent>
      </Card>
      <Footer className="absolute bottom-0" />
    </div>
  );
}
