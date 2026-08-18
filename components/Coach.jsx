import UploadImage, { isLocalUpload } from "./UploadImage";
import Reveal from "./Reveal";

function TrainerPhoto({ name, photoUrl }) {
  return (
    <div className="relative aspect-[3/4] border border-white/10 overflow-hidden">
      {photoUrl ? (
        isLocalUpload(photoUrl) ? (
          <UploadImage src={photoUrl} alt={name} fill className="object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt={name} className="absolute inset-0 w-full h-full object-cover" />
        )
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2d1c] via-[#1d1815] to-[#141110]" />
      )}
      <div className="absolute inset-3.5 border border-brass/30 pointer-events-none" />
    </div>
  );
}

function TrainerBlock({ trainer, reversed, showHeader }) {
  const [firstName, ...rest] = (trainer.name || "").split(" ");
  const lastName = rest.join(" ");

  return (
    <div
      className={`grid md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-16 items-center ${
        showHeader ? "" : "mt-20 md:mt-28"
      }`}
    >
      <Reveal className={reversed ? "md:order-2" : ""}>
        <TrainerPhoto name={trainer.name} photoUrl={trainer.photoUrl} />
      </Reveal>
      <Reveal delay={0.1} className={reversed ? "md:order-1" : ""}>
        {showHeader && (
          <>
            <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
              <span className="w-7 h-px bg-brass" /> The team
            </p>
            <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
              Meet your <em className="not-italic text-brass">coaches</em>
            </h2>
          </>
        )}
        {!showHeader && trainer.role && (
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> {trainer.role}
          </p>
        )}
        <h3
          className={`font-display font-extrabold uppercase leading-[.92] text-[32px] sm:text-[44px] ${
            showHeader ? "mt-8" : "mt-4"
          }`}
        >
          {firstName} <em className="not-italic text-brass">{lastName}</em>
        </h3>
        {showHeader && trainer.role && (
          <p className="mt-2 font-cond uppercase tracking-[.14em] text-sm text-bone-dim">{trainer.role}</p>
        )}
        {trainer.bio && <p className="mt-5 max-w-[56ch] text-bone-dim font-light">{trainer.bio}</p>}
        {trainer.bioExtra && <p className="mt-4 max-w-[56ch] text-bone-dim font-light">{trainer.bioExtra}</p>}
        {trainer.credentials?.length > 0 && (
          <div className="flex flex-wrap gap-2.5 mt-6">
            {trainer.credentials.map((c) => (
              <span
                key={c}
                className="font-cond uppercase tracking-[.13em] text-xs px-3.5 py-1.5 border border-white/10 text-bone-dim"
              >
                {c}
              </span>
            ))}
          </div>
        )}
        {trainer.quote && (
          <blockquote className="mt-7 pl-5 border-l-2 border-brass font-display font-semibold uppercase text-[21px] sm:text-[27px] leading-tight">
            &ldquo;{trainer.quote}&rdquo;
          </blockquote>
        )}
      </Reveal>
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
    <section id="coach" className="py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        {list.map((trainer, i) => (
          <TrainerBlock key={trainer._id} trainer={trainer} reversed={i % 2 === 1} showHeader={i === 0} />
        ))}
      </div>
    </section>
  );
}
