"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader } from "./Section";
import { skills } from "@/lib/data";

const categories = ["Design", "Engineering", "3D / Motion", "Tooling"] as const;

const accent: Record<(typeof categories)[number], string> = {
  Design: "from-accent-violet/40 to-accent-violet/0",
  Engineering: "from-accent-cyan/40 to-accent-cyan/0",
  "3D / Motion": "from-accent-peach/40 to-accent-peach/0",
  Tooling: "from-accent-lime/40 to-accent-lime/0",
};

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeader
        eyebrow="Toolkit"
        title="A practiced craft, not a list of buzzwords."
        description="I move between disciplines on purpose — each one informs the others. Below is what I reach for most often."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.6, delay: ci * 0.06, ease: [0.7, 0, 0.2, 1] }}
            className="relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] p-6"
          >
            <div
              className={`pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${accent[cat]} blur-2xl`}
            />
            <h3 className="font-display text-xl text-chrome-100">{cat}</h3>
            <ul className="mt-5 space-y-2">
              {skills
                .filter((s) => s.category === cat)
                .map((s) => (
                  <li
                    key={s.name}
                    className="flex items-center justify-between text-sm text-chrome-200"
                  >
                    <span>{s.name}</span>
                    <span className="h-px w-10 bg-white/10" />
                  </li>
                ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
