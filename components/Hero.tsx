"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { profile } from "@/lib/data";

const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});

function HeroFallback() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-64 w-64">
        <div className="absolute inset-0 animate-spin-slow rounded-full bg-gradient-to-tr from-accent-violet via-accent-cyan to-accent-peach opacity-20 blur-2xl" />
        <div className="absolute inset-6 rounded-full border border-black/10 backdrop-blur" />
      </div>
    </div>
  );
}

const fade = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.9, ease: [0.7, 0, 0.2, 1] },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-mesh"
    >
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(0,0,0,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.5)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]"
      />

      <HeroScene />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-6 pb-16 pt-32 md:justify-center md:pb-24">
        <motion.span
          custom={0}
          initial="hidden"
          animate="show"
          variants={fade}
          className="chip mb-6 w-fit"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan" />
          {profile.role}
        </motion.span>

        <motion.h1
          custom={1}
          initial="hidden"
          animate="show"
          variants={fade}
          className="font-display text-balance text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em] text-chrome-100"
        >
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-accent-violet via-accent-cyan to-accent-peach bg-clip-text text-transparent">
            {profile.shortName}
          </span>
          .
          <br />
          <span className="text-chrome-300">{profile.tagline}</span>
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-8 max-w-xl text-pretty text-base text-chrome-300 md:text-lg"
        >
          Designer-engineer based in {profile.location}. I help teams ship
          interfaces that feel inevitable — fluid motion, tactile 3D, and code
          that doesn't get in the way.
        </motion.p>

        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={fade}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full bg-chrome-100 px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(28,28,42,0.2)]"
          >
            View selected work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-6 py-3 text-sm text-chrome-100 transition-colors hover:bg-black/10"
          >
            Start a project
          </a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-chrome-400 md:flex"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <span className="block h-10 w-px bg-gradient-to-b from-chrome-400 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
