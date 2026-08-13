"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import SiteLogo from "./SiteLogo";
import {
  BicepsFlexed,
  Dumbbell,
  HeartPulse,
  ICON_STROKE,
  PersonStanding,
  Target,
  Timer
} from "./icons/gymLucide";

const ORBIT_RADIUS = 132;

const ORBIT_ICONS = [
  { id: "dumbbell", Icon: Dumbbell },
  { id: "muscle", Icon: BicepsFlexed },
  { id: "cardio", Icon: HeartPulse },
  { id: "timer", Icon: Timer },
  { id: "person", Icon: PersonStanding },
  { id: "coach", Icon: Target }
];

function orbitTransform(index) {
  const angle = index * 60 - 90;
  return `rotate(${angle}deg) translateY(-${ORBIT_RADIUS}px) rotate(${-angle}deg)`;
}

export default function PageLoader({ gymName = "AR Fitness", logoUrl = "" }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    const timer = window.setTimeout(() => {
      setShow(false);
      document.body.classList.remove("overflow-hidden");
    }, 3200);

    return () => {
      window.clearTimeout(timer);
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] bg-iron grid place-items-center"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="loader-glow pointer-events-none absolute w-[min(520px,90vw)] h-[min(520px,90vw)] rounded-full" />

      <div className="loader-orbit">
        <div className="loader-orbit-ring loader-orbit-ring-outer" aria-hidden="true" />
        <div className="loader-orbit-ring loader-orbit-ring-inner" aria-hidden="true" />

        {ORBIT_ICONS.map((item, index) => (
          <div
            key={item.id}
            className="loader-orbit-icon"
            style={{ transform: orbitTransform(index) }}
          >
            <motion.div
              className="loader-orbit-icon-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{
                opacity: { delay: 0.08 + index * 0.07, duration: 0.4 },
                y: { delay: index * 0.12, duration: 2.4, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              <item.Icon size={28} strokeWidth={ICON_STROKE} aria-hidden="true" />
            </motion.div>
          </div>
        ))}

        <div className="loader-orbit-brand">
          <motion.div
            className="loader-orbit-brand-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <SiteLogo logoUrl={logoUrl} gymName={gymName} variant="loader" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        <motion.div
          className="h-full bg-brass origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.4, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
