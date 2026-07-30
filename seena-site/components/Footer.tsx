export function Footer() {
  return (
    <footer className="px-[5vw] py-10 border-t border-gold/20 flex justify-between items-center flex-wrap gap-4 text-xs tracking-wide text-ivory/40">
      <div>© Seena Grace John</div>
      <div>Actor · Fashion Model · Commercial Model</div>
    </footer>
  );
}

export function FloatingButtons() {
  return (
    <div className="fixed right-6 bottom-6 z-[1500] flex flex-col gap-3">
      <a
        href="https://wa.me/918301839359"
        target="_blank"
        rel="noreferrer"
        title="Message on WhatsApp"
        className="w-[52px] h-[52px] rounded-full bg-[#25D366] text-emerald-deep flex items-center justify-center text-xl shadow-lg hover:-translate-y-1 transition-transform duration-300"
      >
        ☏
      </a>
      <a
        href="https://instagram.com/seena_grace_john"
        target="_blank"
        rel="noreferrer"
        title="Visit Instagram"
        className="w-[52px] h-[52px] rounded-full text-white flex items-center justify-center text-xl shadow-lg hover:-translate-y-1 transition-transform duration-300"
        style={{
          background:
            "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
        }}
      >
        ◎
      </a>
    </div>
  );
}
