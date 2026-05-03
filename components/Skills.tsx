"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { skills } from "@/lib/data";

const categories = ["Design", "Engineering", "3D / Motion", "Tooling"] as const;

const accentGlow: Record<(typeof categories)[number], string> = {
  Design: "bg-accent-violet/10",
  Engineering: "bg-accent-cyan/10",
  "3D / Motion": "bg-accent-peach/10",
  Tooling: "bg-accent-lime/10",
};

const accentDot: Record<(typeof categories)[number], string> = {
  Design: "bg-accent-violet",
  Engineering: "bg-accent-cyan",
  "3D / Motion": "bg-accent-peach",
  Tooling: "bg-accent-lime",
};

export default function Skills() {
  return (
    <Section id="skills" className="bg-ink-900/50">
      <SectionHeader
        eyebrow="Toolkit"
        title="A practiced craft, not a list of buzzwords."
        description="I move between disciplines on purpose — each one informs the others. Below is what I reach for most often."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: ci * 0.06, ease: [0.7, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-2xl border border-black/8 bg-white p-6 shadow-[0_2px_12px_rgba(0,0,0,0.05)]"
          >
            <div
              className={`pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full ${accentGlow[cat]} blur-2xl`}
            />
            <div className="flex items-center gap-2 mb-5">
              <span className={`h-2 w-2 rounded-full ${accentDot[cat]}`} />
              <h3 className="font-display text-xl text-chrome-100">{cat}</h3>
            </div>
            <ul className="space-y-2.5">
              {skills
                .filter((s) => s.category === cat)
                .map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between text-sm text-chrome-300"
                  >
                    <span>{s.name}</span>
                    <span className="h-px w-8 bg-black/10" />
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
