import { Big_Shoulders, Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { getSettings } from "@/lib/data";
import PageLoader from "@/components/PageLoader";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const display = Big_Shoulders({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  adjustFontFallback: false,
  fallback: ["Impact", "Arial Black", "sans-serif"]
});
const body = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body"
});
const cond = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cond"
});

export async function generateMetadata() {
  const settings = await getSettings();
  const title = `${settings.gymName} — Personal Training & Body Transformation in ${settings.city}`;
  const description =
    settings.metaDescription ||
    `${settings.gymName} is a strength and fat-loss gym in ${settings.city} coached by ${settings.ownerName}. Real member transformations, personal training, group classes. Book a free trial on WhatsApp.`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: title, template: `%s — ${settings.gymName}` },
    description,
    keywords: [
      "gym in " + settings.city,
      "personal trainer " + settings.city,
      "fat loss gym",
      "fitness coach " + settings.city,
      settings.gymName
    ],
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: settings.gymName,
      locale: "en_IN",
      type: "website",
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: `${settings.gymName} gym` }]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.jpg"]
    },
    robots: { index: true, follow: true }
  };
}

export default async function RootLayout({ children }) {
  const settings = await getSettings();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthClub",
    name: settings.gymName,
    description: settings.metaDescription || `Strength and fat-loss gym coached by ${settings.ownerName}`,
    url: siteUrl,
    telephone: settings.phone || undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address || undefined,
      addressLocality: settings.city,
      addressCountry: "IN"
    },
    ...(settings.latitude && settings.longitude
      ? { geo: { "@type": "GeoCoordinates", latitude: settings.latitude, longitude: settings.longitude } }
      : {}),
    openingHours: ["Mo-Sa " + toIsoHours(settings.hoursWeekday), "Su " + toIsoHours(settings.hoursSunday)],
    founder: { "@type": "Person", name: settings.ownerName }
  };

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${cond.variable}`}>
      <body className="bg-iron text-bone font-body antialiased">
        <PageLoader gymName={settings.gymName} logoUrl={settings.logoUrl} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}

// Best-effort conversion of "5:30 AM – 10:30 PM" into "05:30-22:30" for JSON-LD.
// Falls back gracefully if the admin has entered free-form text.
function toIsoHours(range) {
  try {
    const [start, end] = range.split(/–|-/).map((s) => s.trim());
    return `${to24(start)}-${to24(end)}`;
  } catch {
    return "00:00-23:59";
  }
}
function to24(t) {
  const [time, ampm] = t.split(" ");
  let [h, m] = time.split(":").map(Number);
  if (/pm/i.test(ampm) && h !== 12) h += 12;
  if (/am/i.test(ampm) && h === 12) h = 0;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
