import Image from "next/image";
import type { MediaItem } from "@/lib/cloudinary";

export default function About({ aboutImage }: { aboutImage: MediaItem | null }) {
  return (
    <section id="about" className="bg-emerald grid md:grid-cols-[0.85fr_1.15fr] gap-[5vw] items-center px-[5vw] py-36">
      <div className="reveal relative">
        <div className="absolute -top-4 -left-4 w-full h-full border border-gold -z-10" />
        {aboutImage ? (
          <Image
            src={aboutImage.url}
            alt="Seena Grace John"
            width={700}
            height={900}
            className="w-full h-auto contrast-[1.05] saturate-[0.95]"
          />
        ) : (
          <div className="w-full aspect-[4/5] bg-emerald-mid flex items-center justify-center text-ivory/40 text-sm">
            Add an "about" photo from the admin panel
          </div>
        )}
      </div>

      <div className="reveal">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">About</span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight mb-8">
          A presence that moves
          <br />
          between tradition and the camera.
        </h2>
        <p className="text-[1.05rem] leading-[1.9] text-ivory/85 mb-6">
          Seena Grace John is a Kerala-based fashion model and aspiring actress
          with professional experience in commercial advertising, bridal
          campaigns, jewellery promotions, lifestyle branding, and digital
          content creation. She has collaborated with some of Kerala&apos;s
          leading textile brands, jewellery houses, lifestyle companies, and
          creative production teams, showcasing versatility across fashion,
          commercial, and promotional campaigns.
        </p>
        <p className="font-serif-italic text-2xl text-gold-soft border-l-2 border-gold pl-6 my-9">
          &ldquo;Every frame is a small performance — the saree, the light, the
          stillness before the shutter.&rdquo;
        </p>
        <p className="text-[1.05rem] leading-[1.9] text-ivory/85">
          Alongside her modelling career, she is pursuing a Bachelor of
          Education (B.Ed.), reflecting her passion for education and personal
          growth. With a strong on-camera presence, expressive performance,
          and confidence in front of the lens, Seena is now focused on
          expanding her career into films, OTT productions, television
          commercials, music videos, and premium fashion campaigns.
        </p>
      </div>
    </section>
  );
}
