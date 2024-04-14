import { icons, LucideProps } from 'lucide-react';

type IconProps = {
  name?: keyof typeof icons;
} & LucideProps;

const Icon = ({ name = 'Home', ...props }: IconProps) => {
  const Icon = icons[name];

  return <Icon {...props} />;
};

export { Icon };
