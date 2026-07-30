import MediaGrid from "./MediaGrid";
import type { MediaItem } from "@/lib/cloudinary";

export default function Gallery({ items }: { items: MediaItem[] }) {
  return (
    <section id="gallery" className="px-[5vw] py-36">
      <div className="reveal mb-14 max-w-xl">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">Gallery</span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Frames</h2>
      </div>
      <div className="reveal">
        <MediaGrid
          items={items}
          columns={4}
          emptyLabel="Add photos to the general gallery from the admin panel."
        />
      </div>
    </section>
  );
}
