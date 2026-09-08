"use client";

import { useEffect, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, person } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      const sections = document.querySelectorAll("section[id]");
      sections.forEach((cur) => {
        const el = cur as HTMLElement;
        const h = el.offsetHeight;
        const top = el.getBoundingClientRect().top - h * 0.2;
        if (top < 0 && top + h > 0) setActive(el.id);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-20 flex w-full items-center px-6 py-5 transition-colors sm:px-16 ${
        scrolled
          ? "border-b border-white/5 bg-[#050816]/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <span className="h-9 w-9 rounded-full bg-[#4468ff]" />
          <p className="cursor-pointer text-[18px] font-bold text-white">
            {person.name}
          </p>
        </a>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`${
                active === nav.id ? "text-white" : "text-secondary"
              } cursor-pointer text-[18px] font-medium hover:text-white`}
              onClick={() => setActive(nav.id)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))}
          <li className="cursor-pointer text-[18px] font-medium text-secondary hover:text-white">
            <a href={person.resume} target="_blank" rel="noopener noreferrer">
              Resume
            </a>
          </li>
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            aria-label="menu"
            onClick={() => setToggle((t) => !t)}
            className="text-[28px] text-white"
          >
            {toggle ? <HiX /> : <HiMenu />}
          </button>

          <div
            className={`${
              toggle ? "flex" : "hidden"
            } black-gradient absolute right-0 top-20 z-10 mx-4 my-2 min-w-[160px] rounded-xl p-6`}
          >
            <ul className="flex flex-1 list-none flex-col items-start gap-4">
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`cursor-pointer text-[16px] font-medium ${
                    active === nav.id ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(false);
                    setActive(nav.id);
                  }}
                >
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))}
              <li className="cursor-pointer text-[16px] font-medium text-secondary">
                <a href={person.resume} target="_blank" rel="noopener noreferrer">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
