import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export const authOptions = {
  session: { strategy: "jwt" },
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
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const admin = await Admin.findOne({ email: credentials.email.toLowerCase().trim() });
        if (!admin) return null;

        const valid = await bcrypt.compare(credentials.password, admin.passwordHash);
        if (!valid) return null;

        return { id: admin._id.toString(), email: admin.email, name: admin.name };
      }
    })
  ],
  callbacks: {
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
