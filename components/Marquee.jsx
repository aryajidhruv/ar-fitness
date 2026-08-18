"use client";

import { motion } from "framer-motion";

const WORDS = ["Fat loss", "Strength", "Personal training", "Nutrition", "Group classes", "Powerlifting"];

export default function Marquee() {
  // Duplicate array enough times to ensure seamless infinite looping without gaps on ultra-wide screens
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <div className="border-y border-white/10 bg-black overflow-hidden py-4 select-none relative" aria-hidden="true">
      {/* Subtle edge fade overlays for cinematic depth */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      <div className="flex w-max overflow-hidden">
        <motion.div
          className="flex items-center shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "linear"
          }}
          whileHover={{ scale: 1.01 }}
        >
          {items.map((w, i) => (
            <motion.span
              key={i}
              whileHover={{ 
                color: "rgba(255, 255, 255, 1)", 
                scale: 1.08,
                transition: { duration: 0.2 } 
              }}
              className="flex items-center gap-6 px-6 font-display font-bold uppercase text-[24px] sm:text-[26px] tracking-wide text-white/40 whitespace-nowrap cursor-default transition-colors"
            >
              {w}
              <span className="w-1.5 h-1.5 bg-white rotate-45 block shrink-0" />
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}