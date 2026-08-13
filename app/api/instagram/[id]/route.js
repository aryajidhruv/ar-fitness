import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import InstagramPost from "@/models/InstagramPost";
import { deleteUpload, deleteUnusedUploads } from "@/lib/uploads";

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const existing = await InstagramPost.findById(params.id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const doc = await InstagramPost.findByIdAndUpdate(params.id, body, { new: true });

  await deleteUnusedUploads([existing.imagePublicId], [body.imagePublicId]);

  revalidatePath("/");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const doc = await InstagramPost.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  try {
    if (doc.imagePublicId) await deleteUpload(doc.imagePublicId);
  } catch (err) {
    console.error("Upload cleanup failed:", err);
  }

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
