"use client";

import { InstagramEmbed } from "./InstagramEmbedClient";
import Reveal from "./Reveal";
import { buildInstagramProfileUrl } from "@/lib/instagram";

export default function InstagramGallery({ items, instagramHandle = "", instagramUrl = "" }) {
  const profileUrl = instagramUrl || buildInstagramProfileUrl(instagramHandle);
  const handleLabel = instagramHandle ? `@${instagramHandle.replace(/^@/, "")}` : "Instagram";

  if (!items?.length) return null;

  return (
    <section id="instagram" className="py-24 md:py-32 border-t border-white/10">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> On Instagram
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-5">
            <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px]">
              Life inside <em className="not-italic text-brass">the gym</em>
            </h2>
            {profileUrl && (
              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-cond uppercase tracking-[.14em] text-[13px] border border-white/15 px-4 py-2.5 hover:border-brass hover:text-brass transition-colors"
              >
                Follow {handleLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            )}
          </div>
          <p className="mt-4 max-w-[56ch] text-bone-dim font-light">
            Latest posts from our Instagram — tap any embed to open the full post.
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {items.map((item, index) => (
            <Reveal key={item._id} delay={index * 0.05} className="h-full">
              <div className="instagram-embed-tile">
                <InstagramEmbed url={item.postUrl} width="100%" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
