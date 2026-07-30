const PROFILE = [
  { label: "Profession", value: "Actor · Model · Teacher" },
  { label: "Age", value: "25" },
  { label: "Height", value: "5'8\" (173 cm)" },
  { label: "Languages", value: "Malayalam, English" },
  { label: "Based in", value: "Pathanamthitta, Kerala" },
  { label: "Available for", value: "Film, OTT & Print" },
];

const MEASUREMENTS = [
  { label: "Bust", value: "34\"" },
  { label: "Waist", value: "32\"" },
  { label: "Hip", value: "32\"" },
  { label: "Shoulder", value: "16\"" },
  { label: "Neck Round", value: "13.5\"" },
  { label: "Shirt Size", value: "L" },
  { label: "Pant Size", value: "34" },
  { label: "Shoe Size", value: "8" },
  { label: "Eye Colour", value: "Black" },
  { label: "Hair Colour", value: "Black / Caramel" },
];

export default function Profile() {
  return (
    <section id="profile" className="px-[5vw] py-36">
      <div className="reveal mb-14 max-w-xl">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">Profile</span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">At a Glance</h2>
      </div>

      <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 mb-16">
        {PROFILE.map((p) => (
          <div
            key={p.label}
            className="border border-gold/20 hover:border-gold transition-colors duration-300 px-6 py-8 text-center"
          >
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-3">
              {p.label}
            </div>
            <div className="font-serif-italic text-lg">{p.value}</div>
          </div>
        ))}
      </div>

      <div className="reveal">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-2">
          Measurements
        </span>
        <h3 className="font-serif-italic text-lg text-ivory/50 mb-6">
          For casting &amp; wardrobe reference
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-gold/20">
          {MEASUREMENTS.map((m) => (
            <div key={m.label} className="bg-emerald-deep px-4 py-6 text-center">
              <div className="text-[0.6rem] tracking-[0.2em] uppercase text-ivory/50 mb-2">
                {m.label}
              </div>
              <div className="font-serif-italic text-gold-soft text-lg">{m.value}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
