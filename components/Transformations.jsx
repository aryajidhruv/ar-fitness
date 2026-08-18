"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy } from "lucide-react";
import Reveal from "./Reveal";
import Scrubber from "./Scrubber";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "fat-loss", label: "Fat loss" },
  { key: "muscle-gain", label: "Muscle gain" },
  { key: "video", label: "Videos" }
];

function TransformationCard({ item, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="border border-white/10 bg-black overflow-hidden h-full group relative"
    >
      <div className="absolute top-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full z-10" />
      
      {item.isVideo ? (
        <a
          href={item.videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-[3/4] grid place-items-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group/vid overflow-hidden"
        >
          <span className="absolute top-3.5 left-3.5 font-cond uppercase tracking-[.18em] text-[11px] font-bold text-white border border-white/40 px-2.5 py-1 z-10">
            Video
          </span>
          <motion.span
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            className="w-16 h-16 rounded-full border border-white text-white grid place-items-center group-hover/vid:bg-white group-hover/vid:text-black transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </motion.span>
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
      
      <div className="flex justify-between items-center gap-3 px-5 py-4 bg-black">
        <div>
          <h4 className="font-display font-bold uppercase text-[21px] leading-none tracking-tight text-white group-hover:text-neutral-200 transition-colors">
            {item.name}
          </h4>
          <small className="font-cond uppercase tracking-[.15em] text-[11.5px] font-bold text-neutral-400 mt-1 block">
            {item.category.replace("-", " ")} · {item.days} days
          </small>
        </div>
        {item.metricValue && (
          <span className="font-display font-black text-[22px] text-white whitespace-nowrap tracking-tight">
            {item.metricValue}
          </span>
        )}
      </div>
    </motion.article>
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
    <section id="results" className="py-24 md:py-32 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <Reveal>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
          >
            <Trophy className="w-4 h-4 shrink-0 text-white" strokeWidth={1.75} aria-hidden="true" />
            <span className="w-8 h-px bg-white/40" /> Member results
          </motion.p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3">
            Same people.<br /><em className="not-italic text-neutral-400 font-normal">Different</em> timelines.
          </h2>
          <p className="mt-4 max-w-[58ch] text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed">
            Every photo and video below belongs to a real member, posted with their permission. Drag the
            slider on each card to compare before and after.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-8">
            {FILTERS.map((f) => (
              <motion.button
                key={f.key}
                onClick={() => setFilter(f.key)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className={`font-cond uppercase tracking-[.15em] text-xs font-bold px-5 py-3 border transition-all ${
                  filter === f.key
                    ? "bg-white border-white text-black shadow-2xl"
                    : "border-white/20 bg-black text-neutral-300 hover:border-white hover:text-white"
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        {visible.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 text-neutral-400 font-cond uppercase tracking-[.15em] text-xs font-bold"
          >
            No transformations in this category yet.
          </motion.p>
        ) : (
          <motion.div 
            layout
            className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            <AnimatePresence>
              {visible.map((item, index) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4 }}
                >
                  <TransformationCard item={item} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}