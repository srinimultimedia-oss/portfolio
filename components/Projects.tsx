"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Section, SectionHeader } from "./Section";
import { projects } from "@/lib/data";

const ProjectArt = dynamic(() => import("./three/ProjectArt"), { ssr: false });

const accentBorder: Record<string, string> = {
  violet: "hover:border-accent-violet/60",
  cyan: "hover:border-accent-cyan/60",
  peach: "hover:border-accent-peach/60",
  lime: "hover:border-accent-lime/60",
};

export default function Projects() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow="Selected work"
        title="Projects worth talking about."
        description="A small, curated set. Detailed case studies on request — drop me a note."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.slug}
            href={p.href ?? "#contact"}
            data-cursor="hover"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.06, ease: [0.7, 0, 0.2, 1] }}
            className={`group relative overflow-hidden rounded-3xl border border-white/8 bg-white/[0.02] p-6 transition-colors ${
              accentBorder[p.accent]
            } md:p-8`}
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-white/[0.01]">
              <ProjectArt accent={p.accent} seed={i * 1.7} />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.05),transparent_60%)]" />
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl text-chrome-100 md:text-3xl">
                {p.title}
              </h3>
              <span className="font-mono text-xs text-chrome-400">{p.year}</span>
            </div>
            <p className="mt-3 text-pretty text-sm text-chrome-300 md:text-base">
              {p.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              {p.stack.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
              <span className="ml-auto inline-flex items-center gap-1 text-xs text-chrome-400 transition-transform group-hover:translate-x-1">
                {p.role} ↗
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </Section>
  );
}
