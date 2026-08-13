/**
 * Updates WhatsApp and phone in the settings singleton.
 * Run: node scripts/update-contact.js
 */
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function main() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    console.error("Missing MONGODB_URI in .env.local");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);

  const SettingsSchema = new mongoose.Schema(
    {
      _id: { type: String, default: "singleton" },
      whatsappNumber: String,
      phone: String
    },
    { strict: false }
  );
  const Settings = mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);

  const doc = await Settings.findByIdAndUpdate(
    "singleton",
    {
      whatsappNumber: "918800707026",
      phone: "8800707026"
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Updated contact info:", {
    whatsappNumber: doc.whatsappNumber,
    phone: doc.phone
  });

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
