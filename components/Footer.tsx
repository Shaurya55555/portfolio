import { navLinks, person, projects } from "@/lib/data";

const col = "flex flex-col gap-2.5 text-[14px]";
const linkCls = "text-muted transition-colors hover:text-white";
const head = "mb-4 font-mono text-[12px] uppercase tracking-[0.18em] text-accent";

export default function Footer() {
  const elsewhere = [
    { label: "GitHub", href: person.github },
    { label: "LinkedIn", href: person.linkedin },
    { label: "LeetCode", href: person.leetcode },
    { label: "Email", href: `mailto:${person.email}` },
    { label: "Resume (PDF)", href: person.resume },
  ];

  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-[20px] font-semibold tracking-tight text-white">{person.name}</p>
          <p className="mt-3 max-w-xs text-[14px] leading-[1.65] text-muted">
            Full-stack engineer who wires language models into products people actually use.
          </p>
        </div>

        <nav aria-label="Navigate">
          <p className={head}>Navigate</p>
          <ul className={col}>
            {[...navLinks, { id: "stack", title: "Stack" }].map((l) => (
              <li key={l.id}>
                <a href={`#${l.id}`} className={linkCls}>
                  {l.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Projects">
          <p className={head}>Projects</p>
          <ul className={col}>
            {projects.map((p) => (
              <li key={p.name}>
                <a
                  href={p.liveLink || p.demoLink || p.sourceCodeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Elsewhere">
          <p className={head}>Elsewhere</p>
          <ul className={col}>
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={linkCls}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-6 py-6 font-mono text-[12px] text-muted sm:flex-row sm:items-center sm:px-16">
          <p>
            &copy; {new Date().getFullYear()} {person.name}
          </p>
          <p>Built with Next.js and three.js</p>
        </div>
      </div>
    </footer>
  );
}
