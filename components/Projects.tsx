"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Section, SectionHeader } from "./Section";
import { projects } from "@/lib/data";

const ProjectArt = dynamic(() => import("./three/ProjectArt"), { ssr: false });

const accentBorder: Record<string, string> = {
  violet: "hover:border-accent-violet/40 hover:shadow-[0_8px_32px_rgba(107,78,255,0.12)]",
  cyan: "hover:border-accent-cyan/40 hover:shadow-[0_8px_32px_rgba(0,196,217,0.12)]",
  peach: "hover:border-accent-peach/40 hover:shadow-[0_8px_32px_rgba(255,122,69,0.12)]",
  lime: "hover:border-accent-lime/40 hover:shadow-[0_8px_32px_rgba(132,204,22,0.12)]",
};

export default function Projects() {
  return (
    <Section id="work">
      <SectionHeader
        eyebrow="Selected work"
        title="Projects worth talking about."
        description="A small, curated set. Detailed case studies on request — drop me a note."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.a
            key={p.slug}
            href={p.href ?? "#contact"}
            data-cursor="hover"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.06, ease: [0.7, 0, 0.2, 1] }}
            className={`group relative overflow-hidden rounded-3xl border border-black/8 bg-white p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] transition-all duration-300 ${
              accentBorder[p.accent]
            } md:p-8`}
          >
            <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-ink-900/60">
              <ProjectArt accent={p.accent} seed={i * 1.7} />
            </div>

            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-display text-2xl text-chrome-100 md:text-3xl">
                {p.title}
              </h3>
              <span className="font-mono text-xs text-chrome-400 shrink-0">{p.year}</span>
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
