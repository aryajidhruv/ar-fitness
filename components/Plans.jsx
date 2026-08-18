"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const PLANS = [
  {
    name: "1 Month",
    price: "1,000",
    per: "first month",
    note: "₹900/month from month 2 onwards",
    features: ["Full gym floor access", "Starter training plan", "Body composition check"]
  },
  {
    name: "3 Months",
    price: "2,500",
    per: "for 3 months",
    best: true,
    features: ["Everything in 1 Month", "Custom diet guidance", "Progress check-ins"]
  },
  {
    name: "6 Months",
    price: "4,600",
    per: "for 6 months",
    features: ["Best value mid-term", "Full gym access", "Diet & training support"]
  },
  {
    name: "1 Year",
    price: "9,000",
    per: "for 12 months",
    features: ["Lowest monthly cost", "Full gym access", "Long-term coaching support"]
  },
  {
    name: "Personal training",
    contactOnly: true,
    features: [
      "One-on-one with your coach",
      "Every session programmed",
      "Weekly WhatsApp check-in",
      "Diet reviewed regularly"
    ]
  }
];

export default function Plans({ whatsappNumber }) {
  function planHref(plan) {
    const text = plan.contactOnly
      ? "Hi, I want to know about personal training"
      : `Hi, I want the ${plan.name} membership plan`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  return (
    <section id="plans" className="py-24 md:py-32 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <Reveal>
          <motion.p 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
          >
            <span className="w-8 h-px bg-white/40" /> Membership
          </motion.p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3">
            No contracts.<br />No <em className="not-italic text-neutral-400 font-normal">joining fee</em>.
          </h2>
          <p className="mt-4 text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed">
            First session is free — come train, look around, then decide.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {PLANS.map((p, index) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 50, rotateX: 12 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.7, 
                  delay: (index % 3) * 0.08, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.02, 
                  transition: { duration: 0.2 } 
                }}
                className={`relative border p-8 bg-black overflow-hidden group ${
                  p.best ? "border-white/40 bg-[#0c0c0c]" : "border-white/10 hover:border-white/40"
                }`}
              >
                {/* Expanding Top Border Bar */}
                <div className="absolute top-0 left-0 h-1 w-0 bg-white transition-all duration-500 group-hover:w-full" />

                {p.best && (
                  <motion.span 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="absolute -top-px -right-px bg-white text-black font-cond uppercase tracking-[.18em] text-xs font-bold px-3.5 py-1.5"
                  >
                    Most joined
                  </motion.span>
                )}

                <h3 className="font-cond uppercase tracking-[.2em] text-xs font-bold text-neutral-400">{p.name}</h3>
                
                {p.contactOnly ? (
                  <>
                    <p className="font-display font-black text-[38px] leading-none mt-3.5 tracking-tight text-white">1-on-1</p>
                    <p className="font-cond uppercase tracking-[.15em] text-xs font-bold text-neutral-400 mt-1">
                      Pricing on enquiry
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-display font-black text-[46px] leading-none mt-3.5 tracking-tight text-white">
                      <sup className="text-[.44em] align-super font-bold text-neutral-400">₹</sup>
                      {p.price}
                    </div>
                    <p className="font-cond uppercase tracking-[.15em] text-xs font-bold text-neutral-400 mt-1">{p.per}</p>
                    {p.note && (
                      <p className="font-cond uppercase tracking-[.15em] text-[11px] font-bold text-neutral-400 mt-2">{p.note}</p>
                    )}
                  </>
                )}

                <ul className="my-6 space-y-3">
                  {p.features.map((f, idx) => (
                    <motion.li 
                      key={f} 
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 + 0.2, duration: 0.4 }}
                      className="flex gap-3 items-start text-sm sm:text-base font-normal text-neutral-300"
                    >
                      <span className="w-[5px] h-[5px] bg-white rotate-45 flex-none mt-2" />
                      {f}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={planHref(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex justify-center py-4 font-cond uppercase tracking-[.15em] font-bold text-xs sm:text-sm border transition-all ${
                    p.contactOnly || p.best
                      ? "bg-white border-white text-black hover:bg-neutral-200 shadow-2xl"
                      : "border-white/20 bg-black text-neutral-300 hover:border-white hover:text-white"
                  }`}
                >
                  {p.contactOnly ? "Contact us" : "Enquire"}
                </motion.a>
              </motion.div>
            ))}
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 font-cond uppercase tracking-[.15em] text-xs font-bold text-neutral-400"
          >
            Open Mon–Sat · Morning 6 AM – 12 PM · Evening 4 PM – 10 PM · Sunday closed
          </motion.p>
        </Reveal>
      </div>
    </section>
  );
}