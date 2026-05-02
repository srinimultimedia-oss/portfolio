"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { about } from "@/lib/data";

export default function About() {
  return (
    <Section id="about">
      <SectionHeader eyebrow="About" title={about.heading} />

      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7 space-y-6">
          {about.body.map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.7, 0, 0.2, 1] }}
              className="text-balance text-lg leading-relaxed text-chrome-200 md:text-xl"
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
          className="md:col-span-5"
        >
          <div className="grid grid-cols-2 gap-3">
            {about.highlights.map((h) => (
              <div
                key={h.label}
                className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-5 transition-colors hover:bg-white/[0.04]"
              >
                <div className="font-display text-4xl text-chrome-100 md:text-5xl">
                  {h.value}
                </div>
                <div className="mt-2 text-xs uppercase tracking-[0.18em] text-chrome-400">
                  {h.label}
                </div>
                <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-accent-violet/20 blur-2xl transition-opacity group-hover:opacity-80" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
