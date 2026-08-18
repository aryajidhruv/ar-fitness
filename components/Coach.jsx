"use client";

import { motion } from "framer-motion";
import UploadImage, { isLocalUpload } from "./UploadImage";

const EASE = [0.16, 1, 0.3, 1];

function TrainerPhoto({ name, photoUrl }) {
  return (
    <div className="relative aspect-[3/4] border border-white/10 bg-black shadow-2xl overflow-hidden group rounded-none">
      {/* Photo itself: starts slightly zoomed + dimmed, settles into place as it enters view */}
      <motion.div
        initial={{ scale: 1.18, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="absolute inset-0 w-full h-full"
      >
        {photoUrl ? (
          isLocalUpload(photoUrl) ? (
            <UploadImage
              src={photoUrl}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoUrl}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale contrast-125"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a2218] via-[#161311] to-[#0a0908]" />
        )}
      </motion.div>

      {/* Curtain wipe: solid panel slides up off the photo on reveal, like a shutter lifting */}
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        className="absolute inset-0 bg-black z-10 pointer-events-none"
      />

      {/* Clean Inner Frame matching landing page vibe */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        className="absolute inset-3.5 border border-white/20 pointer-events-none transition-colors duration-500 group-hover:border-white/50"
      />

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
    </div>
  );
}

function TrainerBlock({ trainer, reversed, showHeader }) {
  const [firstName, ...rest] = (trainer.name || "").split(" ");
  const lastName = rest.join(" ");

  const textContainer = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.09, delayChildren: 0.1 },
    },
  };

  const textItem = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
  };

  return (
    <div
      className={`grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center ${
        showHeader ? "" : "mt-24 md:mt-36 pt-16 border-t border-white/10 relative overflow-hidden"
      }`}
    >
      {!showHeader && (
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{ transformOrigin: "left" }}
          className="absolute top-16 left-0 right-0 h-px bg-white/60"
        />
      )}

      <div className={reversed ? "md:order-2" : ""}>
        <TrainerPhoto name={trainer.name} photoUrl={trainer.photoUrl} />
      </div>

      <motion.div
        variants={textContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className={reversed ? "md:order-1" : ""}
      >
        {showHeader && (
          <div className="mb-6">
            <motion.p
              variants={textItem}
              className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3"
            >
              <motion.span
                initial={{ width: 0 }}
                whileInView={{ width: "2rem" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
                className="h-px bg-white/40 inline-block"
              />
              The team
            </motion.p>

            {/* Title styled with clean typography matching Hero section */}
            <motion.h2
              variants={textItem}
              className="font-display font-black uppercase leading-[0.88] text-[48px] sm:text-[68px] lg:text-[80px] tracking-tight text-white mt-3 selection:bg-white selection:text-black"
            >
              Meet your <em className="not-italic text-neutral-400 font-normal">coaches</em>
            </motion.h2>
          </div>
        )}

        {!showHeader && trainer.role && (
          <motion.p
            variants={textItem}
            className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3 mb-2"
          >
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: "2rem" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
              className="h-px bg-white/40 inline-block"
            />
            {trainer.role}
          </motion.p>
        )}

        <motion.h3
          variants={textItem}
          className={`font-display font-black uppercase leading-[0.9] tracking-tight text-[36px] sm:text-[52px] text-white ${
            showHeader ? "mt-4" : "mt-2"
          }`}
        >
          {firstName} <em className="not-italic text-neutral-400 font-normal">{lastName}</em>
        </motion.h3>

        {showHeader && trainer.role && (
          <motion.p
            variants={textItem}
            className="mt-2.5 font-cond uppercase tracking-[.18em] text-xs font-bold text-neutral-400"
          >
            {trainer.role}
          </motion.p>
        )}

        {trainer.bio && (
          <motion.p
            variants={textItem}
            className="mt-6 max-w-[56ch] text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed"
          >
            {trainer.bio}
          </motion.p>
        )}

        {trainer.bioExtra && (
          <motion.p
            variants={textItem}
            className="mt-4 max-w-[56ch] text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed"
          >
            {trainer.bioExtra}
          </motion.p>
        )}

        {trainer.credentials?.length > 0 && (
          <motion.div variants={textItem} className="flex flex-wrap gap-2.5 mt-8">
            {trainer.credentials.map((c, idx) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 10, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.05 * idx }}
                whileHover={{ scale: 1.03 }}
                className="font-cond uppercase tracking-[.15em] text-[11px] font-bold px-3.5 py-1.5 border border-white/20 bg-white/[0.03] text-neutral-300 backdrop-blur-sm transition-colors duration-300 hover:bg-white hover:text-black hover:border-white"
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        )}

        {trainer.quote && (
          <motion.blockquote
            variants={textItem}
            className="mt-8 pl-5 border-l-2 border-white font-display font-bold uppercase text-[20px] sm:text-[26px] leading-tight tracking-wide text-white"
          >
            &ldquo;{trainer.quote}&rdquo;
          </motion.blockquote>
        )}
      </motion.div>
    </div>
  );
}

export default function Coach({ trainers = [], ownerName, ownerPhotoUrl }) {
  const fallback = ownerName
    ? [
        {
          _id: "fallback",
          name: ownerName,
          role: "Head coach",
          bio: `Nine years on the gym floor, and one rule that hasn't changed: the plan has to fit your life, not the other way round. ${ownerName} programs around your job, your commute and what your family actually cooks at home — then holds you to it, week after week.`,
          bioExtra:
            "Every member starts with a body composition check and a sit-down conversation. No crash diets, no supplements you don't need, no contracts you can't get out of.",
          credentials: [
            "Certified personal trainer",
            "Sports nutrition",
            "Strength & conditioning",
            "Post-injury training"
          ],
          quote:
            "Consistency beats intensity. Show up 4 days a week for a year and I'll show you a different person.",
          photoUrl: ownerPhotoUrl || ""
        }
      ]
    : [];

  const list = trainers.length > 0 ? trainers : fallback;
  if (list.length === 0) return null;

  return (
    <section id="coach" className="relative py-24 md:py-36 bg-black text-white selection:bg-white selection:text-black overflow-hidden">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        {list.map((trainer, i) => (
          <TrainerBlock key={trainer._id} trainer={trainer} reversed={i % 2 === 1} showHeader={i === 0} />
        ))}
      </div>
    </section>
  );
}