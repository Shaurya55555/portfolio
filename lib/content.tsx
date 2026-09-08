import React from "react";

export const PROMPT_USER = "shaurya";
export const PROMPT_HOST = "portfolio";

export const profile = {
  name: "Shaurya Bajpai",
  role: "Full-Stack Software Engineer",
  location: "Bengaluru, Karnataka, India",
  email: "bajpaishaurya2911@gmail.com",
  phone: "+91-7985200306",
  links: {
    github: "https://github.com/Shaurya55555",
    linkedin: "https://www.linkedin.com/in/shaurya-bajpai/",
    leetcode: "https://leetcode.com/u/shaurya55555/",
  },
};

export const BANNER = String.raw`
  ____  _                                    ____        _             _
 / ___|| |__   __ _ _   _ _ __ _   _  __ _  | __ )  __ _(_)_ __   __ _(_)
 \___ \| '_ \ / _\ | | | | '__| | | |/ _\ | |  _ \ / _\ | | '_ \ / _\ | |
  ___) | | | | (_| | |_| | |  | |_| | (_| | | |_) | (_| | | |_) | (_| | |
 |____/|_| |_|\__,_|\__,_|_|   \__, |\__,_| |____/ \__,_|_| .__/ \__,_|_|
                               |___/                      |_|
`;

export type Line = React.ReactNode;

const H = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--amber)" }} className="glow">
    {children}
  </span>
);

const Dim = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--muted)" }}>{children}</span>
);

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

export const COMMAND_LIST = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "education",
  "achievements",
  "contact",
  "resume",
  "socials",
  "whoami",
  "history",
  "clear",
];

function help(): Line[] {
  const rows: [string, string][] = [
    ["about", "who I am and what I build"],
    ["experience", "internships and roles"],
    ["projects", "things I have shipped, with source links"],
    ["skills", "languages, frameworks, tooling"],
    ["education", "degree and timeline"],
    ["achievements", "hackathons, DSA, certifications"],
    ["contact", "how to reach me"],
    ["resume", "download / view resume"],
    ["socials", "github, linkedin, leetcode"],
    ["whoami", "short answer"],
    ["history", "commands run this session"],
    ["clear", "wipe the screen"],
  ];
  return [
    <H key="h">available commands</H>,
    <span key="s" />,
    ...rows.map(([cmd, desc], i) => (
      <span key={i}>
        <span style={{ color: "var(--green)" }}>{cmd.padEnd(14)}</span>
        <Dim>{desc}</Dim>
      </span>
    )),
    <span key="sp" />,
    <Dim key="t1">tip: use Tab to autocomplete, arrow keys for history, or tap a chip below.</Dim>,
  ];
}

function about(): Line[] {
  return [
    <H key="h">about</H>,
    <span key="s" />,
    <span key="1">
      Full-stack software engineer. I build component-driven SPAs in
      React.js / Next.js with Redux and Tailwind on the front,
    </span>,
    <span key="2">
      and Node.js / Express services with MongoDB, PostgreSQL and GraphQL on the
      back. Comfortable with Docker, CI/CD pipelines and Kafka.
    </span>,
    <span key="3" />,
    <span key="4">
      I like taking a feature from schema design through API, UI and deploy, and I
      pick up unfamiliar stacks quickly.
    </span>,
    <span key="5" />,
    <span key="6">
      <Dim>location </Dim>
      {profile.location}
    </span>,
  ];
}

function experience(): Line[] {
  return [
    <H key="h">experience</H>,
    <span key="s" />,
    <span key="a1" style={{ color: "var(--green)" }}>
      Marine Edge {"  "}
      <Dim>SDE Intern</Dim>
    </span>,
    <span key="a2">
      <Dim>Mar 2025 - Jan 2026 . Bengaluru</Dim>
    </span>,
    <span key="a3">
      - Built and maintained backend services and RESTful APIs consumed by
      single-page frontends.
    </span>,
    <span key="a4">
      - Designed relational schema on PostgreSQL and tuned queries and indexes
      for a measurable load-time improvement.
    </span>,
    <span key="a5">
      - Implemented role-based access control and token-based auth with
      input validation, worked an Agile cycle with code reviews.
    </span>,
    <span key="a6">
      - Traced a silent production data-loss bug to its root cause and fixed it.
    </span>,
    <span key="sp" />,
    <span key="b1" style={{ color: "var(--green)" }}>
      APJ Academy {"  "}
      <Dim>Frontend Web Developer Intern</Dim>
    </span>,
    <span key="b2">
      <Dim>Aug 2024 - Feb 2025 . Bengaluru</Dim>
    </span>,
    <span key="b3">
      - Built responsive, component-driven interfaces in React and Tailwind.
    </span>,
    <span key="b4">
      - Integrated REST APIs, handled client-side state, shipped against
      design specs.
    </span>,
  ];
}

type Project = {
  name: string;
  stack: string;
  blurb: string;
  href: string;
};

const projects: Project[] = [
  {
    name: "Ecom Microservice GraphQL",
    stack: "Node.js . GraphQL . Apollo . MongoDB . Docker",
    blurb:
      "E-commerce backend split into services behind a GraphQL gateway, containerized for local orchestration.",
    href: "https://github.com/Shaurya55555/ecom-microservice-graphql",
  },
  {
    name: "DevLab",
    stack: "Node.js . Express . GitHub Actions . Docker",
    blurb:
      "CI/CD-oriented Node.js server used to practice pipeline, container and deploy workflows end to end.",
    href: "https://github.com/Shaurya55555/DevLab",
  },
  {
    name: "TorrentEdge",
    stack: "Node.js . BitTorrent protocol . TCP/UDP",
    blurb:
      "A BitTorrent client written from the protocol up: bencode parsing, tracker handshake, piece download.",
    href: "https://github.com/Shaurya55555/TorrentEdge",
  },
];

