import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { getGallerySlot, sortGalleryItems } from "@/lib/gallerySlots";
import { deleteUnusedUploads } from "@/lib/uploads";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";
  const filter = all ? {} : { published: true };
  const items = await GalleryItem.find(filter).lean();
  return NextResponse.json(sortGalleryItems(items));
}

export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const slotConfig = getGallerySlot(body.slot);

  if (!slotConfig) {
    return NextResponse.json({ error: "Invalid gallery slot" }, { status: 400 });
  }
  if (!body.url || !body.publicId || !body.alt?.trim()) {
    return NextResponse.json({ error: "Photo and description are required" }, { status: 400 });
  }

  const existing = await GalleryItem.findOne({ slot: body.slot }).lean();

  const doc = await GalleryItem.findOneAndUpdate(
    { slot: body.slot },
    {
      slot: body.slot,
      url: body.url,
      publicId: body.publicId,
      alt: body.alt.trim(),
      span: slotConfig.span,
      order: slotConfig.order,
      published: body.published !== false
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  await deleteUnusedUploads([existing?.publicId], [body.publicId]);

  revalidatePath("/");
  revalidatePath("/gallery");
  return NextResponse.json(doc, { status: 201 });
}
