import { cn } from '@/lib/utils';

type FooterProps = {
  className?: string;
};

const Footer = ({ className }: FooterProps) => {
  return (
    <footer className={cn('py-2 text-center', className)}>
      <small>©2024 forwards</small>
    </footer>
  );
};

export { Footer };
