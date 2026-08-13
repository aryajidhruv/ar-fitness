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
    <section id="programs" className="pb-24 md:pb-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> What we train
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            Pick your <em className="not-italic text-brass">goal</em>,<br />we&rsquo;ll build the plan
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap gap-3">
            {FOCUS_AREAS.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 border border-white/10 bg-iron-2 text-bone-dim"
              >
                <Icon className="w-5 h-5 text-brass shrink-0" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <span className="font-cond uppercase tracking-[.14em] text-[12px]">{label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-10">
            {PROGRAMS.map((p) => (
              <article key={p.title} className="group bg-iron hover:bg-iron-2 transition-colors p-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 h-0.5 w-0 bg-brass transition-all duration-500 group-hover:w-full" />
                <p.Icon className="w-9 h-9 text-brass mb-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <h3 className="font-display font-bold uppercase text-[24px] leading-tight">{p.title}</h3>
                <p className="text-bone-dim font-light text-[15.5px] mt-2.5">{p.desc}</p>
                <p className="font-cond uppercase tracking-[.16em] text-[11.5px] text-brass mt-4">{p.meta}</p>
              </article>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
