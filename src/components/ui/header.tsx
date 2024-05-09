import { Logo } from './logo';

const Header = () => {
  return (
    <header className="py-2 px-4 sm:px-6 flex gap-2 items-center">
      <Logo alt="" width={30} height={30} priority />
      <span className="text-xl font-bold">forwards</span>
    </header>
  );
};

export { Header };
