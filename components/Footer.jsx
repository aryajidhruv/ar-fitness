const LINKS = [
  { href: "#coach", label: "Coach" },
  { href: "#programs", label: "Programs" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Gallery" },
  { href: "#instagram", label: "Instagram" },
  { href: "#plans", label: "Membership" },
  { href: "#visit", label: "Visit" }
];

export default function Footer({ gymName, ownerName }) {
  return (
    <footer className="pt-16 pb-9">
      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="flex justify-between flex-wrap gap-7 pb-8 border-b border-white/10">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="w-[34px] h-[34px] grid place-items-center border border-brass font-display font-black text-brass text-[17px]">
              AR
            </span>
            <span className="font-display font-extrabold text-[22px] uppercase tracking-wide">
              AR <span className="text-brass">Fitness</span>
            </span>
          </a>
          <div className="flex gap-6 flex-wrap font-cond uppercase tracking-[.14em] text-[13.5px] text-bone-dim">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-brass transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="pt-6 flex justify-between flex-wrap gap-4 text-[13px] text-bone-dim">
          <span>
            © {new Date().getFullYear()} {gymName}. Owned and coached by {ownerName}.
          </span>
          <span>Results shown are of real members and vary person to person.</span>
        </div>
      </div>
    </footer>
  );
}
