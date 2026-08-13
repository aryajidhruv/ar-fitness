import { withAuth } from "next-auth/middleware";

const useSecureCookies =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? process.env.NODE_ENV === "production";

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
  useSecureCookies,
  pages: {
    signIn: "/admin/login"
  }
});

export const config = {
  matcher: ["/admin/((?!login).*)"]
};
