const items = [
  "Product Design",
  "3D Web",
  "Motion",
  "Design Systems",
  "Brand",
  "Creative Code",
  "Shaders",
  "TypeScript",
];

export default function Marquee() {
  return (
    <div className="relative -mt-px border-y border-white/5 bg-ink-900/60 py-6 backdrop-blur">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-display text-3xl text-chrome-300 md:text-4xl">
          {[...items, ...items, ...items].map((it, i) => (
            <span key={i} className="flex items-center gap-12">
              {it}
              <span className="inline-block h-2 w-2 rounded-full bg-accent-violet/60" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
