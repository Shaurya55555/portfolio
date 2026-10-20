"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Eases wheel / trackpad scrolling into one continuous glide instead of
 * stepped jumps. Native scroll position still drives everything else
 * (framer's useScroll, sticky layouts), so nothing else needs to know.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.9,
      anchors: { offset: -72 },
    });
    let raf = requestAnimationFrame(function tick(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);
  return null;
}
