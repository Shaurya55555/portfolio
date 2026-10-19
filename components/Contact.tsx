"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Accent, H2, Kicker, Section, SectionHead, Window } from "./ui";
import InView from "./InView";
import { slideIn, staggerContainer } from "@/lib/motion";
import { person } from "@/lib/data";

// The planet only mounts when the section is near the viewport, as before.
const EarthCanvas = dynamic(() => import("./canvas/Earth"), { ssr: false });

const field =
  "w-full rounded-lg border bg-panel-2/80 px-4 py-3.5 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-muted/70 focus:border-accent/70";

const quick = [
  { label: "LinkedIn", href: person.linkedin },
  { label: "GitHub", href: person.github },
  { label: "LeetCode", href: person.leetcode },
  { label: "Resume", href: person.resume },
];

type Status = "idle" | "sent";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState({ email: false, message: false });
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim());
  const messageOk = form.message.trim().length >= 5;
  const canSend = emailOk && messageOk;

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (status === "sent") setStatus("idle");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, message: true });
    if (!canSend) {
      if (!emailOk) emailRef.current?.focus();
      return;
    }
    const who = form.name.trim() || "someone";
    const subject = encodeURIComponent(`Portfolio message from ${who}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n${who}\nReply to: ${form.email.trim()}`,
    );
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(person.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the address is still shown on screen */
    }
  };

  const emailBad = touched.email && !emailOk;
  const messageBad = touched.message && !messageOk;

  return (
    <Section id="contact">
      <SectionHead>
        <Kicker>Get in touch</Kicker>
        <H2>
          Contact. <Accent>Say hello.</Accent>
        </H2>
        <p className="mt-5 max-w-2xl text-[17px] leading-[1.65] text-muted">
          {person.availability} Leave a message and I&apos;ll reply by email.
        </p>
      </SectionHead>

      {/* the trigger sits on this stationary wrapper; the two columns only carry
          the slide variants, so they can start fully off-screen */}
      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mt-12 flex flex-col-reverse gap-10 overflow-hidden xl:flex-row"
      >
        <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.8]">
          <Window title="new-message" right={`to: ${person.firstName.toLowerCase()}`} bodyClassName="p-5 sm:p-7">
            <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-ink">
                  Your name <span className="font-normal text-muted">(optional)</span>
                </span>
                <input
                  type="text"
                  name="name"
                  autoComplete="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="What should I call you?"
                  className={`${field} border-white/10`}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-ink">Your email</span>
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={onChange}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="you@example.com"
                  aria-invalid={emailBad}
                  aria-describedby="email-hint"
                  className={`${field} ${emailBad ? "border-red-400/70" : "border-white/10"}`}
                />
                <span
                  id="email-hint"
                  className={`text-[12px] ${emailBad ? "text-red-300" : "text-muted"}`}
                >
                  {emailBad ? "Please enter a valid email so I can reply." : "So I know where to reply."}
                </span>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[14px] font-medium text-ink">Message</span>
                <textarea
                  rows={5}
                  name="message"
                  required
                  value={form.message}
                  onChange={onChange}
                  onBlur={() => setTouched((t) => ({ ...t, message: true }))}
                  placeholder="A role, a project, or just hello."
                  aria-invalid={messageBad}
                  className={`${field} resize-y ${messageBad ? "border-red-400/70" : "border-white/10"}`}
                />
                {messageBad && (
                  <span className="text-[12px] text-red-300">Write a short message first.</span>
                )}
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className={`inline-flex items-center gap-2 rounded-full px-7 py-3 text-[15px] font-semibold transition-all ${
                    canSend
                      ? "bg-accent text-black hover:-translate-y-0.5 hover:scale-105 hover:bg-accent-soft"
                      : "cursor-pointer bg-white/10 text-muted hover:bg-white/15"
                  }`}
                >
                  Send message <span aria-hidden>↗</span>
                </button>
                <span className="text-[12px] text-muted">Opens your mail app with the message ready.</span>
              </div>

              <div aria-live="polite" className="min-h-[1px]">
                {status === "sent" && (
                  <div className="rounded-lg border border-accent/30 bg-accent/10 p-4 text-[14px] leading-[1.6] text-ink">
                    Your mail app should have opened with the message drafted. If nothing
                    happened, email me directly at{" "}
                    <span className="font-medium text-white">{person.email}</span>.
                  </div>
                )}
              </div>
            </form>

            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
                Prefer another way
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:border-accent/60"
                >
                  {copied ? "Copied ✓" : "Copy my email"}
                </button>
                {quick.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:border-accent/60"
                  >
                    {l.label} <span aria-hidden className="text-muted">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </Window>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="h-[320px] md:h-[480px] xl:h-auto xl:min-h-[520px] xl:flex-1"
        >
          <InView className="h-full w-full" rootMargin="250px">
            <EarthCanvas />
          </InView>
        </motion.div>
      </motion.div>
    </Section>
  );
}
