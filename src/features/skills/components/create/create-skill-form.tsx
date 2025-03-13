'use client';

import { useActionState } from 'react';

import { useRouter } from 'next/navigation';

import { useForm, getFormProps } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';

import { Field, FieldErrors } from '@/components/form/field';
import { FormInput } from '@/components/form/form-input';
import { FormMultiSelect } from '@/components/form/form-multi-select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { withCallbacks } from '@/lib/conform/with-callback';
import { SelectOptions } from '@/types';

import { createSkill } from '../../actions/create';
import { createSKillSchema } from '../../schemas/create';

type CreateSkillFormProps = {
  projectOptions?: SelectOptions;
};

export const CreateSkillForm = ({
  projectOptions = [],
}: CreateSkillFormProps) => {
  const router = useRouter();
  const [lastResult, action, isPending] = useActionState(
    withCallbacks(createSkill, {
      onError() {
        toast({
          variant: 'destructive',
          description: '気になるスキルを作成できませんでした',
        });
      },
      onSuccess() {
        toast({ description: '気になるスキルを作成しました' });
        router.back();
      },
    }),
    null,
  );
  const [form, fields] = useForm({
    id: 'create-skill',
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: createSKillSchema });
    },
    shouldValidate: 'onInput',
  });

  return (
    <form
      className="grid gap-4 px-1"
      {...getFormProps(form)}
      action={action}
      noValidate
    >
      <Field>
        <Label htmlFor={fields.name.id}>名称</Label>
        <FormInput meta={fields.name} type="text" />
        <FieldErrors errors={fields.name.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.url.id}>URL</Label>
        <FormInput meta={fields.url} type="text" />
        <FieldErrors errors={fields.url.errors} />
      </Field>
      <Field>
        <Label htmlFor={fields.projectIds.id}>プロジェクト</Label>
        <FormMultiSelect meta={fields.projectIds} options={projectOptions} />
        <FieldErrors errors={fields.projectIds.errors} />
      </Field>
      <Button
        type="submit"
        form="create-skill"
        disabled={isPending}
        className="w-full"
      >
        新規登録
      </Button>
    </form>
  );
};
