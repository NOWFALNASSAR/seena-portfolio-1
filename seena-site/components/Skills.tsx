const SKILLS = [
  "Commercial Modelling",
  "Fashion Modelling",
  "Bridal Modelling",
  "Jewellery Modelling",
  "Lifestyle Campaigns",
  "Product Promotions",
  "Brand Endorsements",
  "Photo Shoots",
  "Video Advertisements",
  "Social Media Campaigns",
  "Content Creation",
  "On-Camera Performance",
  "Acting",
  "Public Appearance",
];

export default function Skills() {
  return (
    <section id="skills" className="bg-emerald px-[5vw] py-36">
      <div className="reveal mb-14 max-w-xl">
        <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">
          Expertise
        </span>
        <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)]">Skills</h2>
      </div>
      <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/20">
        {SKILLS.map((s) => (
          <div key={s} className="bg-emerald-deep px-7 py-6 flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-gold flex-none" />
            <span className="text-sm">{s}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
