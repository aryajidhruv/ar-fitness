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

      {/* Phase 2: Welcome Screen with Gold Line-Art Lord Ganesha SVG */}
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

          {/* Soft gold radial glow behind the murti */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 38%, rgba(212,164,55,0.14) 0%, rgba(212,164,55,0) 60%)",
            }}
          />

          <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="flex flex-col items-center"
            >
              {/* Lord Ganesha Line-Art SVG */}
              <div className="mb-6 flex justify-center">
                <motion.svg
                  className="w-28 h-28 sm:w-32 sm:h-32"
                  viewBox="0 0 200 220"
                  fill="none"
                  stroke="url(#ganeshaGold)"
                  strokeWidth="2.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                >
                  <defs>
                    <linearGradient id="ganeshaGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f6e27a" />
                      <stop offset="35%" stopColor="#d4a437" />
                      <stop offset="65%" stopColor="#c8902a" />
                      <stop offset="100%" stopColor="#f6e27a" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M100 8 C104 8, 108 14, 107 19 C106 24, 102 27, 100 30 C98 27, 94 24, 93 19 C92 14, 96 8, 100 8 Z"
                    fill="url(#ganeshaGold)"
                    stroke="none"
                  />
                  <path d="M88 16 C83 19, 81 24, 83 29" />
                  <path d="M112 16 C117 19, 119 24, 117 29" />
                  <path d="M70 38 C82 30, 118 30, 130 38 C124 48, 76 48, 70 38 Z" />
                  <circle cx="86" cy="38" r="1.6" fill="url(#ganeshaGold)" />
                  <circle cx="100" cy="36" r="1.8" fill="url(#ganeshaGold)" />
                  <circle cx="114" cy="38" r="1.6" fill="url(#ganeshaGold)" />
                  <path d="M93 44 L93 51 M100 42 L100 51 M107 44 L107 51" strokeWidth="2.25" />
                  <circle cx="100" cy="56" r="1.5" fill="url(#ganeshaGold)" />
                  <path d="M72 50 C50 48, 36 64, 47 86 C53 99, 65 108, 74 98" />
                  <path d="M128 50 C150 48, 164 64, 153 86 C147 99, 135 108, 126 98" />
                  <path
                    d="M80 65 C86 60, 95 62, 93 70 C91 74, 82 74, 80 65 Z"
                    fill="url(#ganeshaGold)"
                    stroke="none"
                    opacity="0.9"
                  />
                  <path
                    d="M120 65 C114 60, 105 62, 107 70 C109 74, 118 74, 120 65 Z"
                    fill="url(#ganeshaGold)"
                    stroke="none"
                    opacity="0.9"
                  />
                  <circle cx="97" cy="79" r="1.4" fill="url(#ganeshaGold)" />
                  <circle cx="103" cy="79" r="1.4" fill="url(#ganeshaGold)" />
                  <path d="M100 76 C100 92, 108 100, 116 108 C126 118, 128 130, 118 138 C110 144, 98 141, 94 132 C91 125, 96 118, 104 116" />
                  <path d="M54 112 C42 116, 40 130, 52 138 C61 144, 71 135, 67 124 C65 119, 58 118, 55 122" />
                  <path d="M146 112 C158 116, 160 130, 148 138 C139 144, 129 135, 133 124" />
                  <path d="M128 100 C133 96, 141 96, 145 101" />
                  <path d="M62 148 C78 134, 122 134, 138 148" />
                  <path d="M66 156 C80 144, 120 144, 134 156 C156 172, 144 192, 100 192 C56 192, 44 172, 66 156 Z" />
                  <path d="M76 188 C82 198, 92 204, 100 204 C108 204, 118 198, 124 188" />
                  <path d="M60 176 C48 180, 40 190, 42 200" />
                  <path d="M140 176 C152 180, 160 190, 158 200" />
                </motion.svg>
              </div>

              <span className="font-cond uppercase tracking-[0.4em] text-xs font-semibold text-neutral-400 mb-3">
                Welcome to
              </span>

              <h1 className="font-display uppercase tracking-wider text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-4">
                {gymName}
              </h1>

              <div className="w-12 h-px bg-white/30 my-3" />

              <p className="font-cond uppercase tracking-[0.3em] text-[11px] sm:text-xs text-neutral-400">
                Let&apos;s Get to Work
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}