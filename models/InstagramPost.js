import mongoose from "mongoose";

const InstagramPostSchema = new mongoose.Schema(
  {
    postUrl: { type: String, required: true, unique: true },
    imageUrl: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    caption: { type: String, default: "" },
    instagramId: { type: String, default: "" },
    mediaType: { type: String, default: "IMAGE" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.models.InstagramPost || mongoose.model("InstagramPost", InstagramPostSchema);
