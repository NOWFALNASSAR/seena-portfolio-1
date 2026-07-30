export default function Contact() {
  return (
    <section id="contact" className="px-[5vw] py-36 text-center">
      <span className="block text-xs tracking-[0.35em] uppercase text-gold mb-4">
        Get in touch
      </span>
      <h2 className="font-display text-[clamp(2rem,5vw,3.6rem)] mb-6">Let&apos;s Work Together</h2>
      <p className="text-ivory/50 max-w-lg mx-auto mb-12">
        For bookings, collaborations, and campaign enquiries — reach out directly.
      </p>
      <div className="flex gap-5 justify-center flex-wrap mb-14">
        <a
          href="https://wa.me/918301839359"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase bg-gold text-emerald-deep border border-gold hover:bg-transparent hover:text-gold transition-all duration-300"
        >
          Message on WhatsApp
        </a>
        <a
          href="https://instagram.com/seena_grace_john"
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase border border-ivory/40 hover:border-gold hover:text-gold-soft transition-all duration-300"
        >
          Visit Instagram
        </a>
      </div>
      <div className="flex justify-center gap-14 flex-wrap text-sm">
        <div>
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-2">
            Phone
          </span>
          +91 83018 39359
        </div>
        <div>
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-2">
            Email
          </span>
          seenagracejohn006@gmail.com
        </div>
        <div>
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-2">
            Instagram
          </span>
          @seena_grace_john
        </div>
        <div>
          <span className="block text-[0.65rem] tracking-[0.25em] uppercase text-gold mb-2">
            Location
          </span>
          Pathanamthitta, Kerala
        </div>
      </div>
    </section>
  );
}
