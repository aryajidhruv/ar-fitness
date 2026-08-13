const WORDS = ["Fat loss", "Strength", "Personal training", "Nutrition", "Group classes", "Powerlifting"];

export default function Marquee() {
  const items = [...WORDS, ...WORDS];
  return (
    <div className="border-y border-white/10 bg-iron-2 overflow-hidden py-4" aria-hidden="true">
      <div className="flex w-max animate-marquee">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 font-display font-bold uppercase text-[26px] tracking-wide text-white/30 whitespace-nowrap"
          >
            {w}
            <span className="w-1.5 h-1.5 bg-brass rotate-45 block" />
          </span>
        ))}
      </div>
    </div>
  );
}