function projectsCmd(): Line[] {
  const out: Line[] = [<H key="h">projects</H>, <span key="s" />];
  projects.forEach((p, i) => {
    out.push(
      <span key={`n${i}`} style={{ color: "var(--green)" }}>
        {p.name}
      </span>,
      <span key={`s${i}`}>
        <Dim>{p.stack}</Dim>
      </span>,
      <span key={`b${i}`}>{p.blurb}</span>,
      <span key={`l${i}`}>
        <Ext href={p.href}>{p.href}</Ext>
      </span>,
      <span key={`sp${i}`} />
    );
  });
  out.push(
    <Dim key="more">
      more on github: <Ext href={profile.links.github}>{profile.links.github}</Ext>
    </Dim>
  );
  return out;
}

function skills(): Line[] {
  const groups: [string, string][] = [
    ["languages", "JavaScript, TypeScript, Java, SQL, C++"],
    [
      "frontend",
      "React.js, Next.js, Redux, React Query, Tailwind CSS, HTML5, CSS3",
    ],
    [
      "backend",
      "Node.js, Express.js, GraphQL (Apollo), REST, JWT / OAuth, WebSockets",
    ],
    ["data", "PostgreSQL, MongoDB, Prisma, Redis, Kafka"],
    [
      "devops",
      "Docker, GitHub Actions, Jenkins, CI/CD, Nginx, Linux, Vercel, AWS basics",
    ],
    ["practice", "Data structures and algorithms, system design fundamentals"],
  ];
  return [
    <H key="h">skills</H>,
    <span key="s" />,
    ...groups.map(([k, v], i) => (
      <span key={i}>
        <span style={{ color: "var(--green)" }}>{k.padEnd(12)}</span>
        {v}
      </span>
    )),
  ];
}

function education(): Line[] {
  return [
    <H key="h">education</H>,
    <span key="s" />,
    <span key="1" style={{ color: "var(--green)" }}>
      The LNM Institute of Information Technology, Jaipur
    </span>,
    <span key="2">B.Tech, Computer Science and Engineering</span>,
    <span key="3">
      <Dim>Aug 2023 - Aug 2027</Dim>
    </span>,
  ];
}

function achievements(): Line[] {
  return [
    <H key="h">achievements and certifications</H>,
    <span key="s" />,
    <span key="1">- 300+ data structures and algorithms problems solved.</span>,
    <span key="2">
      - HackCrux Hackathon Runner-Up with OARFIN, a real-time disaster
      management and information system.
    </span>,
    <span key="3">
      {"  "}
      <Ext href="https://github.com/Shaurya55555/Oarfin">
        github.com/Shaurya55555/Oarfin
      </Ext>
    </span>,
    <span key="4">
      - Cloud and foundational certifications from AWS, Google and IBM.
    </span>,
  ];
}

function contact(): Line[] {
  return [
    <H key="h">contact</H>,
    <span key="s" />,
    <span key="1">
      <Dim>email {"    "}</Dim>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </span>,
    <span key="2">
      <Dim>phone {"    "}</Dim>
      {profile.phone}
    </span>,
    <span key="3">
      <Dim>github {"   "}</Dim>
      <Ext href={profile.links.github}>{profile.links.github}</Ext>
    </span>,
    <span key="4">
      <Dim>linkedin </Dim>
      <Ext href={profile.links.linkedin}>{profile.links.linkedin}</Ext>
    </span>,
  ];
}

function resume(): Line[] {
  return [
    <H key="h">resume</H>,
    <span key="s" />,
    <span key="1">
      <Ext href="/Shaurya_Bajpai_Resume.pdf">
        {"->"} /Shaurya_Bajpai_Resume.pdf
      </Ext>
    </span>,
    <span key="2">
      <Dim>
        drop the latest PDF into /public as Shaurya_Bajpai_Resume.pdf to wire this
        up.
      </Dim>
    </span>,
  ];
}

function socials(): Line[] {
  return [
    <H key="h">socials</H>,
    <span key="s" />,
    <span key="1">
      <Dim>github {"   "}</Dim>
      <Ext href={profile.links.github}>{profile.links.github}</Ext>
    </span>,
    <span key="2">
      <Dim>linkedin </Dim>
      <Ext href={profile.links.linkedin}>{profile.links.linkedin}</Ext>
    </span>,
    <span key="3">
      <Dim>leetcode </Dim>
      <Ext href={profile.links.leetcode}>{profile.links.leetcode}</Ext>
    </span>,
  ];
}

function whoami(): Line[] {
  return [
    <span key="1">
      {profile.name}, {profile.role.toLowerCase()}. type{" "}
      <span style={{ color: "var(--green)" }}>about</span> for the longer version.
    </span>,
  ];
}

export const COMMANDS: Record<string, () => Line[]> = {
  help,
  about,
  experience,
  work: experience,
  projects: projectsCmd,
  skills,
  education,
  achievements,
  contact,
  resume,
  cv: resume,
  socials,
  social: socials,
  whoami,
};

export function notFound(cmd: string): Line[] {
  return [
    <span key="1" style={{ color: "var(--red)" }}>
      command not found: {cmd}
    </span>,
    <span key="2">
      <Dim>
        type <span style={{ color: "var(--green)" }}>help</span> for the list.
      </Dim>
    </span>,
  ];
}
