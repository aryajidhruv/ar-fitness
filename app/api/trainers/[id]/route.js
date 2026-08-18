import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Trainer from "@/models/Trainer";
import { deleteUpload, deleteUnusedUploads } from "@/lib/uploads";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const existing = await Trainer.findById(params.id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (body.isPrimary) {
    await Trainer.updateMany({ _id: { $ne: params.id } }, { isPrimary: false });
  }

  const doc = await Trainer.findByIdAndUpdate(params.id, body, { new: true });

  await deleteUnusedUploads([existing.photoPublicId], [body.photoPublicId]);

  revalidatePath("/");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const doc = await Trainer.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    if (doc.photoPublicId) await deleteUpload(doc.photoPublicId);
  } catch (err) {
    console.error("Upload cleanup failed:", err);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
