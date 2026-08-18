import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Transformation from "@/models/Transformation";

// GET is public: the admin dashboard also uses it (with ?all=1) to see unpublished items too.
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";

  const filter = all ? {} : { published: true };
  const items = await Transformation.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (body.featuredInHero) {
    if (body.isVideo) {
      return NextResponse.json({ error: "Video transformations cannot be featured in the hero" }, { status: 400 });
    }
    await Transformation.updateMany({}, { featuredInHero: false });
  }

  if (body.order == null) {
    const last = await Transformation.findOne().sort({ order: -1 }).select("order").lean();
    body.order = (last?.order ?? -1) + 1;
  }

  const doc = await Transformation.create(body);

  // The public homepage is server-rendered and cached; rebuild it now so
  // the new transformation appears immediately instead of waiting for the
  // next natural revalidation.
  revalidatePath("/");
  revalidatePath("/results");

  return NextResponse.json(doc, { status: 201 });
}
