"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { navLinks, profile } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/80 border-b border-black/5 shadow-sm" : ""
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="#top" className="group flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan text-[13px] font-semibold tracking-wider text-white shadow-[0_0_24px_rgba(107,78,255,0.35)]">
            {profile.initials}
          </span>
          <span className="hidden font-display text-lg leading-none text-chrome-100 sm:block">
            {profile.shortName}
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="link text-sm text-chrome-300 hover:text-chrome-100"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span
            className={`hidden items-center gap-2 chip md:inline-flex ${
              profile.available ? "" : "opacity-60"
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-lime opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-lime" />
            </span>
            {profile.available ? "Available for work" : "Booked"}
          </span>

          <a
            href={`mailto:${profile.email}`}
            className="hidden md:inline-flex items-center rounded-full border border-black/10 bg-black/4 px-4 py-2 text-sm text-chrome-100 transition-colors hover:bg-black/8"
          >
            Get in touch ↗
          </a>

          <button
            aria-label="Open menu"
            className="md:hidden grid h-10 w-10 place-items-center rounded-full border border-black/10 bg-black/4"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="block h-px w-4 bg-chrome-100" />
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5">
            {navLinks.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className="text-base text-chrome-200"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </motion.header>
  );
}
