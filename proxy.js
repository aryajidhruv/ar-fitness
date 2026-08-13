export { default as proxy } from "next-auth/middleware";

export const config = {
  // Protect every /admin route except /admin/login itself.
  // NextAuth's default middleware redirects unauthenticated users to
  // the pages.signIn path configured in lib/authOptions.js.
  matcher: ["/admin/((?!login).*)"]
};
