"use server";

import { createAdminSession } from "@/lib/adminSession";
import { validateAdminCredentials } from "@/lib/adminAuth";

export async function loginAdmin(email, password) {
  try {
    const user = await validateAdminCredentials(email, password);
    if (!user) {
      return { ok: false, error: "Wrong email or password." };
    }

    await createAdminSession(user);
    return { ok: true };
  } catch (err) {
    console.error("Admin login failed:", err);
    return { ok: false, error: "Could not sign in. Check server auth settings." };
  }
}
