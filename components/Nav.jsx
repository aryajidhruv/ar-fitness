// "use client";

// import { useState } from "react";
// import Image from "next/image";

// export default function Navbar({ gymName, logoUrl }) {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const navLinks = [
//     { label: "TEAM", href: "#team" },
//     { label: "PROGRAMS", href: "#programs" },
//     { label: "ONLINE", href: "#online" },
//     { label: "RESULTS", href: "#results" },
//     { label: "GALLERY", href: "#gallery" },
//     { label: "INSTAGRAM", href: "#instagram" },
//     { label: "MEMBERSHIP", href: "#membership" },
//     { label: "VISIT", href: "#visit" },
//   ];

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md">
//       <div className="w-[94%] max-w-[1400px] mx-auto flex items-center justify-between py-5">
        
//         {/* Brand Logo & Name */}
//         <a href="#top" className="flex items-center gap-3">
//           {logoUrl ? (
//             <div className="relative w-8 h-8 rounded bg-white/10 flex items-center justify-center overflow-hidden">
//               <Image
//                 src={logoUrl}
//                 alt={gymName || "AR Fitness"}
//                 width={32}
//                 height={32}
//                 className="object-contain"
//               />
//             </div>
//           ) : (
//             <div className="w-7 h-7 bg-white text-black font-cond font-black text-xs flex items-center justify-center tracking-tighter">
//               AR
//             </div>
//           )}
//           <span className="font-display font-black text-2xl uppercase tracking-wider text-white">
//             {gymName || "AR FITNESS"}
//           </span>
//         </a>

//         {/* Desktop Nav Links with Hover Underline */}
//         <nav className="hidden lg:flex items-center gap-7">
//           {navLinks.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               className="font-cond font-bold text-xs uppercase tracking-[0.18em] text-neutral-300 hover:text-white hover:underline underline-offset-8 decoration-2 decoration-white transition-all"
//             >
//               {link.label}
//             </a>
//           ))}
//         </nav>

//         {/* Right Action / Language Selector */}
//         <div className="hidden lg:flex items-center gap-6">
//           <a
//             href="#trial"
//             className="bg-white text-black font-cond font-black text-xs uppercase tracking-[0.16em] px-6 py-2.5 rounded-none hover:bg-neutral-200 transition-colors"
//           >
//             FREE TRIAL
//           </a>
//           <span className="font-cond text-xs font-bold tracking-wider text-neutral-400">
//             DE / <span className="text-white underline underline-offset-4">EN</span>
//           </span>
//         </div>

//         {/* Mobile Toggle Button */}
//         <button
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           className="lg:hidden text-white focus:outline-none p-1"
//           aria-label="Toggle menu"
//         >
//           <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             {mobileMenuOpen ? (
//               <path strokeLinecap="square" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             ) : (
//               <path strokeLinecap="square" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//             )}
//           </svg>
//         </button>
//       </div>

//       {/* Mobile Drawer Dropdown */}
//       {mobileMenuOpen && (
//         <div className="lg:hidden bg-black/95 px-6 py-6 flex flex-col gap-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.label}
//               href={link.href}
//               onClick={() => setMobileMenuOpen(false)}
//               className="font-cond font-bold text-sm uppercase tracking-widest text-neutral-200 hover:text-white hover:underline underline-offset-4"
//             >
//               {link.label}
//             </a>
//           ))}
//         </div>
//       )}
//     </header>
//   );
// }