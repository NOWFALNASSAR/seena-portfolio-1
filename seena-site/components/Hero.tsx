import Image from "next/image";
import type { MediaItem } from "@/lib/cloudinary";

export default function Hero({ heroImage }: { heroImage: MediaItem | null }) {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end">
      {heroImage ? (
        <Image
          src={heroImage.url}
          alt="Seena Grace John"
          fill
          priority
          className="object-cover object-[60%_20%] animate-kenburns brightness-[0.72] saturate-[1.05]"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-mid to-emerald-deep" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/15 via-emerald-deep/15 to-emerald-deep/95" />

      <div className="relative z-10 px-[5vw] pb-[9vh] max-w-3xl">
        <span className="block text-xs tracking-[0.4em] uppercase text-gold-soft mb-5 animate-fadeUp">
          Kerala · India
        </span>
        <h1 className="font-display text-[clamp(2.6rem,7vw,6rem)] leading-none animate-fadeUp" style={{ animationDelay: "0.25s" }}>
          SEENA
          <br />
          GRACE JOHN
        </h1>
        <p
          className="mt-6 font-serif-italic text-[clamp(0.95rem,1.6vw,1.25rem)] tracking-wide text-ivory/90 animate-fadeUp"
          style={{ animationDelay: "0.5s" }}
        >
          Actor <span className="text-gold-soft">·</span> Fashion Model{" "}
          <span className="text-gold-soft">·</span> Commercial Model
        </p>
        <div className="mt-10 flex gap-5 flex-wrap animate-fadeUp" style={{ animationDelay: "0.75s" }}>
          <a
            href="#portfolio"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-gold text-emerald-deep border border-gold hover:bg-transparent hover:text-gold transition-all duration-300"
          >
            View Portfolio
          </a>
          <a
            href="#contact"
            className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-ivory/40 hover:border-gold hover:text-gold-soft transition-all duration-300"
          >
            Contact
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 right-[5vw] z-10 [writing-mode:vertical-rl] text-[0.7rem] tracking-[0.3em] uppercase text-ivory/60 flex items-center gap-2.5">
        <div className="scroll-cue-line relative w-px h-16 bg-ivory/30 overflow-hidden" />
        Scroll
      </div>
    </section>
  );
}
