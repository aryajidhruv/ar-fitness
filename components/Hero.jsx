"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SHARD_COLS = 6;
const SHARD_ROWS = 4;
const SHARD_INDICES = Array.from({ length: SHARD_ROWS * SHARD_COLS });

const LOADER_TOTAL_MS = 4200; 

function EntranceShatter() {
  return (
    <div
      className="absolute inset-0 z-20 grid pointer-events-none"
      style={{
        gridTemplateColumns: `repeat(${SHARD_COLS}, 1fr)`,
        gridTemplateRows: `repeat(${SHARD_ROWS}, 1fr)`,
      }}
    >
      {SHARD_INDICES.map((_, i) => {
        const col = i % SHARD_COLS;
        const row = Math.floor(i / SHARD_COLS);
        const dirX = (col / (SHARD_COLS - 1) - 0.5) * 2;
        const dirY = (row / (SHARD_ROWS - 1) - 0.5) * 2;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: dirX * 70,
              y: dirY * 70,
              rotate: dirX * 30,
              scale: 0.55,
            }}
            transition={{
              duration: 0.7,
              delay: (row + col) * 0.02,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ backgroundColor: "#000" }}
          />
        );
      })}
    </div>
  );
}

export default function Hero({ whatsappNumber, gymName, logoUrl }) {
  const [showAfter, setShowAfter] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Use safe default states to match server and client initial render (fixing hydration errors)
  const [isLoaded, setIsLoaded] = useState(false);
  const [entranceActive, setEntranceActive] = useState(false);
  const [entranceDone, setEntranceDone] = useState(false);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Ajit, I want to book a free trial at ${gymName || "AR Fitness"}`
  )}`;

  const beforeImg =
    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2000&auto=format&fit=crop";
  const afterImg =
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop";

  const currentImg = showAfter ? afterImg : beforeImg;

  // Handle session storage checks safely after component mounts
  useEffect(() => {
    const hasLoadedBefore = sessionStorage.getItem("ar_fitness_loaded");

    if (!hasLoadedBefore) {
      sessionStorage.setItem("ar_fitness_loaded", "true");
      setEntranceActive(true);

      const timer = setTimeout(() => {
        setIsLoaded(true);

        const clearTimer = setTimeout(() => {
          setEntranceDone(true);
        }, 900);

        return () => clearTimeout(clearTimer);
      }, LOADER_TOTAL_MS);

      return () => clearTimeout(timer);
    } else {
      setIsLoaded(true);
      setEntranceDone(true);
    }
  }, []);

  const handleToggle = () => {
    setShowAfter((s) => !s);
  };

  const navLinks = [
    { label: "TEAM", href: "#team" },
    { label: "PROGRAMS", href: "#programs" },
    { label: "ONLINE", href: "#online" },
    { label: "RESULTS", href: "/transformations" },
    { label: "GALLERY", href: "#gallery" },
    { label: "INSTAGRAM", href: "#instagram" },
    { label: "MEMBERSHIP", href: "#membership" },
    { label: "VISIT", href: "#visit" },
  ];

  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      rotateX: -45,
      filter: "blur(12px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  return (
    <section
      id="top"
      className="relative w-full min-h-screen bg-black text-white overflow-hidden flex flex-col justify-between selection:bg-white selection:text-black"
    >
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={isLoaded ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/40 to-transparent"
      >
        <div className="w-[94%] max-w-[1400px] mx-auto flex items-center justify-between py-6">
          <a href="#top" className="flex items-center gap-3 group">
            {logoUrl ? (
              <div className="relative w-8 h-8 rounded bg-white/10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={gymName || "AR Fitness"}
                  width={32}
                  height={32}
                  className="object-contain filter grayscale contrast-200"
                />
              </div>
            ) : (
              <div className="w-7 h-7 bg-white text-black font-cond font-black text-xs flex items-center justify-center tracking-tighter transition-transform duration-300 group-hover:scale-105">
                AR
              </div>
            )}
            <span className="font-display font-black text-2xl uppercase tracking-wider text-white">
              {gymName || "AR FITNESS"}
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-cond font-bold text-xs uppercase tracking-[0.18em] text-neutral-300 hover:text-white hover:underline underline-offset-8 decoration-2 decoration-white transition-all"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-cond font-bold text-xs uppercase tracking-[0.18em] text-neutral-300 hover:text-white hover:underline underline-offset-8 decoration-2 decoration-white transition-all"
                >
                  {link.label}
                </a>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-6">
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black font-cond font-black text-xs uppercase tracking-[0.16em] px-6 py-2.5 rounded-none hover:bg-neutral-200 transition-colors shadow-lg"
            >
              FREE TRIAL
            </motion.a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none p-1 z-50"
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="square" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-black/95 border-b border-white/10 backdrop-blur-xl px-6 py-8"
            >
              <div className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  link.href.startsWith("/") ? (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-cond font-bold text-sm uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-cond font-bold text-sm uppercase tracking-[0.2em] text-neutral-300 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                ))}
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-center bg-white text-black font-cond font-black text-xs uppercase tracking-[0.16em] py-3 shadow-lg"
                >
                  FREE TRIAL
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <div className="relative w-full min-h-screen flex flex-col lg:flex-row items-stretch pt-28 lg:pt-0">
        <div className="w-full lg:w-[58%] flex flex-col justify-center px-6 sm:px-12 xl:px-20 py-12 z-20">
          <div className="max-w-[820px]">
            <motion.h1
              variants={headingContainerVariants}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              style={{ perspective: "1000px" }}
              className="font-display font-black uppercase leading-[0.85] tracking-tight text-[38px] sm:text-[60px] lg:text-[74px] xl:text-[88px] text-white drop-shadow-2xl select-none"
            >
              <div className="overflow-hidden py-1">
                <span className="inline-block">
                  {["TRANSFORMATION"].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </div>

              <div className="overflow-hidden py-1">
                <span className="inline-block">
                  {["ISN'T", "MAGIC."].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </div>

              <div className="overflow-hidden py-1">
                <span className="inline-block text-white/90">
                  {["IT'S", "A", "TIMELINE."].map((word, i) => (
                    <motion.span
                      key={i}
                      variants={wordVariants}
                      className="inline-block mr-[0.25em]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              </div>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
              animate={isLoaded ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 25, filter: "blur(6px)" }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-[500px] text-neutral-300 font-body font-normal text-[16px] sm:text-[18px] leading-relaxed"
            >
              {gymName || "AR Fitness"} is a strength and fat-loss gym coached by Ajit Singh. Click anywhere on the image to toggle member progression.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-white text-black font-cond font-bold uppercase tracking-[0.15em] text-xs sm:text-sm px-8 py-4 rounded-none transition-colors shadow-2xl"
              >
                BOOK A FREE TRIAL
              </motion.a>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/transformations"
                  className="inline-flex items-center justify-center border border-white/30 bg-black/50 backdrop-blur-md text-white font-cond font-bold uppercase tracking-[0.15em] text-xs sm:text-sm px-8 py-4 rounded-none transition-colors hover:border-white"
                >
                  EXPLORE TRANSFORMATIONS
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div
          onClick={handleToggle}
          className="relative w-full lg:w-[42%] min-h-[50vh] lg:min-h-screen cursor-pointer overflow-hidden z-10 group"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={showAfter ? "after" : "before"}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={currentImg}
                alt="Bodybuilder Transformation"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center filter grayscale contrast-125 transition-transform duration-1000 group-hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>

          <AnimatePresence>
            {entranceActive && !entranceDone && <EntranceShatter />}
          </AnimatePresence>

          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 pointer-events-none lg:hidden" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="absolute top-28 right-6 sm:right-12 z-40 pointer-events-none"
          >
            <motion.span
              key={showAfter ? "badge-after" : "badge-before"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`inline-block font-cond text-xs font-black uppercase tracking-[0.2em] px-4 py-2 border backdrop-blur-md transition-colors ${
                showAfter
                  ? "bg-white text-black border-white shadow-lg shadow-white/10"
                  : "bg-black/80 text-white border-white/30"
              }`}
            >
              {showAfter ? "AFTER PHYSIQUE" : "BEFORE PHYSIQUE"}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}