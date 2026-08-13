"use client";

import { useState } from "react";
import { Trophy } from "lucide-react";
import Reveal from "./Reveal";
import Scrubber from "./Scrubber";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "fat-loss", label: "Fat loss" },
  { key: "muscle-gain", label: "Muscle gain" },
  { key: "video", label: "Videos" }
];

function TransformationCard({ item }) {
  return (
    <article className="border border-white/10 bg-iron-2 overflow-hidden h-full">
      {item.isVideo ? (
        <a
          href={item.videoUrl}
          target="_blank"
          rel="noopener"
          className="relative aspect-[3/4] grid place-items-center bg-gradient-to-br from-[#2b2118] to-[#171310] group"
        >
          <span className="absolute top-3.5 left-3.5 font-cond uppercase tracking-[.18em] text-[11px] text-brass border border-brass/45 px-2.5 py-1">
            Video
          </span>
          <span className="w-16 h-16 rounded-full border border-brass text-brass grid place-items-center group-hover:bg-brass group-hover:text-iron group-hover:scale-105 transition-all">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </a>
      ) : (
        <Scrubber
          beforeUrl={item.beforeUrl}
          afterUrl={item.afterUrl}
          days={item.days}
          name={item.name}
          className="aspect-[3/4]"
        />
      )}
      <div className="flex justify-between items-center gap-3 px-5 py-4">
        <div>
          <h4 className="font-display font-bold uppercase text-[21px] leading-none">{item.name}</h4>
          <small className="font-cond uppercase tracking-[.15em] text-[11.5px] text-bone-dim">
            {item.category.replace("-", " ")} · {item.days} days
          </small>
        </div>
        {item.metricValue && (
          <span className="font-display font-black text-[22px] text-brass whitespace-nowrap">
            {item.metricValue}
          </span>
        )}
      </div>
    </article>
  );
}

export default function Transformations({ items }) {
  const [filter, setFilter] = useState("all");

  const visible = items.filter((t) => {
    if (filter === "all") return true;
    if (filter === "video") return t.isVideo;
    return t.category === filter;
  });

  return (
    <section id="results" className="py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <Trophy className="w-4 h-4 shrink-0" strokeWidth={1.75} aria-hidden="true" />
            <span className="w-7 h-px bg-brass" /> Member results
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            Same people.<br /><em className="not-italic text-brass">Different</em> timelines.
          </h2>
          <p className="mt-4 max-w-[56ch] text-bone-dim font-light">
            Every photo and video below belongs to a real member, posted with their permission. Drag the
            slider on each card to compare before and after.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-cond uppercase tracking-[.14em] text-[13px] font-medium px-[18px] py-2.5 border transition-colors ${
                  filter === f.key
                    ? "bg-brass border-brass text-iron font-semibold"
                    : "border-white/10 text-bone-dim hover:border-brass hover:text-bone"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <p className="mt-12 text-bone-dim font-cond uppercase tracking-[.14em] text-sm">
            No transformations in this category yet.
          </p>
        ) : (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {visible.map((item, index) => (
              <Reveal key={item._id} delay={index * 0.06}>
                <TransformationCard item={item} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
