"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import { GALLERY_SLOTS } from "@/lib/gallerySlots";

const PLACEHOLDER_STYLE = {
  warm: {
    backgroundColor: "#241c16",
    stripe: "rgba(214,155,63,0.08)"
  },
  cool: {
    backgroundColor: "#18202b",
    stripe: "rgba(120,160,210,0.1)"
  },
  neutral: {
    backgroundColor: "#1d1917",
    stripe: "rgba(255,255,255,0.06)"
  }
};

function GalleryPlaceholder({ label, tone = "warm" }) {
  const palette = PLACEHOLDER_STYLE[tone] || PLACEHOLDER_STYLE.warm;

  return (
    <div
      className="absolute inset-0 border border-white/15"
      style={{ backgroundColor: palette.backgroundColor }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${palette.stripe} 8px, ${palette.stripe} 16px)`
        }}
      />
      <div className="absolute inset-4 border border-dashed border-brass/50 grid place-items-center bg-black/10">
        <span className="font-cond uppercase tracking-[.24em] text-[11px] text-bone/80 px-2 text-center">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Gallery({ items }) {
  const [active, setActive] = useState(null);
  const bySlot = Object.fromEntries((items || []).map((item) => [item.slot, item]));

  return (
    <section id="gallery" className="py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> Inside the gym
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            The floor you&rsquo;ll <em className="not-italic text-brass">train on</em>
          </h2>
        </Reveal>

        <div className="gallery-mosaic mt-11">
          {GALLERY_SLOTS.map((slot) => {
            const item = bySlot[slot.slot];

            return (
              <div
                key={slot.slot}
                className={`gallery-tile relative overflow-hidden ${slot.gridClass}`}
              >
                {item ? (
                  <button
                    type="button"
                    onClick={() => setActive(item)}
                    className="absolute inset-0 w-full h-full cursor-pointer border border-white/10"
                  >
                    <Image src={item.url} alt={item.alt} fill sizes="25vw" className="object-cover" />
                    <span className="absolute inset-0 bg-brass/0 hover:bg-brass/15 transition-colors" />
                  </button>
                ) : (
                  <GalleryPlaceholder label={slot.label} tone={slot.tone} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[9500] bg-[#0b0a09]/95 grid place-items-center p-6"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute top-6 right-7 font-cond uppercase tracking-[.16em] text-sm text-bone-dim hover:text-brass"
            onClick={() => setActive(null)}
          >
            Close ✕
          </button>
          <div className="relative w-[min(760px,90vw)] aspect-[4/3] border border-white/10" onClick={(e) => e.stopPropagation()}>
            <Image src={active.url} alt={active.alt} fill sizes="80vw" className="object-cover" />
          </div>
        </div>
      )}
    </section>
  );
}
