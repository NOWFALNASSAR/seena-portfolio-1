import MediaGrid from "./MediaGrid";
import type { MediaItem } from "@/lib/cloudinary";

export default function Portfolio({
  bridal,
  fashion,
  lifestyle,
}: {
  bridal: MediaItem[];
  fashion: MediaItem[];
  lifestyle: MediaItem[];
}) {
  return (
    <section id="portfolio" className="px-[5vw] py-36">
      <div className="reveal mb-16 max-w-xl">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">
          Portfolio
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-tight">
          A Study in Range
        </h2>
      </div>

      <div className="reveal mb-24">
        <div className="flex items-baseline gap-5 mb-3">
          <span className="font-display text-gold text-sm tracking-[0.2em]">I.</span>
          <h3 className="text-2xl">Bridal &amp; Jewellery</h3>
        </div>
        <p className="font-serif-italic text-ivory/50 mb-7">
          Classical Kerala bridal styling — gold kemp jewellery, silk drape, temple motifs.
        </p>
        <MediaGrid items={bridal} columns={2} emptyLabel="Add bridal &amp; jewellery photos from the admin panel." />
      </div>

      <div className="reveal mb-24">
        <div className="flex items-baseline gap-5 mb-3">
          <span className="font-display text-gold text-sm tracking-[0.2em]">II.</span>
          <h3 className="text-2xl">Fashion &amp; Editorial</h3>
        </div>
        <p className="font-serif-italic text-ivory/50 mb-7">
          Contemporary silhouettes shot on location — florals, tulle, and open landscapes.
        </p>
        <MediaGrid items={fashion} columns={4} emptyLabel="Add fashion &amp; editorial photos from the admin panel." />
      </div>

      <div className="reveal">
        <div className="flex items-baseline gap-5 mb-3">
          <span className="font-display text-gold text-sm tracking-[0.2em]">III.</span>
          <h3 className="text-2xl">Lifestyle</h3>
        </div>
        <p className="font-serif-italic text-ivory/50 mb-7">
          Candid, natural-light portraits — the everyday register between campaigns.
        </p>
        <MediaGrid items={lifestyle} columns={2} emptyLabel="Add lifestyle photos from the admin panel." />
      </div>
    </section>
  );
}
