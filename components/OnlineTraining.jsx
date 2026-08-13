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
    <section id="online" className="bg-iron-2 border-y border-white/10 py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> Online training
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4 max-w-[16ch]">
            Train anywhere.<br />
            Stay <em className="not-italic text-brass">accountable</em>.
          </h2>
          <p className="mt-5 max-w-[58ch] text-bone-dim font-light text-[17px]">
            Can&rsquo;t make it to the gym every day? Same coaching, programming and check-ins — delivered to your phone.
            Whether you moved cities, travel for work or prefer training at home, {coachFirst} keeps you on plan.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mt-12">
            {STEPS.map((step) => (
              <article key={step.title} className="bg-iron p-8">
                <step.Icon className="w-9 h-9 text-brass mb-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <h3 className="font-display font-bold uppercase text-[22px] leading-tight">{step.title}</h3>
                <p className="text-bone-dim font-light text-[15.5px] mt-2.5">{step.desc}</p>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 md:gap-16 items-start mt-14">
          <Reveal delay={0.1}>
            <div className="border border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <Timer className="w-8 h-8 text-brass shrink-0" strokeWidth={ICON_STROKE} aria-hidden="true" />
                <h3 className="font-display font-bold uppercase text-[26px] leading-tight">What&rsquo;s included</h3>
              </div>
              <ul className="space-y-3.5">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex gap-3 items-start text-[15px] font-light text-bone-dim">
                    <span className="w-[5px] h-[5px] bg-brass rotate-45 flex-none mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="border border-brass/40 bg-iron p-8">
              <p className="font-cond uppercase tracking-[.18em] text-xs text-brass">Anywhere in India</p>
              <p className="font-display font-black text-[42px] leading-none mt-3">
                Same coach.<br />Your schedule.
              </p>
              <p className="mt-4 text-bone-dim font-light text-[15px]">
                No app downloads or complicated dashboards — just a clear plan and direct access to your coach on WhatsApp.
              </p>
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center mt-7 px-[22px] py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border border-brass bg-brass text-iron hover:bg-brass-lite hover:-translate-y-0.5 transition-all"
              >
                Enquire about online training
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
