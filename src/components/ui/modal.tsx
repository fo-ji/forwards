'use client';

import { type ElementRef, useEffect, useRef, type ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { createPortal } from 'react-dom';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Icon } from './icon';

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  const onDismiss = () => {
    router.back();
  };

  return createPortal(
    <dialog
      ref={dialogRef}
      className="relative flex max-h-[500px] w-4/5 max-w-lg flex-col items-center gap-2 rounded-lg border border-border bg-background p-5 backdrop:bg-black/60"
      onClose={onDismiss}
    >
      <div className="w-full">{children}</div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2.5 top-2.5 rounded-full"
        onClick={onDismiss}
      >
        <Icon name="X" />
      </Button>
    </dialog>,
    document.getElementById('modal-root')!,
  );
};

const ModalTitle = ({ title }: { title: string }) => {
  return (
    <div className="mb-8">
      <h1 className="text-xl">{title}</h1>
    </div>
  );
};

const ModalDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)}>{children}</p>
  );
};

export { Modal, ModalTitle, ModalDescription };
