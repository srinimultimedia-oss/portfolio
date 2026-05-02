"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <Section id="experience">
      <SectionHeader
        eyebrow="Trajectory"
        title="Where I've been."
        description="The short version. Happy to walk through any of it over a call."
      />

      <ol className="relative grid gap-6 md:grid-cols-1">
        <span
          aria-hidden
          className="absolute left-3 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent-violet/60 via-white/10 to-transparent md:left-4 md:block"
        />

        {experience.map((e, i) => (
          <motion.li
            key={e.company + e.period}
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.65, delay: i * 0.05, ease: [0.7, 0, 0.2, 1] }}
            className="relative grid grid-cols-1 gap-6 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:grid-cols-12 md:items-baseline md:pl-14"
          >
            <span
              aria-hidden
              className="absolute left-2 top-7 hidden h-3 w-3 rounded-full bg-accent-violet shadow-[0_0_22px_rgba(124,92,255,0.7)] md:left-2.5 md:block"
            />
            <div className="md:col-span-3">
              <div className="font-mono text-xs uppercase tracking-[0.2em] text-chrome-400">
                {e.period}
              </div>
              {e.location && (
                <div className="mt-1 text-xs text-chrome-400">{e.location}</div>
              )}
            </div>
            <div className="md:col-span-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-chrome-100">
                  {e.role}
                  <span className="text-chrome-400"> · {e.company}</span>
                </h3>
              </div>
              <p className="mt-2 text-sm text-chrome-300 md:text-base">{e.blurb}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </Section>
  );
}
