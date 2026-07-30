"use client";

import { useEffect } from "react";

export default function ScrollFx() {
  useEffect(() => {
    const nav = document.getElementById("site-nav");
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.classList.add("bg-emerald-deep/90", "backdrop-blur", "py-4", "border-b", "border-gold/20");
        nav.classList.remove("py-7");
      } else {
        nav.classList.remove("bg-emerald-deep/90", "backdrop-blur", "py-4", "border-b", "border-gold/20");
        nav.classList.add("py-7");
      }
    };
    window.addEventListener("scroll", onScroll);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return null;
}
