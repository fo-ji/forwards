export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!login|register|entry|_next/static|_next/image|favicon.ico))'],
};
