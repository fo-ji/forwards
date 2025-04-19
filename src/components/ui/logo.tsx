import Image, { type ImageProps } from 'next/image';

import logo from '../../../public/logo.svg';

const Logo = ({ ...props }: Omit<ImageProps, 'src'>) => {
  return <Image {...props} src={logo} alt={props.alt} />;
};

export { Logo };
