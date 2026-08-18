"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import {
  ICON_STROKE,
  MessageCircle,
  Smartphone,
  Timer,
  Video
} from "./icons/gymLucide";

const STEPS = [
  {
    title: "Tell us your goal",
    desc: "Fat loss, muscle gain or general fitness — plus your schedule, equipment and any injuries.",
    Icon: MessageCircle
  },
  {
    title: "Get your plan",
    desc: "A weekly training program built around what you actually have — home dumbbells, apartment gym or travel hotel.",
    Icon: Smartphone
  },
  {
    title: "Check in every week",
    desc: "Send progress updates and form videos on WhatsApp. Your coach adjusts the plan so you keep moving forward.",
    Icon: Video
  }
];

const INCLUDES = [
  "Custom workout plan updated weekly",
  "Indian meal guidance that fits your kitchen",
  "Form checks via video on WhatsApp",
  "Weekly accountability check-ins",
  "Progress tracking — weight, photos, measurements"
];

export default function OnlineTraining({ whatsappNumber, gymName, ownerName }) {
  const coachFirst = ownerName?.split(" ")[0] || "Ajit";
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi ${coachFirst}, I want to know more about online training at ${gymName}`
  )}`;

  return (
    <section id="online" className="bg-black border-y border-white/10 py-24 md:py-32 text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <Reveal>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/40" /> Online training
          </motion.p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3 max-w-[16ch]">
            Train anywhere.<br />
            Stay <em className="not-italic text-neutral-400 font-normal">accountable</em>.
          </h2>
          <p className="mt-5 max-w-[58ch] text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed">
            Can&rsquo;t make it to the gym every day? Same coaching, programming and check-ins — delivered to your phone.
            Whether you moved cities, travel for work or prefer training at home, {coachFirst} keeps you on plan.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-12">
            {STEPS.map((step, index) => (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 40, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  backgroundColor: "#0c0c0c", 
                  scale: 1.02,
                  zIndex: 20,
                  transition: { duration: 0.2 }
                }}
                className="bg-black p-8 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />
                <motion.div
                  whileHover={{ rotate: [0, -12, 12, 0], scale: 1.15 }}
                  transition={{ duration: 0.4 }}
                  className="inline-block"
                >
                  <step.Icon className="w-9 h-9 text-white mb-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                </motion.div>
                <h3 className="font-display font-bold uppercase text-[22px] tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-neutral-300 font-normal text-sm sm:text-base leading-relaxed mt-2.5">
                  {step.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-start mt-14">
          <Reveal delay={0.1}>
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/10 bg-black p-8 hover:border-white/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-8 h-8 text-white shrink-0" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <h3 className="font-display font-bold uppercase text-[26px] tracking-tight text-white">What&rsquo;s included</h3>
              </div>
              <ul className="space-y-3.5">
                {INCLUDES.map((item, idx) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.06 + 0.2, duration: 0.5 }}
                    className="flex gap-3 items-start text-sm sm:text-base font-normal text-neutral-300"
                  >
                    <span className="w-[5px] h-[5px] bg-white rotate-45 flex-none mt-2" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Reveal>

          <Reveal delay={0.14}>
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="border border-white/20 bg-black p-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 h-full w-1 bg-white/20 group-hover:bg-white transition-all duration-500" />
              <p className="font-cond uppercase tracking-[.18em] text-xs font-bold text-neutral-400">Anywhere in India</p>
              <p className="font-display font-black uppercase text-[42px] leading-none tracking-tight text-white mt-3">
                Same coach.<br />Your schedule.
              </p>
              <p className="mt-4 text-neutral-300 font-normal text-sm sm:text-base leading-relaxed">
                No app downloads or complicated dashboards — just a clear plan and direct access to your coach on WhatsApp.
              </p>
              <motion.a
                whileHover={{ scale: 1.02, backgroundColor: "#f5f5f5" }}
                whileTap={{ scale: 0.98 }}
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-7 px-8 py-4 font-cond uppercase tracking-[.15em] font-bold text-xs sm:text-sm bg-white text-black transition-colors shadow-2xl"
              >
                Enquire about online training
              </motion.a>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}