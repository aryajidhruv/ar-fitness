import { connectDB } from "@/lib/mongodb";
import Transformation from "@/models/Transformation";
import GalleryItem from "@/models/GalleryItem";
import Testimonial from "@/models/Testimonial";
import Settings from "@/models/Settings";
import InstagramPost from "@/models/InstagramPost";
import { sortGalleryItems } from "@/lib/gallerySlots";

// These run on the server inside page components (not via fetch("/api/...")),
// so the homepage is fully rendered to HTML before it reaches the browser —
// that's what makes the transformations/gallery/testimonials crawlable by
// Google instead of appearing only after a client-side fetch.

function serialize(doc) {
  return JSON.parse(JSON.stringify(doc));
}

export async function getTransformations() {
  await connectDB();
  const items = await Transformation.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return serialize(items);
}

export async function getGalleryItems() {
  await connectDB();
  const items = await GalleryItem.find({ published: true }).lean();
  return serialize(sortGalleryItems(items));
}

export async function getInstagramPosts() {
  await connectDB();
  const items = await InstagramPost.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .limit(12)
    .lean();
  return serialize(items);
}

export async function getTestimonials() {
  await connectDB();
  const items = await Testimonial.find({ published: true })
    .sort({ order: 1, createdAt: -1 })
    .lean();
  return serialize(items);
}

export async function getSettings() {
  await connectDB();
  const settings = await Settings.findByIdAndUpdate(
    "singleton",
    {},
    { upsert: true, new: true, setDefaultsOnInsert: true }
  ).lean();

  const fallbackWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918800707026";

  if (!settings.whatsappNumber) {
    settings.whatsappNumber = fallbackWhatsApp;
  }
  if (!settings.phone) {
    settings.phone = "8800707026";
  }

  return serialize(settings);
}
