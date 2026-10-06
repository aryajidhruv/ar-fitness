"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader({ gymName = "AR Fitness" }) {
  const [showLoader, setShowLoader] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    // Transition from barbell loader to welcome screen at 2.4s
    const welcomeTimer = window.setTimeout(() => {
      setShowLoader(false);
      setShowWelcome(true);
    }, 2400);

    // Completely unmount and restore scroll at 4.2s
    const endTimer = window.setTimeout(() => {
      setShowWelcome(false);
      document.body.classList.remove("overflow-hidden");
    }, 4200);

    return () => {
      window.clearTimeout(welcomeTimer);
      window.clearTimeout(endTimer);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  // Split the gym name into words so each word can stagger in on its own line-friendly unit
  const nameWords = (gymName || "AR Fitness").split(" ");

  // Build initials for the monogram badge (e.g. "AR Fitness" -> "AF")
  const initials =
    nameWords
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AR";

  const wordContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };

  const wordItem = {
    hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
    },
  };

  return (
    <AnimatePresence>
      {/* Phase 1: High-End Sleek Minimalist Gym Equipment Animation */}
      {showLoader && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] bg-black grid place-items-center text-white selection:bg-white selection:text-black overflow-hidden"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
          aria-live="polite"
          aria-label="Loading"
        >
          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            {/* Elegant Large Minimalist Barbell Graphic with Press Motion */}
            <div className="w-64 h-36 mb-6 relative flex items-center justify-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 240 120" fill="none">
                <motion.line
                  x1="50" y1="60" x2="190" y2="60"
                  stroke="white"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />

                <rect x="65" y="48" width="6" height="24" rx="2" fill="white" />
                <rect x="169" y="48" width="6" height="24" rx="2" fill="white" />

                <motion.g
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="35" y="32" width="12" height="56" rx="3" stroke="white" strokeWidth="2.5" fill="black" />
                  <rect x="20" y="24" width="10" height="72" rx="3" stroke="white" strokeWidth="2.5" fill="black" />
                </motion.g>

                <motion.g
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="193" y="32" width="12" height="56" rx="3" stroke="white" strokeWidth="2.5" fill="black" />
                  <rect x="210" y="24" width="10" height="72" rx="3" stroke="white" strokeWidth="2.5" fill="black" />
                </motion.g>
              </svg>
            </div>

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 0.8 }}
              className="font-cond uppercase text-xs text-neutral-400 font-bold"
            >
              INITIALIZING POWER...
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Phase 2: Welcome Screen — monogram badge + staggered name reveal */}
      {showWelcome && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[10000] bg-black grid place-items-center text-white selection:bg-white selection:text-black overflow-hidden"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          </div>

          {/* Soft neutral glow behind the badge */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center"
            >
              {/* Monogram badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
                className="mb-7 w-16 h-16 sm:w-20 sm:h-20 border border-white/25 flex items-center justify-center relative"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
                  className="absolute inset-1.5 border border-white/10"
                />
                <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight">
                  {initials}
                </span>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, letterSpacing: "0.15em" }}
                animate={{ opacity: 1, letterSpacing: "0.4em" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-cond uppercase text-xs font-semibold text-neutral-400 mb-3"
              >
                Welcome to
              </motion.span>

              {/* Gym name — staggered word-by-word reveal with a soft blur-in */}
              <motion.h1
                variants={wordContainer}
                initial="hidden"
                animate="visible"
                className="font-display uppercase tracking-wider text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4 flex flex-wrap items-center justify-center gap-x-4"
              >
                {nameWords.map((word, i) => (
                  <motion.span key={`${word}-${i}`} variants={wordItem} className="inline-block">
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {/* Animated underline grows in after the name has revealed */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "3rem" }}
                transition={{ duration: 0.6, delay: 0.15 + nameWords.length * 0.12 + 0.2, ease: [0.19, 1, 0.22, 1] }}
                className="h-px bg-white/30 my-3"
              />

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + nameWords.length * 0.12 + 0.35 }}
                className="font-cond uppercase tracking-[0.3em] text-[11px] sm:text-xs text-neutral-400"
              >
                Let&apos;s Get to Work
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}