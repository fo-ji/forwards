import { env } from '@/env.mjs';
// Utils
export const IS_BROWSER = typeof window !== 'undefined';
export const IS_PRODUCTION = env.NODE_ENV === 'production';
export const IS_DEVELOPMENT = env.NODE_ENV === 'development';
