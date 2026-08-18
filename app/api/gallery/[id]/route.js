import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import GalleryItem from "@/models/GalleryItem";
import { deleteUpload, deleteUnusedUploads } from "@/lib/uploads";
import { getRouteId } from "@/lib/routeParams";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const body = await req.json();
  const existing = await GalleryItem.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const doc = await GalleryItem.findByIdAndUpdate(id, body, { new: true });

  await deleteUnusedUploads([existing.publicId], [body.publicId]);

  revalidatePath("/");
  revalidatePath("/gallery");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const doc = await GalleryItem.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    if (doc.publicId) await deleteUpload(doc.publicId);
  } catch (err) {
    console.error("Upload cleanup failed:", err);
  }

  revalidatePath("/");
  revalidatePath("/gallery");
  return NextResponse.json({ ok: true });
}
