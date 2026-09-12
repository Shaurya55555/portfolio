"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import EarthCanvas from "./canvas/Earth";
import SectionWrapper from "./SectionWrapper";
import Header from "./Header";
import { slideIn } from "@/lib/motion";
import { person, sectionCopy } from "@/lib/data";

function Contact() {
  const [form, setForm] = useState({ email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
    <div className="flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] rounded-2xl bg-black-100 p-8"
      >
        <Header p={sectionCopy.contact.p} h2={sectionCopy.contact.h2} useMotion={false} />
        <p className="mt-2 text-[14px] text-secondary">Leave a message, I&apos;ll reply by email.</p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-6">
          <label className="flex flex-col">
            <span className="mb-3 font-medium text-white">Your email</span>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="rounded-lg border-none bg-tertiary px-6 py-4 font-medium text-white outline-none placeholder:text-secondary"
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-3 font-medium text-white">Message</span>
            <textarea
              rows={5}
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="What would you like to say?"
              className="rounded-lg border-none bg-tertiary px-6 py-4 font-medium text-white outline-none placeholder:text-secondary"
            />
          </label>
          <button
            type="submit"
            className="w-fit rounded-xl bg-tertiary px-8 py-3 font-bold text-white shadow-card transition-transform duration-200 outline-none hover:scale-105"
          >
            Send
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="h-[350px] md:h-[550px] xl:h-auto xl:flex-1"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <SectionWrapper id="contact">
      <Contact />
    </SectionWrapper>
  );
}
