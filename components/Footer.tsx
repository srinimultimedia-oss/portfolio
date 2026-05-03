import { profile } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-black/6 bg-ink-900/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3 text-sm text-chrome-400">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-accent-violet to-accent-cyan text-[10px] font-semibold text-white">
            {profile.initials}
          </span>
          <span>
            © {year} {profile.name}. Crafted with React Three Fiber & care.
          </span>
        </div>
        <div className="flex items-center gap-5 text-sm text-chrome-400">
          <a href={profile.social.github} className="link hover:text-chrome-100">
            GitHub
          </a>
          <a href={profile.social.linkedin} className="link hover:text-chrome-100">
            LinkedIn
          </a>
          <a href={profile.social.twitter} className="link hover:text-chrome-100">
            Twitter
          </a>
          <a href="#top" className="link hover:text-chrome-100">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
