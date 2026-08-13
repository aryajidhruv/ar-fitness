import CredentialsProvider from "next-auth/providers/credentials";
import { validateAdminCredentials } from "@/lib/adminAuth";

const useSecureCookies =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? process.env.NODE_ENV === "production";

export const authOptions = {
  session: { strategy: "jwt" },
  useSecureCookies,
  pages: {
    signIn: "/admin/login"
  },
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        return validateAdminCredentials(credentials?.email, credentials?.password);
      }
    })
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/admin`;
    },
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.uid;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
