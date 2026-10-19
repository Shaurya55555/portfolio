"use client";

import { useState } from "react";
import { Kicker, Reveal, Section, Window } from "./ui";
import { person } from "@/lib/data";

const links = [
  { label: "Email", value: person.email, href: `mailto:${person.email}` },
  { label: "LinkedIn", value: "in/shaurya-bajpai", href: person.linkedin },
  { label: "GitHub", value: "Shaurya55555", href: person.github },
  { label: "LeetCode", value: "u/shaurya55555", href: person.leetcode },
];

const field =
  "w-full rounded-lg border border-white/10 bg-tertiary/80 px-4 py-3 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-secondary focus:border-accent/60";

/** Kendor-style closing block: big headline, two CTAs, a compose window and link cards. */
export default function Contact() {
  const [form, setForm] = useState({ email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Portfolio message");
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
  };

  return (
    <Section id="contact">
      <Reveal className="text-center">
        <div className="flex justify-center">
          <Kicker>Your turn</Kicker>
        </div>
        <h2 className="mx-auto mt-5 max-w-5xl text-balance text-[clamp(2.6rem,6.8vw,5.5rem)] font-semibold leading-[1] tracking-tight text-white">
          Let&apos;s ship <em className="font-serif font-normal italic text-accent-soft">something real.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.65] text-secondary">
          {person.availability}
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${person.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-accent-soft hover:shadow-[0_0_30px_rgba(255,200,162,0.45)]"
          >
            Email me <span aria-hidden>↗</span>
          </a>
          <a
            href={person.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-[15px] font-medium text-white transition-all hover:-translate-y-0.5 hover:border-accent/60"
          >
            Download resume <span aria-hidden>↓</span>
          </a>
        </div>
        <p className="mt-5 font-mono text-[12px] text-secondary">
          Reply by email · Resume as PDF · Source on GitHub
        </p>
      </Reveal>

      <div className="mt-16 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Window title="new-message" right="to: shaurya" bodyClassName="p-5 sm:p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[12px] text-secondary">your email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={field}
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="font-mono text-[12px] text-secondary">message</span>
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="What would you like to say?"
                  className={field}
                />
              </label>
              <button
                type="submit"
                className="w-fit rounded-full bg-accent px-7 py-3 text-[15px] font-semibold text-black transition-all hover:-translate-y-0.5 hover:bg-accent-soft"
              >
                Send
              </button>
              <p className="font-mono text-[11px] text-secondary">
                Opens your mail app with the message drafted to me.
              </p>
            </form>
          </Window>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((l, i) => (
            <Reveal key={l.label} delay={i * 0.07} className="h-full">
              <a
                href={l.href}
                target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group flex h-full min-h-[132px] flex-col justify-between rounded-2xl border border-white/10 bg-black-100/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                    {l.label}
                  </p>
                  <span
                    aria-hidden
                    className="text-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </div>
                <p className="mt-6 text-[14px] font-medium text-white [overflow-wrap:anywhere]">{l.value}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
