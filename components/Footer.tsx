import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { person } from "@/lib/data";

export default function Footer() {
  const links = [
    { href: person.github, label: "GitHub", Icon: FaGithub },
    { href: person.linkedin, label: "LinkedIn", Icon: FaLinkedin },
    { href: person.leetcode, label: "LeetCode", Icon: SiLeetcode },
    { href: `mailto:${person.email}`, label: "Email", Icon: FaEnvelope },
  ];
  return (
    <footer className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-10 sm:flex-row sm:justify-between sm:px-16">
      <p className="text-[14px] text-secondary">
        &copy; {new Date().getFullYear()} {person.name}. Built with Next.js and
        three.js.
      </p>
      <div className="flex gap-5">
        {links.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-[22px] text-secondary transition-colors hover:text-white"
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
}
