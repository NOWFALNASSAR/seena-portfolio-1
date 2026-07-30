"use client";

import { useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#brands", label: "Brands" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      id="site-nav"
      className="fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-[5vw] py-7 transition-all duration-500"
    >
      <a href="#" className="font-display text-lg tracking-[0.25em]">
        SEENA
      </a>

      <div
        className={`fixed md:static top-0 h-screen md:h-auto w-[70%] md:w-auto bg-emerald-deep/95 md:bg-transparent flex-col md:flex-row justify-center md:justify-start items-start md:items-center gap-8 md:gap-10 px-12 md:px-0 transition-all duration-500 flex text-xs tracking-[0.15em] uppercase ${
          open ? "right-0" : "-right-full md:right-auto"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="link-underline"
          >
            {l.label}
          </a>
        ))}
      </div>

      <button
        className="md:hidden text-2xl"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle navigation menu"
      >
        ☰
      </button>
    </nav>
  );
}
