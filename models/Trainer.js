import mongoose from "mongoose";

const TrainerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, default: "Personal trainer", trim: true },
    bio: { type: String, default: "" },
    bioExtra: { type: String, default: "" },
    credentials: { type: [String], default: [] },
    quote: { type: String, default: "" },
    photoUrl: { type: String, default: "" },
    photoPublicId: { type: String, default: "" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
    isPrimary: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.models.Trainer || mongoose.model("Trainer", TrainerSchema);
