import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import InstagramPost from "@/models/InstagramPost";
import { normalizeInstagramUrl } from "@/lib/instagram";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";
  const filter = all ? {} : { published: true };
  const items = await InstagramPost.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const postUrl = normalizeInstagramUrl(body.postUrl);

  if (!postUrl) {
    return NextResponse.json({ error: "Enter a valid Instagram post or reel URL" }, { status: 400 });
  }

  const doc = await InstagramPost.findOneAndUpdate(
    { postUrl },
    {
      postUrl,
      imageUrl: body.imageUrl || "",
      imagePublicId: body.imagePublicId || "",
      caption: body.caption?.trim() || "",
      instagramId: body.instagramId || "",
      mediaType: body.mediaType || "IMAGE",
      order: Number(body.order) || 0,
      published: body.published !== false
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  revalidatePath("/");
  return NextResponse.json(doc, { status: 201 });
}
