import { NextResponse } from "next/server";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const settings = await getSettings();
  if (!settings.logoUrl) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.redirect(new URL(settings.logoUrl, request.url));
}
