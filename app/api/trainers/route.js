import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Trainer from "@/models/Trainer";

export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all") === "1";

  const filter = all ? {} : { published: true };
  const items = await Trainer.find(filter).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();

  if (body.isPrimary) {
    await Trainer.updateMany({}, { isPrimary: false });
  }

  const doc = await Trainer.create(body);

  revalidatePath("/");
  return NextResponse.json(doc, { status: 201 });
}
