"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#coach", label: "Coach" },
  { href: "#programs", label: "Programs" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Gallery" },
  { href: "#instagram", label: "Instagram" },
  { href: "#plans", label: "Membership" },
  { href: "#visit", label: "Visit" }
];

export default function Nav({ gymName, whatsappNumber }) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi ${gymName ? "" : ""}I want to book a free trial at ${gymName}`
  )}`;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-[9000] h-[68px] flex items-center transition-colors duration-300 ${
        stuck ? "bg-iron/90 backdrop-blur-md border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="w-[92%] max-w-[1200px] mx-auto flex items-center justify-between gap-5">
        <Link href="#top" className="flex items-center gap-2.5">
          <span className="w-[34px] h-[34px] grid place-items-center border border-brass font-display font-black text-brass text-[17px]">
            AR
          </span>
          <span className="font-display font-extrabold text-[22px] uppercase tracking-wide leading-none">
            AR <span className="text-brass">Fitness</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-8 font-cond uppercase tracking-[.13em] text-[14.5px] font-medium">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-bone-dim hover:text-bone transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center gap-2 px-[18px] py-[9px] font-cond uppercase tracking-[.14em] text-[13px] font-semibold border border-brass bg-brass text-iron hover:bg-brass-lite hover:-translate-y-0.5 transition-all"
        >
          Free trial
        </a>

        <button
          className="md:hidden w-10 h-10 grid place-items-center"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="block w-5 h-px bg-bone relative">
            <span
              className={`absolute left-0 w-5 h-px bg-bone transition-transform ${
                open ? "top-0 rotate-45" : "-top-1.5"
              }`}
            />
            <span
              className={`absolute left-0 w-5 h-px bg-bone transition-transform ${
                open ? "top-0 -rotate-45" : "top-1.5"
              }`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="md:hidden absolute top-[68px] inset-x-0 bg-iron-2 border-b border-white/10 flex flex-col py-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="px-[4vw] py-3.5 font-cond uppercase tracking-[.14em] border-b border-white/10"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
