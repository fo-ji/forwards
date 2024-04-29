import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/providers/toaster';

import { Button } from './button';
import { Toast, ToastAction } from './toast';

import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'components/ui/toast',
  component: Toast,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

export const WithTitle: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <Button
        onClick={() => {
          toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem with your request.',
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
        }}
      >
        Show Toast
      </Button>
    );
  },
};
