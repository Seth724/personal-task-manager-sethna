// middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // protect everything except Next internals, static files, and auth pages
    '/((?!_next|.*\\..*|sign-in|sign-up).*)',
  ],
};
