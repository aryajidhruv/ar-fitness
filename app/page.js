import { getTransformations, getGalleryItems, getInstagramPosts, getTestimonials, getTrainers, getSettings } from "@/lib/data";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Coach from "@/components/Coach";
import Programs from "@/components/Programs";
import OnlineTraining from "@/components/OnlineTraining";
import Transformations from "@/components/Transformations";
import Gallery from "@/components/Gallery";
import InstagramGallery from "@/components/InstagramGallery";
import Plans from "@/components/Plans";
import Testimonials from "@/components/Testimonials";
import Visit from "@/components/Visit";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";

// Revalidate the homepage at most once an hour even without an explicit
// revalidatePath() call (the admin API routes trigger an immediate one on
// every create/update/delete — this is just a safety net).
export const revalidate = 3600;

export default async function HomePage() {
  const [transformations, gallery, instagram, testimonials, trainers, settings] = await Promise.all([
    getTransformations(),
    getGalleryItems(),
    getInstagramPosts(),
    getTestimonials(),
    getTrainers(),
    getSettings()
  ]);

  const featured =
    transformations.find((t) => t.featuredInHero && !t.isVideo) ||
    transformations.find((t) => !t.isVideo) ||
    null;
  const primaryTrainer = trainers.find((t) => t.isPrimary) || trainers[0];
  const contactName = primaryTrainer?.name || settings.ownerName;

  return (
    <div className="grain">
      <Nav gymName={settings.gymName} whatsappNumber={settings.whatsappNumber} logoUrl={settings.logoUrl} />
      <Hero featured={featured} whatsappNumber={settings.whatsappNumber} gymName={settings.gymName} />
      <Marquee />
      <Coach trainers={trainers} ownerName={settings.ownerName} ownerPhotoUrl={settings.ownerPhotoUrl} />
      <Programs />
      <OnlineTraining
        whatsappNumber={settings.whatsappNumber}
        gymName={settings.gymName}
        ownerName={contactName}
      />
      <Transformations items={transformations} />
      <Gallery items={gallery} />
      <InstagramGallery
        items={instagram}
        instagramHandle={settings.instagramHandle}
        instagramUrl={settings.instagramUrl}
      />
      <Plans whatsappNumber={settings.whatsappNumber} />
      <Testimonials items={testimonials} />
      <Visit settings={{ ...settings, ownerName: contactName }} />
      <Footer gymName={settings.gymName} ownerName={contactName} logoUrl={settings.logoUrl} />
      <WhatsAppFab whatsappNumber={settings.whatsappNumber} gymName={settings.gymName} />
    </div>
  );
}
