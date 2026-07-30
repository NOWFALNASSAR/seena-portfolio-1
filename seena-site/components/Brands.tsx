const BRANDS = [
  "Maharani Wedding Collection",
  "Weds India Wedding Mall",
  "Zyra Lifestyle",
  "Chikankari",
  "Bhima Jewels",
  "Chungath Jewels",
  "Sree Parvathy Jewels",
  "DR Plus Ayurveda",
  "Menso Family Saloon",
  "Alankar Hypermarket",
  "City Tower",
  "JMJ Events",
  "7D7",
  "Al Azhar Group of Institutions",
];

export default function Brands() {
  return (
    <section id="brands" className="px-[5vw] py-36">
      <div className="reveal mb-14 max-w-xl">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">
          Collaborations
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Brands &amp; Houses</h2>
      </div>
      <div className="reveal flex flex-wrap gap-px bg-gold/20">
        {BRANDS.map((b) => (
          <div
            key={b}
            className="flex-1 min-w-[200px] bg-emerald-deep px-6 py-7 text-center text-ivory/50 hover:text-gold hover:bg-emerald transition-colors duration-300"
          >
            {b}
          </div>
        ))}
      </div>
    </section>
  );
}
