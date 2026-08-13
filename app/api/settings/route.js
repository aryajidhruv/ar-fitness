import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import { getSettings } from "@/lib/data";
import { buildSettingsUpdate } from "@/lib/settingsUpdate";
import { deleteUnusedUploads } from "@/lib/uploads";
import { parseMapCoordinates, parseMapEmbedInput } from "@/lib/mapEmbed";
import Settings from "@/models/Settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if ("mapEmbedUrl" in body) {
    body.mapEmbedUrl = parseMapEmbedInput(body.mapEmbedUrl);
    const coords = parseMapCoordinates(body.mapEmbedUrl);
    if (coords.latitude != null) body.latitude = coords.latitude;
    if (coords.longitude != null) body.longitude = coords.longitude;
  }

  const update = buildSettingsUpdate(body);

  const existing = await Settings.findById("singleton").lean();
  const doc = await Settings.findByIdAndUpdate("singleton", update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  });

  if ("ownerPhotoPublicId" in update) {
    await deleteUnusedUploads(
      [existing?.ownerPhotoPublicId],
      [update.ownerPhotoPublicId]
    );
  }

  revalidatePath("/");
  revalidatePath("/visit");
  return NextResponse.json(doc);
}
