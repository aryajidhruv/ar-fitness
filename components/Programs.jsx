"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  Activity,
  BicepsFlexed,
  Dumbbell,
  Flame,
  HeartPulse,
  ICON_STROKE,
  PersonStanding,
  Target,
  Timer
} from "./icons/gymLucide";

const PROGRAMS = [
  {
    title: "Fat loss",
    meta: "4–5 days / week",
    desc: "Calorie-controlled Indian meal plans plus strength work, so you lose fat and keep the muscle underneath.",
    Icon: HeartPulse
  },
  {
    title: "Muscle gain",
    meta: "5 days / week",
    desc: "Progressive overload tracked set by set. You'll know exactly what you lifted last week and what you owe this week.",
    Icon: BicepsFlexed
  },
  {
    title: "Personal training",
    meta: "Limited slots",
    desc: "One-on-one with your coach. Every rep watched, every session logged, weekly check-ins on WhatsApp.",
    Icon: Target
  },
  {
    title: "Strength & powerlifting",
    meta: "3–4 days / week",
    desc: "Squat, bench, deadlift. Technique first, numbers second — and the numbers come quickly after that.",
    Icon: Dumbbell
  },
  {
    title: "Group classes",
    meta: "Mornings & evenings",
    desc: "HIIT, circuits and functional training in small batches. Harder to skip when six people notice you're missing.",
    Icon: Flame
  },
  {
    title: "Online coaching",
    meta: "Anywhere in India",
    desc: "Moved cities or travel for work? Same programming and check-ins, delivered to your phone.",
    Icon: Timer
  }
];

const FOCUS_AREAS = [
  { label: "Shoulders", Icon: BicepsFlexed },
  { label: "Back & posture", Icon: PersonStanding },
  { label: "Legs", Icon: Activity }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 md:py-32 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <Reveal>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/40" /> What we train
          </motion.p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3">
            Pick your <em className="not-italic text-neutral-400 font-normal">goal</em>,<br />we&rsquo;ll build the plan
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            {FOCUS_AREAS.map(({ label, Icon }, i) => (
              <motion.span
                key={label}
                whileHover={{ scale: 1.06, rotate: i % 2 === 0 ? 2 : -2, backgroundColor: "#111" }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-white/10 bg-black text-neutral-300 cursor-default transition-colors"
              >
                <Icon className="w-5 h-5 text-white shrink-0" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <span className="font-cond uppercase tracking-[.14em] text-[12px] font-bold">{label}</span>
              </motion.span>
            ))}
          </motion.div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-10">
            {PROGRAMS.map((p, index) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 50, rotateX: 15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  backgroundColor: "#0c0c0c", 
                  scale: 1.02,
                  zIndex: 20,
                  transition: { duration: 0.2 }
                }}
                className="group bg-black p-8 relative overflow-hidden"
              >
                {/* Expanding Top Border Bar */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />
                
                {/* Floating Icon Animation on Card Hover */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  <p.Icon className="w-9 h-9 text-white mb-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                </motion.div>

                <h3 className="font-display font-bold uppercase text-[24px] tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                  {p.title}
                </h3>
                
                <p className="text-neutral-300 font-normal text-sm sm:text-base leading-relaxed mt-2.5">
                  {p.desc}
                </p>
                
                <p className="font-cond uppercase tracking-[.16em] text-[11.5px] font-bold text-neutral-400 mt-4 group-hover:text-white transition-colors">
                  {p.meta}
                </p>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}