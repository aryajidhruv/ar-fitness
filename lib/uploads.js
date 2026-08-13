import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

const MIME_EXT = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "video/mp4": ".mp4",
  "video/webm": ".webm",
  "video/quicktime": ".mov"
};

export function sanitizeFolder(folder) {
  const safe = String(folder || "general")
    .replace(/[^a-zA-Z0-9/_-]/g, "")
    .replace(/\.\./g, "")
    .replace(/^\/+/, "")
    .slice(0, 100);

  return safe || "general";
}

function sanitizePublicId(publicId) {
  const safe = String(publicId || "")
    .replace(/\\/g, "/")
    .replace(/\.\./g, "")
    .replace(/^\/+/, "");

  if (!safe) return null;

  const absolute = path.resolve(UPLOADS_ROOT, safe);
  if (!absolute.startsWith(UPLOADS_ROOT)) return null;

  return safe;
}

export function getUploadPath(publicId) {
  const safe = sanitizePublicId(publicId);
  if (!safe) return null;
  return path.join(UPLOADS_ROOT, safe);
}

export function getPublicUrl(publicId) {
  const safe = sanitizePublicId(publicId);
  if (!safe) return null;
  return `/uploads/${safe.split(path.sep).join("/")}`;
}

export async function saveUpload(buffer, folder, originalName, mimeType) {
  const safeFolder = sanitizeFolder(folder);
  const ext = path.extname(originalName).toLowerCase() || MIME_EXT[mimeType] || "";
  const filename = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  const publicId = `${safeFolder}/${filename}`;
  const filePath = getUploadPath(publicId);

  if (!filePath) {
    throw new Error("Invalid upload path");
  }

  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, buffer);

  return {
    url: getPublicUrl(publicId),
    publicId,
    resourceType: mimeType?.startsWith("video/") ? "video" : "image"
  };
}

export async function deleteUpload(publicId) {
  const filePath = getUploadPath(publicId);
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== "ENOENT") throw err;
  }
}

export async function deleteUnusedUploads(previousIds, keepIds = []) {
  const keep = new Set(keepIds.filter(Boolean));

  for (const publicId of previousIds.filter(Boolean)) {
    if (keep.has(publicId)) continue;

    try {
      await deleteUpload(publicId);
    } catch (err) {
      console.error("Upload cleanup failed:", publicId, err);
    }
  }
}
