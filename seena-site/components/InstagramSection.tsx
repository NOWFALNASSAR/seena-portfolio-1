import Image from "next/image";
import type { MediaItem } from "@/lib/cloudinary";

export default function InstagramSection({ previewImages }: { previewImages: MediaItem[] }) {
  const preview = previewImages.filter((p) => p.resourceType === "image").slice(0, 4);

  return (
    <section className="bg-emerald px-[5vw] py-36 text-center">
      <div className="reveal mb-4 max-w-xl mx-auto">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">Follow</span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Instagram</h2>
      </div>
      <a
        href="https://instagram.com/seena_grace_john"
        target="_blank"
        rel="noreferrer"
        className="reveal inline-block font-display text-lg text-gold mb-10"
      >
        @seena_grace_john
      </a>
      {preview.length > 0 && (
        <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
          {preview.map((p) => (
            <div key={p.publicId} className="aspect-square overflow-hidden">
              <Image
                src={p.url}
                alt="Seena Grace John on Instagram"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      )}
      <p className="reveal mt-8 text-sm text-ivory/40">
        Links straight to the live profile — the latest posts always show there.
      </p>
    </section>
  );
}
