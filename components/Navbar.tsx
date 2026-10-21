"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { sceneStore } from "@/lib/sceneStore";
import { HiMenu, HiX } from "react-icons/hi";
import { navLinks, person } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sceneActive = useSyncExternalStore(sceneStore.subscribe, sceneStore.get, () => null);
  const current = sceneActive ?? active;

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]");
    let ticking = false;

    const measure = () => {
      ticking = false;
      setScrolled(window.scrollY > 100);
      // inside the sideways scene the active station comes from the scene store
      if (document.querySelector("[data-station]")) return;
      sections.forEach((el) => {
        const h = el.offsetHeight;
        const top = el.getBoundingClientRect().top - h * 0.2;
        if (top < 0 && top + h > 0) setActive(el.id);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-20 flex w-full items-center px-6 py-5 transition-colors sm:px-16 ${
        scrolled
          ? "border-b border-white/5 bg-[#000000]/80 backdrop-blur-md"
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
          <p className="cursor-pointer text-[18px] font-bold text-white transition-colors hover:text-[#d4c4fb]">
            {person.name}
          </p>
        </a>

        <ul className="hidden list-none flex-row gap-10 sm:flex">
          {navLinks.map((nav) => (
            <li
              key={nav.id}
              className={`relative cursor-pointer pb-1 text-[18px] font-medium transition-colors ${
                current === nav.id ? "text-white" : "text-secondary"
              } hover:text-white`}
              onClick={() => setActive(nav.id)}
            >
              <a href={`#${nav.id}`}>{nav.title}</a>
              <span
                className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-[#8b5cf6] transition-all duration-300 ${
                  current === nav.id ? "w-full" : "w-0"
                }`}
              />
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
                    current === nav.id ? "text-white" : "text-secondary"
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
