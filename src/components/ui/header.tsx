import { Logo } from './logo';

const Header = () => {
  return (
    <header className="flex items-center gap-2 px-4 py-2 sm:px-6">
      <Logo alt="" width={30} height={30} priority />
      <span className="text-xl font-bold">forwards</span>
    </header>
  );
};

export { Header };
