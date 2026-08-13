import mongoose from "mongoose";

// Singleton document (there is only ever one Settings row, _id: "singleton").
// This holds everything Ajit should be able to change without a redeploy:
// WhatsApp number, phone, address, opening hours, map embed, JSON-LD geo.
const SettingsSchema = new mongoose.Schema(
  {
    _id: { type: String, default: "singleton" },
    gymName: { type: String, default: "AR Fitness" },
    ownerName: { type: String, default: "Ajit Singh" },
    ownerPhotoUrl: { type: String, default: "" },
    ownerPhotoPublicId: { type: String, default: "" },
    logoUrl: { type: String, default: "" },
    logoPublicId: { type: String, default: "" },
    whatsappNumber: { type: String, default: "918800707026" }, // digits only, e.g. 91XXXXXXXXXX
    phone: { type: String, default: "8800707026" },
    address: { type: String, default: "" },
    city: { type: String, default: "Delhi" },
    mapEmbedUrl: { type: String, default: "" },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    hoursWeekday: { type: String, default: "5:30 AM – 10:30 PM" },
    hoursSunday: { type: String, default: "7:00 AM – 12:00 PM" },
    metaDescription: { type: String, default: "" },
    instagramHandle: { type: String, default: "" },
    instagramUrl: { type: String, default: "" }
  },
  { timestamps: true }
);

// Next.js hot reload can cache an older schema without newer fields.
if (mongoose.models.Settings) {
  delete mongoose.models.Settings;
}

export default mongoose.model("Settings", SettingsSchema);
