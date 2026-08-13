"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import SiteLogo from "@/components/SiteLogo";

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
  const [brand, setBrand] = useState({ logoUrl: "", gymName: "AR Fitness" });

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => setBrand({ logoUrl: data.logoUrl || "", gymName: data.gymName || "AR Fitness" }));
  }, []);

  return (
    <div className="min-h-screen bg-iron text-bone font-body">
      <div className="flex">
        <aside className="w-[220px] flex-none min-h-screen border-r border-white/10 p-6 hidden md:flex flex-col">
          <Link href="/admin" className="mb-10 block">
            <SiteLogo logoUrl={brand.logoUrl} gymName={brand.gymName} variant="admin" />
            <span className="font-cond uppercase tracking-[.14em] text-xs text-bone-dim mt-2 block">Admin</span>
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
