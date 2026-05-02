"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px" }}
      transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
      className="mb-14 max-w-3xl"
    >
      <span className="chip mb-5">
        <span className="h-1 w-1 rounded-full bg-accent-cyan" />
        {eyebrow}
      </span>
      <h2 className="font-display text-balance text-[clamp(2rem,4.5vw,3.6rem)] leading-[1.02] tracking-[-0.02em] text-chrome-100">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-pretty text-base text-chrome-300 md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto max-w-7xl px-6 py-28 md:py-36 ${className}`}
    >
      {children}
    </section>
  );
}
