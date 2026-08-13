import { cookies } from "next/headers";
import { encode } from "next-auth/jwt";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

function usesSecureCookies() {
  if (process.env.NEXTAUTH_URL) {
    return process.env.NEXTAUTH_URL.startsWith("https://");
  }

  return process.env.NODE_ENV === "production";
}

export function getSessionCookieName() {
  return `${usesSecureCookies() ? "__Secure-" : ""}next-auth.session-token`;
}

export async function createAdminSession(user) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not configured");
  }

  const secure = usesSecureCookies();
  const token = await encode({
    token: {
      name: user.name,
      email: user.email,
      sub: user.id,
      uid: user.id
    },
    secret,
    maxAge: SESSION_MAX_AGE
  });

  const cookieStore = await cookies();
  cookieStore.set(getSessionCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure,
    maxAge: SESSION_MAX_AGE
  });
}
