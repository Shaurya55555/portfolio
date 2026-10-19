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
}: {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {show ? children : null}
    </div>
  );
}
