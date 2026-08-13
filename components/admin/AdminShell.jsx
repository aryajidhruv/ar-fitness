"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/transformations", label: "Transformations" },
  { href: "/admin/gallery", label: "Inside the gym" },
  { href: "/admin/instagram", label: "Instagram" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/settings", label: "Settings" }
];

export default function AdminShell({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-iron text-bone font-body">
      <div className="flex">
        <aside className="w-[220px] flex-none min-h-screen border-r border-white/10 p-6 hidden md:flex flex-col">
          <Link href="/admin" className="flex items-center gap-2.5 mb-10">
            <span className="w-8 h-8 grid place-items-center border border-brass font-display font-black text-brass text-sm">
              AR
            </span>
            <span className="font-display font-extrabold uppercase tracking-wide">Admin</span>
          </Link>
          <nav className="flex flex-col gap-1 font-cond uppercase tracking-[.12em] text-sm">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`px-3 py-2.5 rounded transition-colors ${
                  pathname === n.href ? "bg-brass text-iron font-semibold" : "text-bone-dim hover:bg-white/5 hover:text-bone"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="mt-auto font-cond uppercase tracking-[.12em] text-sm text-bone-dim hover:text-brass text-left px-3 py-2.5"
          >
            Sign out
          </button>
        </aside>

        <main className="flex-1 p-6 md:p-10 max-w-[1000px]">{children}</main>
      </div>
    </div>
  );
}
