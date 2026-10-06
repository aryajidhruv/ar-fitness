import Image from "next/image";

const LINKS = [
  { href: "#coach", label: "Coach" },
  { href: "#programs", label: "Programs" },
  { href: "#online", label: "Online" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Gallery" },
  { href: "#instagram", label: "Instagram" },
  { href: "#plans", label: "Membership" },
  { href: "#visit", label: "Visit" }
];

export default function Footer({ gymName, ownerName, logoUrl }) {
  return (
    <footer className="bg-black text-white border-t border-white/10 pt-20 pb-12 selection:bg-white selection:text-black">
      <div className="w-[92%] max-w-[1400px] mx-auto">
        
        {/* Top Section: Logo & Navigation */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 pb-12 border-b border-white/10">
          <a href="#top" className="flex items-center gap-3 group">
            {logoUrl ? (
              <div className="relative w-8 h-8 rounded bg-white/10 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={logoUrl}
                  alt={gymName || "AR Fitness"}
                  width={32}
                  height={32}
                  className="object-contain filter grayscale contrast-200"
                />
              </div>
            ) : (
              <div className="w-7 h-7 bg-white text-black font-cond font-black text-xs flex items-center justify-center tracking-tighter transition-transform duration-300 group-hover:scale-105">
                AR
              </div>
            )}
            <span className="font-display font-black text-2xl uppercase tracking-wider text-white">
              {gymName || "AR FITNESS"}
            </span>
          </a>
          
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-cond font-bold text-xs uppercase tracking-[0.2em] text-neutral-400 hover:text-white hover:underline underline-offset-8 decoration-2 decoration-white transition-all"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-cond text-xs uppercase tracking-[0.15em] text-neutral-500">
          <span>
            © {new Date().getFullYear()} {gymName || "AR Fitness"}. Owned and coached by {ownerName || "Ajit Singh"}.
          </span>
          <span>
            Results shown are of real members and vary person to person.
          </span>
        </div>

      </div>
    </footer>
  );
}