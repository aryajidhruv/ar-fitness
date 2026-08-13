import Scrubber from "./Scrubber";
import Reveal from "./Reveal";

export default function Hero({ featured, whatsappNumber, gymName }) {
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi Ajit, I want to book a free trial at ${gymName}`
  )}`;

  return (
    <header id="top" className="relative pt-[124px] overflow-hidden">
      <div
        className="pointer-events-none absolute -top-[18%] -right-[12%] w-[70vw] h-[70vw] max-w-[880px] max-h-[880px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(214,155,63,.19), rgba(214,155,63,0) 62%)" }}
      />
      <div className="relative w-[92%] max-w-[1200px] mx-auto">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <h1 className="font-display font-black uppercase leading-[.88] tracking-tight text-[46px] sm:text-[64px] lg:text-[88px]">
              <span className="block">Transformation</span>
              <span className="block">isn&rsquo;t magic.</span>
              <span className="block text-brass">It&rsquo;s a timeline.</span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-bone-dim font-light text-[17.5px]">
              {gymName} is a strength and fat-loss gym coached by Ajit Singh.
              {featured ? " Drag the slider — that's a real member's progress, day by day." : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-[22px] py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border border-brass bg-brass text-iron hover:bg-brass-lite hover:-translate-y-0.5 transition-all"
              >
                Book a free trial
              </a>
              <a
                href="#results"
                className="inline-flex items-center px-[22px] py-3 font-cond uppercase tracking-[.14em] font-semibold text-[14.5px] border border-white/15 hover:border-brass hover:text-brass transition-colors"
              >
                See real results
              </a>
            </div>
          </div>

          {featured ? (
            <div className="relative aspect-[4/5]">
              <Scrubber
                beforeUrl={featured.beforeUrl}
                afterUrl={featured.afterUrl}
                days={featured.days}
                name={featured.name}
                className="h-full"
                priority
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-iron/95 to-transparent flex justify-between items-end">
                <div>
                  <b className="font-display font-extrabold text-xl uppercase block">{featured.name}</b>
                  <small className="font-cond uppercase tracking-[.16em] text-[11.5px] text-bone-dim">
                    {featured.category.replace("-", " ")} · {featured.days} days
                  </small>
                </div>
                {featured.metricValue && (
                  <b className="font-display font-black text-2xl text-brass">{featured.metricValue}</b>
                )}
              </div>
            </div>
          ) : (
            <div className="aspect-[4/5] border border-white/10 bg-iron-2 grid place-items-center">
              <p className="font-cond uppercase tracking-[.2em] text-bone-dim text-sm px-6 text-center">
                Add your first transformation from the admin dashboard to feature it here
              </p>
            </div>
          )}
        </div>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-white/10 mt-14">
            {[
              { n: "9", label: "Years coaching" },
              { n: "500+", label: "Transformations" },
              { n: "4.9", label: "Google rating" },
              { n: "6", label: "Days a week open" }
            ].map((s, i) => (
              <div key={i} className="py-7 px-2 border-r border-white/10 last:border-r-0 border-b md:border-b-0 [&:nth-child(-n+2)]:border-b">
                <b className="block font-display font-black text-[34px] sm:text-[48px] leading-none text-brass">
                  {s.n}
                </b>
                <span className="font-cond uppercase tracking-[.16em] text-xs text-bone-dim">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </header>
  );
}
