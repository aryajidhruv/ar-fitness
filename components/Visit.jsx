import Reveal from "./Reveal";

export default function Visit({ settings }) {
  const waHref = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi Ajit, I want to book a free trial at ${settings.gymName}`
  )}`;

  return (
    <section id="visit" className="bg-black border-y border-white/10 py-24 md:py-32 text-white selection:bg-white selection:text-black">
      <div className="w-[92%] max-w-[1300px] mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <p className="font-cond uppercase tracking-[.25em] text-xs font-bold text-neutral-400 flex items-center gap-3">
            <span className="w-8 h-px bg-white/40" /> Come see it
          </p>
          <h2 className="font-display font-black uppercase leading-[0.88] text-[40px] sm:text-[60px] lg:text-[72px] tracking-tight text-white mt-3">
            Walk in.<br />First session&rsquo;s <em className="not-italic text-neutral-400 font-normal">on us</em>.
          </h2>
          <p className="mt-4 text-neutral-300 font-normal text-sm sm:text-[16px] leading-relaxed">
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
                className="flex justify-between gap-4 py-3.5 border-b border-white/10 font-cond uppercase tracking-[.15em] text-xs sm:text-sm font-bold"
              >
                <span className="text-neutral-400">{label}</span>
                <span className="text-white text-right">{val}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3.5 mt-8">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 font-cond uppercase tracking-[.15em] font-bold text-xs sm:text-sm bg-white text-black hover:bg-neutral-200 transition-colors shadow-2xl"
            >
              Message on WhatsApp
            </a>
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center px-8 py-4 font-cond uppercase tracking-[.15em] font-bold text-xs sm:text-sm border border-white/20 bg-black text-neutral-300 hover:border-white hover:text-white transition-all"
              >
                Call the gym
              </a>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="aspect-[4/3] border border-white/20 relative overflow-hidden bg-black">
            {settings.mapEmbedUrl ? (
              <iframe
                src={settings.mapEmbedUrl}
                className="absolute inset-0 w-full h-full border-0 filter grayscale contrast-125 invert opacity-90"
                loading="lazy"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${settings.gymName} location map`}
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] grid place-items-center">
                <span className="font-cond uppercase tracking-[.18em] text-xs font-bold text-neutral-400 text-center px-4">
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