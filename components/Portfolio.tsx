"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MotionConfig } from "framer-motion";
import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import Steps from "./Steps";
import Experience from "./Experience";
import Works from "./Works";
import Proof from "./Proof";
import Tech from "./Tech";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";
import SmoothScroll from "./SmoothScroll";
import Warp from "./Warp";
import Explorer from "./Explorer";
import { Travel } from "./Planet";

// Code-split the 3D/WebGL layers out of the main bundle so the text, nav
// and layout can paint immediately instead of waiting on three.js.
const StarsCanvas = dynamic(() => import("./canvas/Stars"), { ssr: false });
const loadAstronaut = () => import("./AstronautCanvas");
const AstronautCanvas = dynamic(loadAstronaut, { ssr: false });
// begin fetching the 3D chunk now, in parallel with hydration, instead of
// after it
if (typeof window !== "undefined") void loadAstronaut();

export default function Portfolio() {
  // Mount the WebGL layers only once the page has had a chance to paint,
  // instead of racing shader compilation / GLTF parsing against the very
  // first frame — that race is what read as the page "breaking" on load.
  const [ready, setReady] = useState(false);
  const [astro, setAstro] = useState(false);
  const [astroShown, setAstroShown] = useState(false);

  // the astronaut is the hero: start it on the next frame, not on idle.
  // Browsers allow about 16 live WebGL contexts, and the tech bricks and the
  // Earth need most of them further down, so the astronaut scene is released
  // once the visitor is well past the first page and rebuilt on the way back.
  useEffect(() => {
    let on = false;
    const set = (v: boolean) => {
      if (v !== on) {
        on = v;
        setAstro(v);
      }
    };
    const id = requestAnimationFrame(() => set(true));
    const onScroll = () => {
      const vh = window.innerHeight;
      if (window.scrollY > vh * 1.6) set(false);
      else if (window.scrollY < vh * 1.1) set(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true), { timeout: 1200 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 250);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* full-page space backdrop, fixed behind all content */}
      {ready && astroShown && <StarsCanvas />}

      {/* 3D astronaut, confined to the hero */}
      {astro && (
        <AstronautCanvas onShown={() => setAstroShown(true)} className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />
      )}

      <ScrollProgress />
      <SmoothScroll />
      <Warp />
      <Explorer />

      <div className="relative z-[1]">
        <Navbar />
        <Hero />
        <About />
        <Travel to="How I work" />
        <Steps />
        <Travel to="Experience" />
        <Experience />
        <Travel to="Projects" />
        <Works />
        <Travel to="Proof" />
        <Proof />
        <Travel to="Tech stack" />
        <Tech />
        <Travel to="Earth, contact" />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  );
}
