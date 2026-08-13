import Reveal from "./Reveal";

const PLANS = [
  {
    name: "Monthly",
    price: "1,500",
    per: "per month",
    features: ["Full gym floor access", "Body composition check", "Starter training plan", "Open 6 days a week"]
  },
  {
    name: "Quarterly",
    price: "4,000",
    per: "for 3 months",
    best: true,
    features: ["Everything in Monthly", "Custom diet plan", "Monthly progress photos", "Group classes included"]
  },
  {
    name: "Personal training",
    price: "6,000",
    per: "per month",
    features: ["One-on-one with your coach", "Every session programmed", "Weekly WhatsApp check-in", "Diet reviewed fortnightly"]
  }
];

export default function Plans({ whatsappNumber }) {
  return (
    <section id="plans" className="pb-24 md:pb-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> Membership
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            No contracts.<br />No <em className="not-italic text-brass">joining fee</em>.
          </h2>
          <p className="mt-4 text-bone-dim font-light">First session is free — come train, look around, then decide.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="grid md:grid-cols-3 gap-5 mt-12">
            {PLANS.map((p) => (
              <div
                key={p.name}
                className={`relative border p-8 hover:-translate-y-1.5 transition-transform duration-500 ${
                  p.best ? "border-brass bg-iron-2" : "border-white/10 hover:border-brass/45"
                }`}
              >
                {p.best && (
                  <span className="absolute -top-px -right-px bg-brass text-iron font-cond uppercase tracking-[.16em] text-[11px] font-semibold px-3 py-1.5">
                    Most joined
                  </span>
                )}
                <h3 className="font-cond uppercase tracking-[.2em] text-sm text-bone-dim font-semibold">{p.name}</h3>
                <div className="font-display font-black text-[46px] leading-none mt-3.5">
                  <sup className="text-[.44em] align-super font-bold text-brass">₹</sup>
                  {p.price}
                </div>
                <p className="font-cond uppercase tracking-[.14em] text-xs text-bone-dim mt-1">{p.per}</p>
                <ul className="my-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 items-start text-[15px] font-light text-bone-dim">
                      <span className="w-[5px] h-[5px] bg-brass rotate-45 flex-none mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I want the ${p.name} plan`)}`}
                  target="_blank"
                  rel="noopener"
                  className={`w-full flex justify-center py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border transition-all ${
                    p.best
                      ? "bg-brass border-brass text-iron hover:bg-brass-lite"
                      : "border-white/15 hover:border-brass hover:text-brass"
                  }`}
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
          <p className="mt-5 font-cond uppercase tracking-[.14em] text-xs text-bone-dim">
            Half-yearly and annual plans available at the desk
          </p>
        </Reveal>
      </div>
    </section>
  );
}
