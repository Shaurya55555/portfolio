import { marqueeItems } from "@/lib/data";

/** Infinite ticker of the stack, sitting right under the hero. */
export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div
      aria-hidden
      className="marquee-mask relative z-[1] overflow-hidden border-y border-white/10 bg-black/50 py-4 backdrop-blur-sm"
    >
      <div className="animate-marquee flex w-max gap-3 hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-panel-2/70 px-4 py-1.5 font-mono text-[13px] text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
