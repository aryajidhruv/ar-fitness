import Reveal from "./Reveal";

export default function Testimonials({ items }) {
  if (!items?.length) return null;

  return (
    <section className="pb-24 md:pb-32">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <Reveal>
          <p className="font-cond uppercase tracking-[.22em] text-[13px] font-semibold text-brass flex items-center gap-3">
            <span className="w-7 h-px bg-brass" /> In their words
          </p>
          <h2 className="font-display font-extrabold uppercase leading-[.92] text-[38px] sm:text-[56px] mt-4">
            Why they <em className="not-italic text-brass">stayed</em>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 mt-11">
          {items.map((t, i) => (
            <Reveal key={t._id} delay={Math.min(i * 0.08, 0.24)}>
              <div className="border border-white/10 bg-iron-2 p-7 h-full flex flex-col">
                <div className="text-brass tracking-[3px] text-sm mb-3.5">{"★".repeat(t.rating)}</div>
                <p className="text-[16px] font-light flex-1">{t.text}</p>
                <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                  <span className="w-10 h-10 rounded-full bg-gradient-to-br from-brass to-rust grid place-items-center font-display font-extrabold text-iron text-base flex-none">
                    {t.name?.[0] || "?"}
                  </span>
                  <div>
                    <b className="font-cond uppercase tracking-[.12em] text-sm font-semibold block">{t.name}</b>
                    {t.tenure && (
                      <small className="text-bone-dim text-[12.5px] font-cond uppercase tracking-[.1em]">
                        {t.tenure}
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
