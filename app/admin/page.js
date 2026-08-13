import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { connectDB } from "@/lib/mongodb";
import Transformation from "@/models/Transformation";
import GalleryItem from "@/models/GalleryItem";
import InstagramPost from "@/models/InstagramPost";
import Testimonial from "@/models/Testimonial";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

export default async function AdminOverviewPage() {
  const session = await getServerSession(authOptions);
  await connectDB();

  const [transformCount, galleryCount, instagramCount, testimonialCount] = await Promise.all([
    Transformation.countDocuments(),
    GalleryItem.countDocuments(),
    InstagramPost.countDocuments(),
    Testimonial.countDocuments()
  ]);

  const cards = [
    { label: "Transformations", count: transformCount, href: "/admin/transformations" },
    { label: "Gallery photos", count: galleryCount, href: "/admin/gallery" },
    { label: "Instagram posts", count: instagramCount, href: "/admin/instagram" },
    { label: "Testimonials", count: testimonialCount, href: "/admin/testimonials" }
  ];

  return (
    <AdminShell>
      <h1 className="font-display font-extrabold uppercase text-3xl">
        Welcome{session?.user?.name ? `, ${session.user.name}` : ""}
      </h1>
      <p className="text-bone-dim mt-2">Manage what shows up on the AR Fitness website.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="border border-white/10 hover:border-brass/50 p-6 transition-colors"
          >
            <b className="font-display font-black text-4xl text-brass block">{c.count}</b>
            <span className="font-cond uppercase tracking-[.14em] text-sm text-bone-dim">{c.label}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-white/10 p-6">
        <h2 className="font-cond uppercase tracking-[.14em] text-sm text-bone-dim mb-3">Quick links</h2>
        <ul className="space-y-2 text-sm">
          <li>
            <Link href="/admin/transformations" className="text-brass hover:underline">
              Add a new transformation
            </Link>
          </li>
          <li>
            <Link href="/admin/gallery" className="text-brass hover:underline">
              Upload gym floor photos
            </Link>
          </li>
          <li>
            <Link href="/admin/instagram" className="text-brass hover:underline">
              Add Instagram posts
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="text-brass hover:underline">
              Update WhatsApp number, address & hours
            </Link>
          </li>
          <li>
            <a href="/" target="_blank" rel="noopener" className="text-brass hover:underline">
              View live site ↗
            </a>
          </li>
        </ul>
      </div>
    </AdminShell>
  );
}
