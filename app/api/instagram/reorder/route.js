import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import InstagramPost from "@/models/InstagramPost";

export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids array is required" }, { status: 400 });
  }

  await Promise.all(ids.map((id, index) => InstagramPost.findByIdAndUpdate(id, { order: index })));

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
