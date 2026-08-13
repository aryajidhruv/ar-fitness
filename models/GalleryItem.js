import mongoose from "mongoose";
import { GALLERY_SLOT_IDS } from "@/lib/gallerySlots";

const GalleryItemSchema = new mongoose.Schema(
  {
    slot: { type: String, required: true, unique: true, enum: GALLERY_SLOT_IDS },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    alt: { type: String, required: true, trim: true },
    span: { type: String, enum: ["normal", "wide", "tall", "large"], default: "normal" },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true }
  },
  { timestamps: true }
);

if (mongoose.models.GalleryItem) {
  delete mongoose.models.GalleryItem;
}

export default mongoose.model("GalleryItem", GalleryItemSchema);
