"use client";

import { useState } from "react";
import UploadImage from "./UploadImage";

function ScrubberImage({ src, alt, priority, onError }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-[#2b2118] to-[#171310] grid place-items-center px-6 text-center">
        <span className="font-cond uppercase tracking-[.18em] text-[11px] text-bone-dim">
          Photo unavailable
        </span>
      </div>
    );
  }

  return (
    <UploadImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
      className="object-cover"
      onError={() => {
        setFailed(true);
        onError?.();
      }}
    />
  );
}

export default function Scrubber({ beforeUrl, afterUrl, days, name, className = "", priority = false }) {
  const [value, setValue] = useState(50);
  const dayCount = Math.round((days || 100) * value / 100);

  return (
    <div className={`relative overflow-hidden border border-white/10 bg-iron-2 select-none ${className}`}>
      <div className="absolute inset-0">
        <ScrubberImage src={beforeUrl} alt={`${name} — before`} priority={priority} />
      </div>
      <span className="absolute top-4 left-4 z-10 bg-iron/70 backdrop-blur px-3 py-1 font-cond uppercase tracking-[.2em] text-xs text-bone-dim">
        Day 0
      </span>

      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${value}%)` }}>
        <ScrubberImage src={afterUrl} alt={`${name} — after`} priority={priority} />
        <span className="absolute top-4 right-4 z-10 bg-iron/70 backdrop-blur px-3 py-1 font-cond uppercase tracking-[.2em] text-xs text-brass">
          Day {days}
        </span>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-brass shadow-[0_0_22px_rgba(214,155,63,0.75)]"
        style={{ left: `${value}%`, transform: "translateX(-1px)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-brass text-iron grid place-items-center font-display font-black text-sm shadow-[0_0_0_6px_rgba(214,155,63,0.16)]">
          {dayCount}
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Drag to compare ${name}'s before and after`}
        className="scrubber"
      />
    </div>
  );
}
