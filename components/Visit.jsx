import Reveal from "./Reveal";

export default function Visit({ settings }) {
  const waHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi Ajit, I want to book a free trial at ${settings.gymName}`
  )}`;

  return (
    <section id="visit" className="bg-iron-2 border-y border-white/10 py-24 md:py-32">
      <div className="w-[92%] max-w-[1200px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> Come see it
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            Walk in.<br />First session&rsquo;s <em className="not-italic text-brass">on us</em>.
          </h2>
          <p className="mt-4 text-bone-dim font-light">
            Message on WhatsApp and {settings.ownerName?.split(" ")[0]} will reply himself — usually within the hour.
          </p>

          <div className="border-t border-white/10 mt-8">
            {[
              ["Monday — Saturday (Morning)", "6:00 AM – 12:00 PM"],
              ["Monday — Saturday (Evening)", "4:00 PM – 10:00 PM"],
              ["Sunday", "Closed"],
              ["Address", settings.address || "Add your address from the admin dashboard"],
              ["Phone", settings.phone || "Add a phone number from the admin dashboard"]
            ].map(([label, val]) => (
              <div
                key={label}
                className="flex justify-between gap-4 py-3.5 border-b border-white/10 font-cond uppercase tracking-[.1em] text-[15px]"
              >
                <span>{label}</span>
                <span className="text-brass text-right">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3.5 mt-8">
            <a
              href={waHref}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center px-[22px] py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border border-brass bg-brass text-iron hover:bg-brass-lite transition-colors"
            >
              Message on WhatsApp
            </a>
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center px-[22px] py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border border-white/15 hover:border-brass hover:text-brass transition-colors"
              >
                Call the gym
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="aspect-[4/3] border border-white/10 relative overflow-hidden">
            {settings.mapEmbedUrl ? (
              <iframe
                src={settings.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${settings.gymName} location map`}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#20262a] to-[#141719] grid place-items-center">
                <span className="font-cond uppercase tracking-[.18em] text-bone-dim text-xs">
                  Add a Google Maps embed link from settings
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
