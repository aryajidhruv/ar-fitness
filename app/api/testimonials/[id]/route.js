import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const body = await req.json();
  const doc = await Testimonial.findByIdAndUpdate(params.id, body, { new: true });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  return NextResponse.json(doc);
}

export async function DELETE(_req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const doc = await Testimonial.findByIdAndDelete(params.id);
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
