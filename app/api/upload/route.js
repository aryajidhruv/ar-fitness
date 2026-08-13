import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { saveUpload, sanitizeFolder } from "@/lib/uploads";

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const ALLOWED_VIDEO_TYPES = new Set(["video/mp4", "video/webm", "video/quicktime"]);
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

// Admin-only. Accepts multipart/form-data with a "file" field (image or video)
// and an optional "folder" field, saves it under public/uploads/, and returns
// the URL + publicId the frontend needs to save on a Transformation / GalleryItem.
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const folder = sanitizeFolder(formData.get("folder") || "ar-fitness");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const mimeType = file.type || "";
  const isVideo = mimeType.startsWith("video/");
  const isImage = mimeType.startsWith("image/");

  if (isVideo && !ALLOWED_VIDEO_TYPES.has(mimeType)) {
    return NextResponse.json({ error: "Unsupported video type" }, { status: 400 });
  }
  if (isImage && !ALLOWED_IMAGE_TYPES.has(mimeType)) {
    return NextResponse.json({ error: "Unsupported image type" }, { status: 400 });
  }
  if (!isVideo && !isImage) {
    return NextResponse.json({ error: "Only image and video uploads are allowed" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const maxBytes = isVideo ? MAX_VIDEO_BYTES : MAX_IMAGE_BYTES;

  if (buffer.length > maxBytes) {
    return NextResponse.json({ error: "File is too large" }, { status: 400 });
  }

  try {
    const result = await saveUpload(buffer, folder, file.name || "upload", mimeType);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Local upload failed:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
