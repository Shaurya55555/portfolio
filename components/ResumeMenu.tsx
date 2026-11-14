"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { person } from "@/lib/data";

const OPTIONS = [
  { label: "SDE resume", note: "Full-stack and backend roles", href: person.resumeSDE },
  { label: "AI resume", note: "AI and ML roles", href: person.resumeAI },
];

/** One "Resume" control that lets the visitor pick the SDE or the AI version. */
export default function ResumeMenu({
  children = "Resume",
  className = "",
  align = "left",
}: {
  children?: ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const box = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!box.current?.contains(e.target as Node)) setOpen(false);
    };
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("pointerdown", away);
      document.removeEventListener("keydown", esc);
    };
  }, [open]);

  return (
    <span ref={box} className="relative inline-block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={className}
      >
        {children} <span aria-hidden className="text-[0.8em]">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <span
          role="menu"
          className={`absolute top-full z-50 mt-2 flex w-60 flex-col overflow-hidden rounded-xl border border-white/15 bg-black/95 text-left shadow-xl backdrop-blur-md ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {OPTIONS.map((o) => (
            <a
              key={o.href}
              role="menuitem"
              href={o.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="px-4 py-3 transition-colors hover:bg-white/10"
            >
              <span className="block text-[14px] font-semibold text-white">{o.label}</span>
              <span className="block text-[12px] text-muted">{o.note}</span>
            </a>
          ))}
        </span>
      )}
    </span>
  );
}
