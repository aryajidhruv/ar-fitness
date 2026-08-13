const POST_PATH = /^\/(p|reel|reels|tv)\/([^/?#]+)\/?$/i;

export function normalizeInstagramUrl(url) {
  try {
    const parsed = new URL(String(url || "").trim());
    const host = parsed.hostname.replace(/^www\./, "");
    if (host !== "instagram.com") return null;

    parsed.search = "";
    parsed.hash = "";
    const pathname = parsed.pathname.replace(/\/+$/, "");
    const match = pathname.match(POST_PATH);
    if (!match) return null;

    const type = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
    return `https://www.instagram.com/${type}/${match[2]}/`;
  } catch {
    return null;
  }
}

export function isValidInstagramPostUrl(url) {
  return Boolean(normalizeInstagramUrl(url));
}

export function buildInstagramProfileUrl(handle) {
  const clean = String(handle || "")
    .trim()
    .replace(/^@/, "")
    .replace(/\/+$/, "");
  return clean ? `https://www.instagram.com/${clean}/` : "";
}

export function getInstagramConfig() {
  return {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || "",
    userId: process.env.INSTAGRAM_USER_ID || ""
  };
}

export async function fetchInstagramFeed(limit = 12) {
  const { accessToken, userId } = getInstagramConfig();
  if (!accessToken || !userId) {
    return null;
  }

  const fields = [
    "id",
    "caption",
    "media_type",
    "media_url",
    "permalink",
    "thumbnail_url",
    "timestamp"
  ].join(",");

  const res = await fetch(
    `https://graph.instagram.com/${userId}/media?fields=${fields}&limit=${limit}&access_token=${accessToken}`,
    { next: { revalidate: 3600 } }
  );

  if (!res.ok) {
    const detail = await res.text();
    throw new Error(detail || "Instagram API request failed");
  }

  const payload = await res.json();
  return (payload.data || [])
    .filter((item) => ["IMAGE", "CAROUSEL_ALBUM", "VIDEO"].includes(item.media_type))
    .map((item, index) => ({
      instagramId: item.id,
      postUrl: normalizeInstagramUrl(item.permalink) || item.permalink,
      imageUrl: item.media_type === "VIDEO" ? item.thumbnail_url : item.media_url,
      caption: item.caption || "",
      mediaType: item.media_type,
      order: index
    }));
}
