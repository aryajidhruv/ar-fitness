import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/adminSession";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Transformation from "@/models/Transformation";

export async function POST(req) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const { ids } = await req.json();

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: "ids array is required" }, { status: 400 });
  }

  await Promise.all(ids.map((id, index) => Transformation.findByIdAndUpdate(id, { order: index })));

  revalidatePath("/");
  revalidatePath("/results");
  return NextResponse.json({ ok: true });
}
