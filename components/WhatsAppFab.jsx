export default function WhatsAppFab({ whatsappNumber, gymName }) {
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I want to book a free trial at ${gymName}`
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label="Contact us"
      className="pulse-ring fixed right-5 bottom-5 z-[9200] flex items-center gap-2.5 rounded-full bg-[#1FA855] text-white pl-4 pr-5 py-3.5 shadow-[0_14px_34px_-12px_rgba(31,168,85,0.85)] hover:-translate-y-1 hover:scale-[1.02] transition-transform"
    >
      <svg width="25" height="25" viewBox="0 0 24 24" fill="currentColor" className="relative shrink-0">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 004.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm5.8 14.06c-.25.69-1.45 1.33-1.99 1.38-.53.05-1.02.24-3.44-.72-2.9-1.15-4.74-4.1-4.88-4.29-.14-.19-1.16-1.55-1.16-2.95s.73-2.09.99-2.38c.26-.29.57-.36.76-.36s.38 0 .54.01c.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.3.37-.42.5-.14.14-.29.29-.12.57.16.29.73 1.2 1.56 1.95 1.08.96 1.98 1.26 2.27 1.4.29.14.45.12.62-.07.17-.19.71-.83.9-1.12.19-.29.38-.24.64-.14.26.09 1.67.79 1.95.93.29.14.48.21.55.33.07.11.07.67-.18 1.36z" />
      </svg>
      <span className="relative font-cond uppercase tracking-[.12em] text-xs sm:text-sm font-semibold whitespace-nowrap">
        Contact Us
      </span>
    </a>
  );
}
