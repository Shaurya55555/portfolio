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
import SectionDock from "./SectionDock";

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

  // the astronaut is the hero: start it on the next frame, not on idle
  useEffect(() => {
    const id = requestAnimationFrame(() => setAstro(true));
    return () => cancelAnimationFrame(id);
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
      <SectionDock />

      <div className="relative z-[1]">
        <Navbar />
        <Hero />
        <About />
        <Steps />
        <Experience />
        <Works />
        <Proof />
        <Tech />
        <Contact />
        <Footer />
      </div>
    </MotionConfig>
  );
}
