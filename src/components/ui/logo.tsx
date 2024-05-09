import logo from '../../../public/logo.svg';
import Image, { type ImageProps } from 'next/image';

const Logo = ({ ...props }: Omit<ImageProps, 'src'>) => {
  return <Image {...props} src={logo} />;
};

export { Logo };
