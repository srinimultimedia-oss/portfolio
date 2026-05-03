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
        className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-white p-10 shadow-[0_8px_48px_rgba(0,0,0,0.08)] md:p-16"
      >
        {/* Decorative halos — subtle on light bg */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent-violet/12 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-accent-cyan/10 blur-3xl" />

        <span className="chip mb-6">
          <span className="h-1 w-1 rounded-full bg-accent-cyan" />
          Let's talk
        </span>

        <h2 className="font-display text-balance text-[clamp(2.4rem,5.5vw,5rem)] leading-[0.98] tracking-[-0.02em] text-chrome-100">
          Got something{" "}
          <span className="bg-gradient-to-r from-accent-violet to-accent-cyan bg-clip-text text-transparent">
            ambitious
          </span>
          ?<br />
          I'd love to hear it.
        </h2>

        <p className="mt-6 max-w-xl text-pretty text-base text-chrome-300 md:text-lg">
          Open to product design + frontend roles, founder collaborations, and
          short, focused engagements. The best way to reach me is email.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 rounded-full bg-chrome-100 px-7 py-4 text-sm font-medium text-ink shadow-[0_4px_20px_rgba(28,28,42,0.2)] transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-7 py-4 text-sm text-chrome-100 transition-colors hover:bg-black/10"
          >
            Download résumé
          </a>
        </div>

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-black/6 pt-6 text-sm text-chrome-400">
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
