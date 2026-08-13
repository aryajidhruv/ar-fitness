import { cookies, headers } from "next/headers";
import { encode } from "next-auth/jwt";
import { getToken } from "next-auth/jwt";
import { authOptions } from "@/lib/authOptions";

const SESSION_MAX_AGE = 30 * 24 * 60 * 60;

function usesSecureCookies() {
  return (
    authOptions.useSecureCookies ??
    (process.env.NEXTAUTH_URL?.startsWith("https://") || process.env.NODE_ENV === "production")
  );
}

function getSessionCookieConfig() {
  const secure = usesSecureCookies();
  const prefix = secure ? "__Secure-" : "";

  return {
    name: `${prefix}next-auth.session-token`,
    options: {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure
    }
  };
}

export async function createAdminSession(user) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not configured");
  }

  const sessionCookie = getSessionCookieConfig();
  const defaultToken = {
    name: user.name,
    email: user.email,
    sub: user.id
  };

  const token = await authOptions.callbacks.jwt({
    token: defaultToken,
    user,
    account: {
      provider: "credentials",
      type: "credentials",
      providerAccountId: user.id
    },
    isNewUser: false,
    trigger: "signIn"
  });

  const value = await encode({
    token,
    secret,
    maxAge: SESSION_MAX_AGE
  });

  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, value, {
    ...sessionCookie.options,
    maxAge: SESSION_MAX_AGE
  });
}

export async function getAdminSession() {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) return null;

  const sessionCookie = getSessionCookieConfig();
  const cookieStore = await cookies();
  const headerStore = await headers();

  return getToken({
    req: {
      cookies: Object.fromEntries(cookieStore.getAll().map((c) => [c.name, c.value])),
      headers: Object.fromEntries(headerStore.entries())
    },
    secret,
    secureCookie: usesSecureCookies(),
    cookieName: sessionCookie.name
  });
}

export async function clearAdminSession() {
  const sessionCookie = getSessionCookieConfig();
  const cookieStore = await cookies();
  cookieStore.set(sessionCookie.name, "", {
    ...sessionCookie.options,
    maxAge: 0
  });
}

export function getSessionCookieName() {
  return getSessionCookieConfig().name;
}
