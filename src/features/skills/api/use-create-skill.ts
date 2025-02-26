import { useRouter } from 'next/navigation';

import { toast } from '@/hooks/use-toast';

import { createSkill } from '../actions/create';

export const useCreateSkill = () => {
  const router = useRouter();
  // ! Server Actionsの関数をラップし、useActionStateに合った関数を作って呼び出す
  const trigger = async (_prevState: object, formData: FormData) => {
    const res = await createSkill(_prevState, formData);
    if (res.status === 'error') {
      toast({
        variant: 'destructive',
        description: '気になるスキルを作成できませんでした',
      });
    } else {
      toast({ description: '気になるスキルを作成しました' });
      router.back();
    }
    return {};
  };

  return { trigger };
};
