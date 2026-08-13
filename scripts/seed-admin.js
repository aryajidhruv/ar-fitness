/**
 * Creates (or updates the password of) the single admin user Ajit logs in with.
 * Run once after setting MONGODB_URI, ADMIN_EMAIL and ADMIN_PASSWORD in .env.local:
 *
 *   npm run seed:admin
 */
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("Missing MONGODB_URI, ADMIN_EMAIL or ADMIN_PASSWORD in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const AdminSchema = new mongoose.Schema({
    email: String,
    passwordHash: String,
    name: String
  });
  const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);
  const email = ADMIN_EMAIL.toLowerCase().trim();

  const result = await Admin.findOneAndUpdate(
    { email },
    { email, passwordHash, name: "Ajit Singh" },
    { upsert: true, new: true }
  );

  console.log(`Admin ready: ${result.email}`);
  console.log("You can now log in at /admin/login with this email and the password from .env.local");
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
