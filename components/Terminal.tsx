"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BANNER,
  COMMANDS,
  COMMAND_LIST,
  Line,
  notFound,
  PROMPT_HOST,
  PROMPT_USER,
  profile,
} from "@/lib/content";

type Block = {
  id: number;
  input: string | null;
  lines: Line[];
};

const CHIPS = [
  "about",
  "experience",
  "projects",
  "skills",
  "achievements",
  "education",
  "leadership",
  "contact",
  "resume",
];

function Prompt() {
  return (
    <span>
      <span style={{ color: "var(--green)" }} className="glow">
        {PROMPT_USER}
      </span>
      <span style={{ color: "var(--muted)" }}>@</span>
      <span style={{ color: "var(--cyan)" }}>{PROMPT_HOST}</span>
      <span style={{ color: "var(--muted)" }}>:~$ </span>
    </span>
  );
}

let uid = 0;
const nextId = () => ++uid;

export default function Terminal() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [value, setValue] = useState("");
  const [typed, setTyped] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState<number>(-1);
  const [booted, setBooted] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [blocks, booted, scrollToBottom]);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      if (cmd) setTyped((t) => [...t, cmd]);
      setHistIndex(-1);

      if (cmd === "") {
        setBlocks((b) => [...b, { id: nextId(), input: "", lines: [] }]);
        return;
      }
      if (cmd === "clear") {
        setBlocks([]);
        return;
      }
      if (cmd === "history") {
        setBlocks((b) => [
          ...b,
          {
            id: nextId(),
            input: cmd,
            lines: typed.length
              ? typed.map((c, i) => (
                  <span key={i}>
                    <span style={{ color: "var(--muted)" }}>
                      {String(i + 1).padStart(3, " ")}
                    </span>{" "}
                    {c}
                  </span>
                ))
              : [<span key="0" style={{ color: "var(--muted)" }}>no history yet</span>],
          },
        ]);
        return;
      }

      const key = cmd.split(/\s+/)[0].toLowerCase();
      const handler = COMMANDS[key];
      setBlocks((b) => [
        ...b,
        {
          id: nextId(),
          input: cmd,
          lines: handler ? handler() : notFound(key),
        },
      ]);
    },
    [typed]
  );

  // boot sequence
  useEffect(() => {
    const bannerLines = BANNER.replace(/\n$/, "").split("\n");
    const intro: Line[] = [
      ...bannerLines.map((l, i) => (
        <span key={i} style={{ color: "var(--green)" }} className="glow">
          {l}
        </span>
      )),
      <span key="r" />,
      <span key="role">
        {profile.role} <span style={{ color: "var(--muted)" }}>//</span>{" "}
        {profile.location}
      </span>,
      <span key="avail" style={{ color: "var(--muted)" }}>
        {profile.availability}
      </span>,
      <span key="hint" style={{ color: "var(--muted)" }}>
        booting shell... type{" "}
        <span style={{ color: "var(--green)" }}>help</span> to list commands.
      </span>,
    ];

    setBlocks([{ id: nextId(), input: null, lines: intro }]);
    const t = setTimeout(() => {
      setBlocks((b) => [
        ...b,
        { id: nextId(), input: "help", lines: COMMANDS.help() },
      ]);
      setBooted(true);
      inputRef.current?.focus();
    }, 450);
    return () => clearTimeout(t);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(value);
      setValue("");
      return;
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const frag = value.trim().toLowerCase();
      if (!frag) return;
      const matches = COMMAND_LIST.filter((c) => c.startsWith(frag));
      if (matches.length === 1) {
        setValue(matches[0]);
      } else if (matches.length > 1) {
        setBlocks((b) => [
          ...b,
          {
            id: nextId(),
            input: null,
            lines: [
              <span key="0" style={{ color: "var(--muted)" }}>
                {matches.join("   ")}
              </span>,
            ],
          },
        ]);
      }
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!typed.length) return;
      const idx =
        histIndex === -1 ? typed.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setValue(typed[idx]);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= typed.length) {
        setHistIndex(-1);
        setValue("");
      } else {
        setHistIndex(idx);
        setValue(typed[idx]);
      }
      return;
    }
    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setBlocks([]);
    }
  };

  const chipRun = (c: string) => {
    run(c);
    inputRef.current?.focus();
  };

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main
      className="flicker"
      onClick={() => inputRef.current?.focus()}
      style={{
        minHeight: "100dvh",
        display: "flex",
        justifyContent: "center",
        padding: "clamp(8px, 3vw, 40px)",
      }}
    >
      <div
        style={{
          width: "min(920px, 100%)",
          display: "flex",
          flexDirection: "column",
          border: "1px solid #1c2a1f",
          borderRadius: 10,
          background: "var(--bg-soft)",
          boxShadow: "0 0 40px rgba(0,0,0,0.6), inset 0 0 60px rgba(0,0,0,0.4)",
          overflow: "hidden",
          maxHeight: "calc(100dvh - clamp(16px, 6vw, 80px))",
        }}
      >
        {/* title bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            borderBottom: "1px solid #1c2a1f",
            background: "#0b110b",
          }}
        >
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#ff5f56",
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <span
            style={{
              width: 11,
              height: 11,
              borderRadius: "50%",
              background: "#27c93f",
            }}
          />
          <span
            style={{
              marginLeft: 8,
              color: "var(--muted)",
              fontSize: 12,
            }}
          >
            {PROMPT_USER}@{PROMPT_HOST}: ~/portfolio
          </span>
        </div>

        {/* screen */}
        <div
          ref={scrollRef}
          style={{
            padding: "16px clamp(12px, 3vw, 22px)",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {blocks.map((blk) => (
            <div key={blk.id} style={{ marginBottom: 10 }}>
              {blk.input !== null && (
                <div style={{ whiteSpace: "pre-wrap" }}>
                  <Prompt />
                  {blk.input}
                </div>
              )}
              {blk.lines.map((ln, i) => (
                <div key={i} style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {ln}
                </div>
              ))}
            </div>
          ))}

          {/* live input line */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <Prompt />
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCapitalize="off"
              aria-label="terminal input"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "var(--fg)",
                font: "inherit",
                caretColor: "var(--green)",
                padding: 0,
              }}
            />
          </div>
        </div>

        {/* chips */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            padding: "10px clamp(12px, 3vw, 22px)",
            borderTop: "1px solid #1c2a1f",
            background: "#0b110b",
          }}
        >
          {CHIPS.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.stopPropagation();
                chipRun(c);
              }}
              style={{
                background: "transparent",
                border: "1px solid #263a2a",
                color: "var(--green)",
                borderRadius: 6,
                padding: "3px 9px",
                font: "inherit",
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
          <span style={{ flex: 1 }} />
          <span style={{ color: "var(--muted)", fontSize: 12 }}>
            &copy; {year} {profile.name}
          </span>
        </div>
      </div>
    </main>
  );
}
