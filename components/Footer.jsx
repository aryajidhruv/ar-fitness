import SiteLogo from "./SiteLogo";

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
    <footer className="pt-16 pb-9 bg-black text-white selection:bg-white selection:text-black border-t border-white/10">
      <div className="w-[92%] max-w-[1300px] mx-auto">
        <div className="flex justify-between flex-wrap gap-7 pb-8 border-b border-white/10">
          <a href="#top" className="flex items-center">
            <SiteLogo logoUrl={logoUrl} gymName={gymName} variant="inline" />
          </a>
          <div className="flex gap-6 flex-wrap font-cond uppercase tracking-[.15em] text-xs font-bold text-neutral-400">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="pt-6 flex justify-between flex-wrap gap-4 font-cond uppercase tracking-[.15em] text-xs font-bold text-neutral-400">
          <span>
            © {new Date().getFullYear()} {gymName}. Owned and coached by {ownerName}.
          </span>
          <span>Results shown are of real members and vary person to person.</span>
        </div>
      </div>
    </footer>
  );
}