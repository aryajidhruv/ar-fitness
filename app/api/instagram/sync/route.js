import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import InstagramPost from "@/models/InstagramPost";
import { fetchInstagramFeed, getInstagramConfig } from "@/lib/instagram";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { accessToken, userId } = getInstagramConfig();
  if (!accessToken || !userId) {
    return NextResponse.json(
      {
        error:
          "Instagram auto-sync is not configured. Add INSTAGRAM_ACCESS_TOKEN and INSTAGRAM_USER_ID to your .env file, or add posts manually."
      },
      { status: 400 }
    );
  }

  await connectDB();

  try {
    const feed = await fetchInstagramFeed(12);
    if (!feed?.length) {
      return NextResponse.json({ error: "No Instagram posts were returned" }, { status: 404 });
    }

    let synced = 0;
    for (const item of feed) {
      await InstagramPost.findOneAndUpdate(
        { postUrl: item.postUrl },
        {
          ...item,
          published: true
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      synced += 1;
    }

    revalidatePath("/");
    return NextResponse.json({ ok: true, synced });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Instagram sync failed" }, { status: 502 });
  }
}
