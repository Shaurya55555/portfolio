"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children only once this wrapper is near the viewport. Keeps heavy
 * things (WebGL canvases) from mounting until the visitor is about to
 * scroll to them, instead of all firing at once on page load.
 */
export default function InView({
  children,
  className = "",
  rootMargin = "300px",
  once = true,
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
  /** keep children mounted after the first time they come near */
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [minH, setMinH] = useState<number>();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          if (once) io.disconnect();
        } else if (!once) {
          // keep the space so the page does not jump when the canvases unmount
          setMinH(node.offsetHeight);
          setShow(false);
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin, once]);

  return (
    <div ref={ref} className={className} style={minH ? { minHeight: minH } : undefined}>
      {show ? children : null}
    </div>
  );
}
