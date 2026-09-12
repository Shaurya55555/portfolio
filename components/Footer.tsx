import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { person } from "@/lib/data";

export default function Footer() {
  const links = [
    { href: person.github, label: "GitHub", Icon: FaGithub, big: false },
    { href: person.linkedin, label: "LinkedIn", Icon: FaLinkedin, big: true },
    { href: person.leetcode, label: "LeetCode", Icon: SiLeetcode, big: true },
    { href: `mailto:${person.email}`, label: "Email", Icon: FaEnvelope, big: false },
  ];
  return (
    <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-5 px-6 py-10 sm:flex-row sm:justify-between sm:px-16">
      <p className="text-[14px] text-secondary">
        &copy; {new Date().getFullYear()} {person.name}. Built with Next.js and
        three.js.
      </p>
      <div className="flex items-center gap-4">
        {links.map(({ href, label, Icon, big }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className={`flex items-center justify-center rounded-full border border-white/10 bg-tertiary text-secondary transition-all duration-200 hover:-translate-y-1 hover:border-[#4468ff]/60 hover:text-[#9db8ff] hover:shadow-[0_0_18px_rgba(68,104,255,0.4)] ${
              big ? "h-12 w-12 text-[24px]" : "h-10 w-10 text-[18px]"
            }`}
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
}
