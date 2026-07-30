import { getMediaForSection, getExternalVideos } from "@/lib/cloudinary";
import ScrollFx from "@/components/ScrollFx";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Showreel from "@/components/Showreel";
import Brands from "@/components/Brands";
import Skills from "@/components/Skills";
import Profile from "@/components/Profile";
import Gallery from "@/components/Gallery";
import InstagramSection from "@/components/InstagramSection";
import Contact from "@/components/Contact";
import { Footer, FloatingButtons } from "@/components/Footer";

// Re-fetch content periodically rather than only at build time, so new
// uploads from the admin panel show up without a full redeploy.
export const revalidate = 60;

export default async function HomePage() {
  const [hero, about, bridal, fashion, lifestyle, gallery, showreelVideos, externalVideos] =
    await Promise.all([
      getMediaForSection("hero"),
      getMediaForSection("about"),
      getMediaForSection("bridal"),
      getMediaForSection("fashion"),
      getMediaForSection("lifestyle"),
      getMediaForSection("gallery"),
      getMediaForSection("showreel"),
      getExternalVideos(),
    ]);

  return (
    <>
      <ScrollFx />
      <Nav />
      <Hero heroImage={hero[0] || null} />
      <About aboutImage={about[0] || null} />
      <Portfolio bridal={bridal} fashion={fashion} lifestyle={lifestyle} />
      <Showreel uploadedVideos={showreelVideos} externalVideos={externalVideos} />
      <Brands />
      <Skills />
      <Profile />
      <Gallery items={gallery} />
      <InstagramSection previewImages={gallery} />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}
