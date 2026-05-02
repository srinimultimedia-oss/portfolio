// Single source of truth for portfolio content.
// Replace placeholders marked with TODO with the real values from
// https://srinivas-kikkuru.com/ — the live site blocks programmatic fetches,
// so swap in the canonical copy here before shipping.

export const profile = {
  name: "Srinivas Kikkuru",
  shortName: "Srinivas",
  initials: "SK",
  role: "Designer · Engineer · Creative Technologist",
  tagline: "I build expressive interfaces where craft, motion, and code meet.",
  location: "Bengaluru, India",
  available: true,
  email: "hello@srinivas-kikkuru.com", // TODO: confirm
  resumeUrl: "/resume.pdf",
  social: {
    github: "https://github.com/", // TODO
    linkedin: "https://www.linkedin.com/", // TODO
    twitter: "https://twitter.com/", // TODO
    dribbble: "https://dribbble.com/", // TODO
    readcv: "https://read.cv/", // TODO
  },
};

export const about = {
  heading: "Designing the in-between.",
  body: [
    "I'm a designer-engineer who lives in the seam between product, motion, and 3D. I care about systems that feel intentional — every easing curve, every spec of grain, every line of code.",
    "Over the last several years I've shipped interfaces for early-stage products and global brands: design systems that scaled, marketing sites that converted, and weird little experiments that found their audience.",
    "When I'm not in Figma or a code editor I'm sketching characters, learning Blender, and obsessing over typography.",
  ],
  highlights: [
    { label: "Years shipping", value: "6+" },
    { label: "Products designed", value: "30+" },
    { label: "Awwwards / FWA", value: "5" },
    { label: "Coffee / day", value: "2.5" },
  ],
};

export type Skill = { name: string; category: "Design" | "Engineering" | "3D / Motion" | "Tooling" };

export const skills: Skill[] = [
  { name: "Product Design", category: "Design" },
  { name: "Design Systems", category: "Design" },
  { name: "Brand & Identity", category: "Design" },
  { name: "Typography", category: "Design" },
  { name: "Prototyping", category: "Design" },

  { name: "TypeScript", category: "Engineering" },
  { name: "React / Next.js", category: "Engineering" },
  { name: "Node.js", category: "Engineering" },
  { name: "GraphQL", category: "Engineering" },
  { name: "Tailwind / CSS", category: "Engineering" },

  { name: "Three.js / R3F", category: "3D / Motion" },
  { name: "Blender", category: "3D / Motion" },
  { name: "GSAP / Framer Motion", category: "3D / Motion" },
  { name: "Shaders (GLSL)", category: "3D / Motion" },
  { name: "Spline", category: "3D / Motion" },

  { name: "Figma", category: "Tooling" },
  { name: "Cursor / Claude", category: "Tooling" },
  { name: "Vercel", category: "Tooling" },
  { name: "Supabase", category: "Tooling" },
];

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  stack: string[];
  accent: "violet" | "cyan" | "peach" | "lime";
  href?: string;
};

// TODO: replace with real projects from the source site.
export const projects: Project[] = [
  {
    slug: "lumen",
    title: "Lumen — Realtime collaboration canvas",
    summary:
      "An infinite multiplayer canvas with CRDT-backed sync, custom WebGL renderer, and a design system that scales from solo doodles to 200-person rooms.",
    year: "2025",
    role: "Lead Designer & Frontend",
    stack: ["Next.js", "Yjs", "WebGL", "Rust"],
    accent: "violet",
  },
  {
    slug: "atlas",
    title: "Atlas — Maps for product teams",
    summary:
      "A spatial-thinking tool that turns research, transcripts, and notes into a navigable knowledge map. Featured by Product Hunt and a16z.",
    year: "2024",
    role: "Founding Designer",
    stack: ["React", "TypeScript", "Postgres", "tRPC"],
    accent: "cyan",
  },
  {
    slug: "mira",
    title: "Mira — AI image studio",
    summary:
      "A focused, opinionated image generator with custom inference pipeline and a pen-tool first editor. 80k+ MAU within six months.",
    year: "2024",
    role: "Design + Engineering",
    stack: ["Next.js", "Python", "Modal", "Stripe"],
    accent: "peach",
  },
  {
    slug: "northwind",
    title: "Northwind — Design system",
    summary:
      "Tokens, primitives, and motion language for a B2B fintech rebuild. Cut design-to-ship by 40% across 12 squads.",
    year: "2023",
    role: "Systems Designer",
    stack: ["Figma", "Storybook", "Style Dictionary"],
    accent: "lime",
  },
  {
    slug: "drift",
    title: "Drift — Generative type playground",
    summary:
      "Side project. A WebGL playground that turns variable fonts into living sculptures. Awwwards SOTD.",
    year: "2023",
    role: "Solo",
    stack: ["Three.js", "GLSL", "Variable fonts"],
    accent: "violet",
  },
  {
    slug: "field-notes",
    title: "Field Notes — A reading practice",
    summary:
      "A long-form essay site with custom typography, scroll-tied illustrations, and a print-quality feel.",
    year: "2022",
    role: "Solo",
    stack: ["Astro", "MDX", "GSAP"],
    accent: "cyan",
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location?: string;
  blurb: string;
};

// TODO: replace with real history.
export const experience: ExperienceItem[] = [
  {
    company: "Independent",
    role: "Designer & Creative Technologist",
    period: "2024 — Present",
    location: "Remote",
    blurb:
      "Partnering with founders and brand teams on product UI, marketing sites, and 3D/web experiments.",
  },
  {
    company: "Atlas",
    role: "Founding Designer",
    period: "2023 — 2024",
    location: "Remote",
    blurb:
      "Set the visual + interaction language end-to-end, from icon system to onboarding to enterprise dashboard.",
  },
  {
    company: "Northwind Studio",
    role: "Senior Product Designer",
    period: "2021 — 2023",
    location: "Bengaluru",
    blurb:
      "Led the design system practice across fintech, healthtech, and developer-tools clients.",
  },
  {
    company: "Freelance",
    role: "Designer & Front-end",
    period: "2019 — 2021",
    location: "Remote",
    blurb:
      "Brand systems, marketing sites, and the occasional WebGL experiment for early-stage startups.",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
