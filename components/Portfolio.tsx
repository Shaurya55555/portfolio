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
import HorizontalScene from "./HorizontalScene";
import { useMatchMedia } from "@/lib/useMatchMedia";

// Code-split the 3D/WebGL layers out of the main bundle so the text, nav
// and layout can paint immediately instead of waiting on three.js.
const StarsCanvas = dynamic(() => import("./canvas/Stars"), { ssr: false });
const AstronautCanvas = dynamic(() => import("./AstronautCanvas"), {
  ssr: false,
});

export default function Portfolio() {
  // Mount the WebGL layers only once the page has had a chance to paint,
  // instead of racing shader compilation / GLTF parsing against the very
  // first frame — that race is what read as the page "breaking" on load.
  const [ready, setReady] = useState(false);
  // desktop + motion allowed: the sections run as a pinned sideways scene
  const horizontal = useMatchMedia(
    "(min-width: 1024px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)",
  );

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
      {ready && <StarsCanvas />}

      {/* 3D astronaut, confined to the hero */}
      {ready && (
        <AstronautCanvas className="pointer-events-none fixed inset-0 z-0 h-screen w-screen" />
      )}

      <ScrollProgress />
      {!horizontal && <SectionDock />}

      <div className="relative z-[1]">
        <Navbar />
        <Hero />
        {horizontal ? (
          <HorizontalScene>
            <About />
            <Steps />
            <Experience />
            <Works />
            <Proof />
            <Tech />
            <Contact />
          </HorizontalScene>
        ) : (
          <>
            <About />
            <Steps />
            <Experience />
            <Works />
            <Proof />
            <Tech />
            <Contact />
          </>
        )}
        <Footer />
      </div>
    </MotionConfig>
  );
}
