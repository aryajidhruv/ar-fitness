import Image from "next/image";
import Reveal from "./Reveal";

export default function Coach({ ownerName, ownerPhotoUrl }) {
  const [firstName, ...rest] = (ownerName || "Ajit Singh").split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="coach" className="py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center">
        <Reveal>
          <div className="relative aspect-[3/4] border border-white/10 overflow-hidden">
            {ownerPhotoUrl ? (
              ownerPhotoUrl.startsWith("/uploads/") ? (
                <Image
                  src={ownerPhotoUrl}
                  alt={ownerName || "Coach"}
                  fill
                  sizes="(max-width: 768px) 92vw, 420px"
                  className="object-cover"
                />
              ) : (
                // Legacy external URLs (e.g. Google Drive links saved in settings)
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={ownerPhotoUrl}
                  alt={ownerName || "Coach"}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#3a2d1c] via-[#1d1815] to-[#141110]" />
            )}
            <div className="absolute inset-3.5 border border-brass/30 pointer-events-none" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> The coach
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            {firstName} <em className="not-italic text-brass">{lastName || "Singh"}</em>
          </h2>
          <p className="mt-5 max-w-[56ch] text-bone-dim font-light">
            Nine years on the gym floor, and one rule that hasn&rsquo;t changed: the plan has to fit your life,
            not the other way round. {ownerName} programs around your job, your commute and what your family
            actually cooks at home — then holds you to it, week after week.
          </p>
          <p className="mt-4 max-w-[56ch] text-bone-dim font-light">
            Every member starts with a body composition check and a sit-down conversation. No crash diets,
            no supplements you don&rsquo;t need, no contracts you can&rsquo;t get out of.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-6">
            {["Certified personal trainer", "Sports nutrition", "Strength & conditioning", "Post-injury training"].map(
              (c) => (
                <span
                  key={c}
                  className="font-cond uppercase tracking-[.13em] text-xs px-3.5 py-1.5 border border-white/10 text-bone-dim"
                >
                  {c}
                </span>
              )
            )}
          </div>
          <blockquote className="mt-7 pl-5 border-l-2 border-brass font-display font-semibold uppercase text-[21px] sm:text-[27px] leading-tight">
            &ldquo;Consistency beats intensity. Show up 4 days a week for a year and I&rsquo;ll show you a different
            person.&rdquo;
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
