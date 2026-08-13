import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import Admin from "@/models/Admin";

export async function validateAdminCredentials(email, password) {
  if (!email?.trim() || !password) return null;

  await connectDB();
  const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
  if (!admin) return null;

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return null;

  return {
    id: admin._id.toString(),
    email: admin.email,
    name: admin.name
  };
}
