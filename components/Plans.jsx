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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
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
                {p.contactOnly ? (
                  <>
                    <p className="font-display font-black text-[38px] leading-none mt-3.5 text-brass">1-on-1</p>
                    <p className="font-cond uppercase tracking-[.14em] text-xs text-bone-dim mt-1">
                      Pricing on enquiry
                    </p>
                  </>
                ) : (
                  <>
                    <div className="font-display font-black text-[46px] leading-none mt-3.5">
                      <sup className="text-[.44em] align-super font-bold text-brass">₹</sup>
                      {p.price}
                    </div>
                    <p className="font-cond uppercase tracking-[.14em] text-xs text-bone-dim mt-1">{p.per}</p>
                    {p.note && (
                      <p className="font-cond uppercase tracking-[.12em] text-[11px] text-brass mt-2">{p.note}</p>
                    )}
                  </>
                )}
                <ul className="my-6 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 items-start text-[15px] font-light text-bone-dim">
                      <span className="w-[5px] h-[5px] bg-brass rotate-45 flex-none mt-2" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={planHref(p)}
                  target="_blank"
                  rel="noopener"
                  className={`w-full flex justify-center py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border transition-all ${
                    p.contactOnly || p.best
                      ? "bg-brass border-brass text-iron hover:bg-brass-lite"
                      : "border-white/15 hover:border-brass hover:text-brass"
                  }`}
                >
                  {p.contactOnly ? "Contact us" : "Enquire"}
                </a>
              </div>
            ))}
          </div>
          <p className="mt-5 font-cond uppercase tracking-[.14em] text-xs text-bone-dim">
            Open Mon–Sat · Morning 6 AM – 12 PM · Evening 4 PM – 10 PM · Sunday closed
          </p>
        </Reveal>
      </div>
    </section>
  );
}
