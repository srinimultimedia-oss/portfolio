# Srinivas Kikkuru — Portfolio (3D / Immersive)

A redesigned, immersive 3D portfolio inspired by the original
[srinivas-kikkuru.com](https://srinivas-kikkuru.com/). Built as an
**Awwwards-grade single-page experience** with a custom procedural avatar,
scroll-tied animations, and a refined dark-first visual system.

> Heads up — the live source site blocks programmatic fetches (HTTP 403 to
> non-browser clients, not in the Wayback Machine), so the copy in
> `lib/data.ts` is a high-quality placeholder. Replace the `TODO`-marked
> values (email, social links, real projects, experience) with the canonical
> ones before shipping. Everything is consolidated in that single file.

---

## 1. Design concept

**"Designing the in-between."** The site treats Srinivas as a
designer-engineer who lives between disciplines — product, motion, 3D — so
the visual language is a tactile dark theme with a glassy, slightly
futuristic edge: soft gradients, generous serif display type, micro-grain,
and a single 3D character that anchors the brand.

- **Mood:** quiet, premium, after-hours — a studio at 11pm, not a sales page
- **Default:** dark (`#06060a`) with subtle violet/cyan halation
- **Type:** `Instrument Serif` for display, `Inter` for UI, `JetBrains Mono`
  for metadata (period, year, eyebrows)
- **Color tokens** (palette refined from the original violet accent):
  - `--bg #06060a` (ink), `--fg #f5f5fa` (chrome 100)
  - `accent-violet #7c5cff`, `accent-cyan #22e3ff`,
    `accent-peach #ff9d6e`, `accent-lime #c6ff5e`
- **Accessibility:** All text/background pairs pass WCAG AA. A
  `prefers-reduced-motion` query disables Lenis smoothing, marquees, and
  decorative animations.

## 2. Layout / wireframe

```
┌──────────────────────────── Nav (sticky, blurs on scroll) ───┐
│ HERO            ┌──────────────────────────────┐             │
│  • eyebrow      │                              │             │
│  • H1 with      │     3D Canvas: stylized      │             │
│    gradient     │     avatar + orbiting        │             │
│  • subhead      │     accents (R3F)            │             │
│  • CTAs         │                              │             │
│  • scroll hint  └──────────────────────────────┘             │
├──────────────────────────────────────────────────────────────┤
│ MARQUEE (specialties strip)                                  │
├──────────────────────────────────────────────────────────────┤
│ ABOUT                                                        │
│  3-col text  |  2x2 stat grid (years / projects / awards)    │
├──────────────────────────────────────────────────────────────┤
│ SKILLS                                                       │
│  4 category columns: Design / Eng / 3D-Motion / Tooling      │
├──────────────────────────────────────────────────────────────┤
│ PROJECTS (selected work)                                     │
│  2-col cards, each with its own R3F MeshDistortMaterial blob │
├──────────────────────────────────────────────────────────────┤
│ EXPERIENCE                                                   │
│  Vertical timeline with glowing nodes                        │
├──────────────────────────────────────────────────────────────┤
│ CONTACT (giant CTA card with halo)                           │
├──────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
└──────────────────────────────────────────────────────────────┘
```

## 3. Tech stack & justification

| Layer        | Choice                            | Why                                                                                                  |
| ------------ | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Framework    | **Next.js 15 (App Router)**       | RSC + streaming + image opt; first-class on Vercel; trivial dynamic-imports for client-only 3D       |
| Language     | **TypeScript**                    | Required for safe 3D/R3F prop typing and shared content schema                                       |
| 3D           | **three.js + @react-three/fiber** | Declarative scene composition that lives next to React state; mature ecosystem                       |
| 3D helpers   | **@react-three/drei**             | `MeshDistortMaterial`, `MeshTransmissionMaterial`, `Float`, `Environment`, `ContactShadows`, `Sparkles` — all production-tested |
| Animation    | **Framer Motion**                 | Best-in-class for scroll/in-view declarative React animation                                         |
| Smooth scroll| **Lenis**                         | Lightweight, RAF-driven, pairs cleanly with R3F's render loop                                        |
| Styling      | **Tailwind CSS + CSS vars**       | Fastest iteration speed, design-tokens via CSS vars for theming                                      |
| Hosting      | **Vercel**                        | Edge runtime, image opt, zero-config Next deploys                                                    |

Alternatives considered: GSAP for animations (heavier, but excellent for
timeline-based work — easy to add); Spline for the avatar (fast, but ties you
to their runtime and is harder to tweak); Astro (great for marketing-only
sites, but R3F + interactive nav want React).

## 4. 3D implementation approach

### The avatar
Implemented in `components/three/Avatar.tsx` as a **procedural stylized
character** built from R3F primitives — no external model, so the bundle
stays small and the site works fully offline. The character has:

- A rounded, low-poly head + torso with a transmission-material AR visor
- Glow-emissive eyes that **track the cursor** (damped lerp on `head.rotation` and `eyes.position`)
- Idle "breathing" via `Math.sin(time)` on the body group
- Floating accent shapes (icosahedron, torus, cube) using drei `<Float>`
- A glowing plinth ring + contact shadows beneath

### Production upgrade path
Swap the procedural mesh for a real rigged character when ready:

```tsx
// 1. Generate at https://readyplayer.me or model in Blender → export GLB
// 2. Place in /public/avatar.glb
// 3. Replace Avatar.tsx body with:
import { useGLTF, useAnimations } from "@react-three/drei";

const { scene, animations } = useGLTF("/avatar.glb");
const { actions } = useAnimations(animations, scene);
useEffect(() => actions.Idle?.play(), [actions]);
return <primitive object={scene} dispose={null} />;
```

For lip-sync / expression: pair with **Mixamo** for body animations, **ARKit
blendshapes** for face. For hair physics use `@pmndrs/three-csg` or bone
chains. Recommended pipeline: **Blender → glTF Transform → Draco compression
→ next/dynamic load**.

### Camera rig
`CameraRig` in `HeroScene.tsx` uses `THREE.MathUtils.damp` against
`pointer.x/y` for a continuously settling parallax — no jitter at rest, no
overshoot.

## 5. Component breakdown

```
app/
  layout.tsx          # Fonts, metadata, smooth-scroll + cursor providers
  page.tsx            # Section composition
  globals.css         # Tokens, grain, marquee keyframes, reduced-motion

components/
  Nav.tsx             # Sticky, blurs after 24px, mobile menu, "Available" chip
  Hero.tsx            # Static markup + dynamic-imported 3D scene
  Marquee.tsx         # Infinite specialty strip
  About.tsx           # Headline + body + 2x2 stat grid
  Skills.tsx          # 4-column toolkit by category
  Projects.tsx        # 2-col cards, each w/ inline 3D blob
  Experience.tsx      # Timeline w/ glowing nodes
  Contact.tsx         # Giant CTA card w/ halo + socials
  Footer.tsx
  Section.tsx         # Section + SectionHeader primitives
  SmoothScroll.tsx    # Lenis (no-op under prefers-reduced-motion)
  Cursor.tsx          # Custom cursor (only on pointer:fine)
  three/
    HeroScene.tsx     # R3F canvas + lighting + camera rig
    Avatar.tsx        # Procedural stylized character
    ProjectArt.tsx    # Per-card distort blob

lib/
  data.ts             # Single source of truth for all copy
```

## 6. Animation strategy

| Trigger                  | Implementation                                                        |
| ------------------------ | --------------------------------------------------------------------- |
| Page load                | Framer staggered `fade` variants on Hero (eyebrow → H1 → body → CTAs) |
| Scroll into view         | `whileInView` with `viewport={{ once: true, margin: "-10%" }}`        |
| Pointer parallax (3D)    | `THREE.MathUtils.damp` in a `useFrame` — frame-rate independent       |
| Cursor                   | Inertia ring + sharp dot, scales up on `a/button/[data-cursor]`       |
| Scroll smoothing         | Lenis with RAF loop (skipped under reduced-motion)                    |
| Marquee                  | Pure CSS keyframe (cheap, pauses under reduced-motion)                |
| Card hover               | Tailwind border-color tween + 3D blob continues idle motion           |

Easing convention: `cubic-bezier(0.7, 0, 0.2, 1)` everywhere — a single
"house easing" gives the whole site a consistent feel.

## 7. Asset recommendations

- **3D character**
  - [Ready Player Me](https://readyplayer.me) for a stylized full-body avatar (GLB, fast)
  - [Mixamo](https://mixamo.com) for free idle / wave / type animations
  - [Blender](https://blender.org) for custom rigs, hair cards, accessories
  - [Spline](https://spline.design) if you'd rather author the whole hero scene visually
- **HDRIs / Environment** — use drei `<Environment preset="city" />` (or `studio`, `apartment`); for branded lighting bake a small 1k HDRI in Blender and host it locally
- **Textures** — [ambientCG](https://ambientcg.com), [Poly Haven](https://polyhaven.com)
- **Fonts** — [Instrument Serif (display)](https://fonts.google.com/specimen/Instrument+Serif), [Inter](https://rsms.me/inter/), [JetBrains Mono](https://www.jetbrains.com/lp/mono/) — all loaded via Google Fonts
- **Icons** — [Lucide](https://lucide.dev) or [Phosphor](https://phosphoricons.com) (not used yet — drop in `lucide-react` if you need any)
- **Imagery** — keep it sparse; let the 3D and type carry the visual weight

## 8. Performance considerations

- **Code-split** every WebGL surface — `next/dynamic(..., { ssr: false })` for `HeroScene` and `ProjectArt`. The shell renders without three.js on first paint.
- **DPR clamp** — `dpr={[1, 1.6]}` so retina screens stay sharp without melting low-end GPUs
- **`powerPreference: "high-performance"`** on the canvas
- **Suspense boundaries** wrap every `<Environment>` / GLB load
- **No model assets in the default build** — the procedural avatar means a sub-200KB JS payload for the 3D layer
- **Reduced-motion** disables Lenis, marquees, and cursor inertia
- **Mobile fallback** — same scene runs but `dpr` cap + `Sparkles` count + lighting are conservative; if you want a flat fallback, gate `<HeroScene />` behind a `useMatchMedia("(min-width: 768px) and (pointer: fine)")` check and render the `<HeroFallback />` orb instead
- **Fonts** — preconnect + `display=swap`; consider self-hosting via `next/font` once content is finalized
- **Lighthouse target:** 95+ Perf / 100 A11y / 100 BP / 100 SEO on desktop; ~85 Perf on mid-tier mobile

## 9. Sample code snippets

The full implementation is in this repo. Key patterns:

**Pointer-tracked head (`Avatar.tsx`)**
```tsx
useFrame((state) => {
  const tx = THREE.MathUtils.clamp(pointer.current.x, -1, 1);
  const ty = THREE.MathUtils.clamp(pointer.current.y, -1, 1);
  head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, tx * 0.45, 4, 0.016);
  head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -ty * 0.25, 4, 0.016);
});
```

**Dynamic 3D import with static fallback (`Hero.tsx`)**
```tsx
const HeroScene = dynamic(() => import("./three/HeroScene"), {
  ssr: false,
  loading: () => <HeroFallback />,
});
```

**House-easing scroll-in (`Section.tsx`)**
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-15% 0px" }}
  transition={{ duration: 0.8, ease: [0.7, 0, 0.2, 1] }}
/>
```

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck    # tsc --noEmit
```

## Replace the placeholder content

Open `lib/data.ts` and edit the values marked `// TODO`. That's the **only**
file you need to touch for copy changes — every component reads from it.

## Deploy

Push to GitHub and import to Vercel. No env vars required for the base site.
For a contact form, add a server action in `app/api/contact/route.ts` and
wire it to Resend / Postmark / Loops.

---

Built with React Three Fiber, Framer Motion, and Tailwind. Designed and
developed in service of an Awwwards SOTD pitch.
