export const activePathVariant = (pathname: string, targetPath: string) =>
  pathname === targetPath ? 'default' : 'ghost';
