import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Transformation from "@/models/Transformation";
import { deleteUpload, deleteUnusedUploads } from "@/lib/uploads";
import { getRouteId } from "@/lib/routeParams";

function getTransformationKeepIds(body) {
  if (body.isVideo) {
    return [body.videoPublicId];
  }

  return [body.beforePublicId, body.afterPublicId];
}

export async function PUT(req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const body = await req.json();
  const existing = await Transformation.findById(id).lean();
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const doc = await Transformation.findByIdAndUpdate(id, body, { new: true });

  await deleteUnusedUploads(
    [existing.beforePublicId, existing.afterPublicId, existing.videoPublicId],
    getTransformationKeepIds(body)
  );

  revalidatePath("/");
  revalidatePath("/results");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const id = await getRouteId(params);
  const doc = await Transformation.findByIdAndDelete(id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  // Clean up the Cloudinary assets so deleting from the dashboard doesn't
  // leave orphaned photos/videos racking up storage.
  try {
    if (doc.beforePublicId) await deleteUpload(doc.beforePublicId);
    if (doc.afterPublicId) await deleteUpload(doc.afterPublicId);
    if (doc.videoPublicId) await deleteUpload(doc.videoPublicId);
  } catch (err) {
    console.error("Upload cleanup failed:", err);
  }

  revalidatePath("/");
  revalidatePath("/results");
  return NextResponse.json({ ok: true });
}
