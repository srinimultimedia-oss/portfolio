"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { profile } from "@/lib/data";

const socials = [
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "GitHub", href: profile.social.github },
  { label: "LinkedIn", href: profile.social.linkedin },
  { label: "Twitter / X", href: profile.social.twitter },
  { label: "Read.cv", href: profile.social.readcv },
];

export default function Contact() {
  return (
    <Section id="contact" className="!py-32 md:!py-40">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.9, ease: [0.7, 0, 0.2, 1] }}
        className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 md:p-16"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-violet/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent-cyan/20 blur-3xl" />

        <span className="chip mb-6">
          <span className="h-1 w-1 rounded-full bg-accent-cyan" />
          Let's talk
        </span>

        <h2 className="font-display text-balance text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-chrome-100">
          Got something{" "}
          <span className="bg-gradient-to-r from-accent-cyan to-accent-violet bg-clip-text text-transparent">
            ambitious
          </span>
          ? <br />
          I'd love to hear it.
        </h2>

        <p className="mt-6 max-w-xl text-pretty text-base text-chrome-300 md:text-lg">
          Open to product design + frontend roles, founder collaborations, and
          short, focused engagements. The best way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-chrome-100 px-7 py-4 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-4 text-sm text-chrome-100 backdrop-blur transition-colors hover:bg-white/10"
          >
            Download résumé
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-white/5 pt-6 text-sm text-chrome-400">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="link hover:text-chrome-100">
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
