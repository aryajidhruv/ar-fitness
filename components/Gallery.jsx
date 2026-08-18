"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UploadImage from "./UploadImage";
import Reveal from "./Reveal";
import { GALLERY_SLOTS } from "@/lib/gallerySlots";

const PLACEHOLDER_STYLE = {
  warm: {
    backgroundColor: "#0d0d0d",
    stripe: "rgba(255,255,255,0.04)"
  },
  cool: {
    backgroundColor: "#0d0d0d",
    stripe: "rgba(255,255,255,0.04)"
  },
  neutral: {
    backgroundColor: "#0d0d0d",
    stripe: "rgba(255,255,255,0.04)"
  }
};

function GalleryPlaceholder({ label, tone = "warm" }) {
  const palette = PLACEHOLDER_STYLE[tone] || PLACEHOLDER_STYLE.warm;

  return (
    <div
      className="absolute inset-0 border border-white/10"
      style={{ backgroundColor: palette.backgroundColor }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 8px, ${palette.stripe} 8px, ${palette.stripe} 16px)`
        }}
      />
      <div className="absolute inset-4 border border-dashed border-white/20 grid place-items-center bg-black/20">
        <span className="font-cond uppercase tracking-[.24em] text-[11px] font-bold text-neutral-400 px-2 text-center">
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
    <section id="gallery" className="py-24 md:py-32 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <Reveal>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/40" /> Inside the gym
          </motion.p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3">
            The floor you&rsquo;ll <em className="not-italic text-neutral-400 font-normal">train on</em>
          </h2>
        </Reveal>

        <div className="gallery-mosaic mt-11">
          {GALLERY_SLOTS.map((slot, index) => {
            const item = bySlot[slot.slot];

            return (
              <motion.div
                key={slot.slot}
                initial={{ opacity: 0, y: 50, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: (index % 4) * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className={`gallery-tile relative overflow-hidden ${slot.gridClass}`}
              >
                {item ? (
                  <motion.button
                    type="button"
                    onClick={() => setActive(item)}
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full cursor-pointer border border-white/10 group overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full z-10" />
                    <UploadImage 
                      src={item.url} 
                      alt={item.alt} 
                      fill 
                      sizes="25vw" 
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 filter grayscale contrast-125" 
                    />
                    <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                  </motion.button>
                ) : (
                  <GalleryPlaceholder label={slot.label} tone={slot.tone} />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9500] bg-black/95 grid place-items-center p-6 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 right-7 font-cond uppercase tracking-[.18em] text-xs font-bold text-neutral-400 hover:text-white"
              onClick={() => setActive(null)}
            >
              Close ✕
            </motion.button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-[min(760px,90vw)] aspect-[4/3] border border-white/20 overflow-hidden" 
              onClick={(e) => e.stopPropagation()}
            >
              <UploadImage src={active.url} alt={active.alt} fill sizes="80vw" className="object-cover filter grayscale contrast-125" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}