"use client";

import dynamic from "next/dynamic";

export const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((mod) => mod.InstagramEmbed),
  {
    ssr: false,
    loading: () => (
      <div className="instagram-embed-loading" aria-hidden="true">
        Loading post…
      </div>
    )
  }
);
