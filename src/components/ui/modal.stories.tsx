import { useState } from 'react';

import { Button } from './button';
import { Modal } from './modal';

import type { Meta, StoryObj } from '@storybook/react';


const meta = {
  title: 'components/ui/modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    children: 'Modal Content',
  },
  render: ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open</Button>
        {open && (
          <Modal>
            <div className="flex flex-col gap-4">
              <div>{children}</div>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};
