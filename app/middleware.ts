// // middleware.ts
// import { clerkMiddleware } from '@clerk/nextjs/server';

// export default clerkMiddleware();

// export const config = {
//   matcher: [
//     // protect everything except Next internals, static files, and auth pages
//     '/((?!_next|.*\\..*|sign-in|sign-up).*)',
//   ],
// };

// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return
  auth.protect()
})

export const config = {
  // protect everything except Next internals and files; public routes handled above
  matcher: ['/((?!_next|.*\\..*).*)'],
}

