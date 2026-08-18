import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Trainer from "@/models/Trainer";
import { deleteUpload, deleteUnusedUploads } from "@/lib/uploads";
import { getRouteId } from "@/lib/routeParams";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const body = await req.json();
  const existing = await Trainer.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.isPrimary) {
    await Trainer.updateMany({ _id: { $ne: id } }, { isPrimary: false });
  }

  const doc = await Trainer.findByIdAndUpdate(id, body, { new: true });

  await deleteUnusedUploads([existing.photoPublicId], [body.photoPublicId]);

  revalidatePath("/");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const doc = await Trainer.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    if (doc.photoPublicId) await deleteUpload(doc.photoPublicId);
  } catch (err) {
    console.error("Upload cleanup failed:", err);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
