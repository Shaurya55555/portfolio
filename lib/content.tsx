import React from "react";

export const PROMPT_USER = "shaurya";
export const PROMPT_HOST = "portfolio";

export const profile = {
  name: "Shaurya Bajpai",
  role: "Full-Stack Software Engineer / Applied AI Developer",
  location: "Bengaluru, Karnataka, India",
  availability:
    "Open to Summer 2026 internships and full-time 2027 software engineering roles.",
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

const G = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "var(--green)" }}>{children}</span>
);

const Ext = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const para = (key: string, ...text: React.ReactNode[]): Line => (
  <span key={key}>{text}</span>
);
const gap = (key: string): Line => <span key={key} />;

export const COMMAND_LIST = [
  "help",
  "about",
  "bio",
  "experience",
  "projects",
  "skills",
  "achievements",
  "education",
  "leadership",
  "contact",
  "resume",
  "socials",
  "whoami",
  "history",
  "clear",
];

function help(): Line[] {
  const rows: [string, string][] = [
    ["about", "the long version, first person"],
    ["bio", "the 60-word version"],
    ["experience", "internships and what I did"],
    ["projects", "eight things I have shipped, with links"],
    ["skills", "languages, frameworks, applied AI, tooling"],
    ["achievements", "hackathons, DSA, workshops"],
    ["education", "degree, timeline, coursework"],
    ["leadership", "clubs and campus roles"],
    ["contact", "how to reach me + what I am looking for"],
    ["resume", "download the PDF"],
    ["socials", "github, linkedin, leetcode"],
    ["whoami", "one line"],
    ["history", "commands run this session"],
    ["clear", "wipe the screen"],
  ];
  return [
    <H key="h">available commands</H>,
    gap("g"),
    ...rows.map(([cmd, desc], i) => (
      <span key={i}>
        <G>{cmd.padEnd(14)}</G>
        <Dim>{desc}</Dim>
      </span>
    )),
    gap("g2"),
    <Dim key="t">
      tip: Tab autocompletes, arrow keys walk history, or tap a chip below.
    </Dim>,
  ];
}

function about(): Line[] {
  return [
    <H key="h">about</H>,
    gap("g0"),
    para(
      "1",
      "I am a full-stack software engineer and a B.Tech Computer Science student at The LNM Institute of Information Technology in Jaipur, graduating in 2027. I like building things that run in production, not just demos, and I enjoy the full path from schema design and API work to the interface a person actually clicks on."
    ),
    gap("g1"),
    para(
      "2",
      "I have held two internships. At Marine Edge I worked as a Software Development Engineer intern on a platform serving more than 7,000 users, where I built backend services and REST APIs, integrated the Razorpay payment API, implemented role-based access control, and tuned the application for a 30 percent faster load. At APJ Academy I worked as a Frontend Web Developer intern, building responsive React interfaces and cutting data retrieval latency by 25 percent through query and index analysis."
    ),
    gap("g2"),
    para(
      "3",
      "My side projects are where I explore new areas. I built a tool-calling AI assistant that streams responses token by token and grounds them with retrieval. I built an emergency response platform that scrapes news sources, filters them through a language-model relevance classifier, and merges geospatial data from multiple providers with failover. It won runner-up at the LNMIIT HackCrux hackathon. I also built a decision engine where, after studying the failure modes, I chose a deterministic rule engine over an LLM so the system could not fabricate output, then validated it against 100 scenarios."
    ),
    gap("g3"),
    para(
      "4",
      "I have solved more than 300 data structures and algorithms problems in C++. I am looking for software engineering roles where I can keep building across the stack."
    ),
    gap("g4"),
    <span key="5">
      <Dim>{profile.availability}</Dim>
    </span>,
  ];
}

function bio(): Line[] {
  return [
    <H key="h">bio</H>,
    gap("g"),
    para(
      "1",
      "I am a full-stack software engineer and final-years B.Tech CSE student at LNMIIT, Jaipur. I have completed two engineering internships and shipped several deployed side projects across React, Node.js, FastAPI, and PostgreSQL. My recent work focuses on applied AI: LLM tool-calling agents, retrieval-augmented generation, and evaluation of model-driven systems. I have solved 300 or more data structures and algorithms problems."
    ),
  ];
}

function experience(): Line[] {
  return [
    <H key="h">experience</H>,
    gap("g0"),
    <span key="a0">
      <G>Marine Edge</G> <Dim>. Software Development Engineer Intern</Dim>
    </span>,
    <span key="a1">
      <Dim>Mar 2025 - Jan 2026 . Bengaluru, Karnataka</Dim>
    </span>,
    para("a2", "- Built and maintained backend services and REST APIs for a web platform serving more than 7,000 users."),
    para("a3", "- Integrated the Razorpay REST API, handling authentication, data mapping, and error and retry paths."),
    para("a4", "- Implemented a role-based access control system with defined roles and permissions."),
    para("a5", "- Designed relational schema on PostgreSQL and optimized queries and indexes, contributing to a 30 percent faster load."),
    para("a6", "- Automated deployment with a Git-based workflow, reducing manual release steps."),
    para("a7", "- Diagnosed production issues by tracing application logs to root cause."),
    gap("g1"),
    <span key="b0">
      <G>APJ Academy</G> <Dim>. Frontend Web Developer Intern</Dim>
    </span>,
    <span key="b1">
      <Dim>Aug 2024 - Feb 2025 . Bengaluru, Karnataka</Dim>
    </span>,
    para("b2", "- Built responsive, cross-device user interfaces in React.js from project requirements."),
    para("b3", "- Optimized database queries, reducing data retrieval latency by 25 percent through query and index analysis."),
    para("b4", "- Implemented real-time data synchronization over WebSockets for low-latency updates."),
    para("b5", "- Collaborated with the team on code reviews and code quality."),
  ];
}

type Project = {
  name: string;
  tagline: string;
  role: string;
  stack: string;
  bullets: string[];
  live?: string;
  code?: string;
  demo?: string;
};

const projects: Project[] = [
  {
    name: "NammaStocks . AI Stock Assistant",
    tagline:
      "A stock analytics web app with Stockie, an AI assistant that takes actions through tool calls and answers from live data.",
    role: "Contributor. Started from an existing codebase, not solo work. My scope below.",
    stack:
      "React . TypeScript . Tailwind . Python . FastAPI . PostgreSQL . LangChain . OpenAI / Anthropic / Gemini / Ollama",
    bullets: [
      "The assistant loop where the model returns structured tool-call actions the app executes, then feeds results back for a final answer.",
      "Token-by-token response streaming over server-sent events so the UI updates as the model generates.",
      "A retrieval-augmented prompt that injects current market data so answers stay grounded.",
      "A pluggable provider layer: one interface against OpenAI, Anthropic, Gemini, or a local Ollama model.",
    ],
    live: "https://nammastocks.vercel.app",
    code: "https://github.com/Shaurya55555/NammaStocks",
  },
  {
    name: "OARFIN . Real-Time Emergency Response Platform",
    tagline:
      "Pulls in disaster news, filters it with a language-model classifier, and routes people to the nearest safe shelter.",
    role: "Core developer. Team project. Runner-up at LNMIIT HackCrux.",
    stack:
      "React . Node.js . Flutter . Google Gemini API . Playwright . Pullpush API . Overpass API . FEMA data",
    bullets: [
      "A scraping pipeline in Playwright collecting updates from news sources, plus a Reddit feed via the Pullpush REST API.",
      "An LLM relevance classifier: each scraped item goes to Gemini as a yes/no question so only relevant content enters the app.",
      "A geospatial service merging shelter data from Overpass and FEMA, with failover between sources and Haversine nearest-shelter routing.",
      "A responsive React web frontend and a Flutter mobile app sharing one backend.",
    ],
    live: "https://oarfin-website-nine.vercel.app",
    code: "https://github.com/Shaurya55555/Oarfin",
  },
  {
    name: "Ecom Microservice GraphQL . E-Commerce Backend",
    tagline:
      "A three-service e-commerce backend behind a single GraphQL API, communicating over an event stream.",
    role: "Solo.",
    stack: "Node.js . Express . GraphQL . MongoDB . Apache Kafka . Docker",
    bullets: [
      "Three independent Docker-containerized services behind one GraphQL API layer.",
      "Event-driven communication between services over Kafka producer/consumer topics.",
      "A React storefront (catalog, product pages, cart) consuming the API.",
      "The bug: messages silently disappearing between two services, no error anywhere. Root cause was a producer and consumer on slightly different topic names. No error is not no problem.",
    ],
    live: "https://ecom-microservice-graphql.vercel.app",
    code: "https://github.com/Shaurya55555/ecom-microservice-graphql",
  },
  {
    name: "Vera, but Better . Decision Automation Engine",
    tagline:
      "A scoring engine that turns messy inputs into one ranked decision, built on purpose without an LLM.",
    role: "Solo. Built for the magicpin AI challenge.",
    stack: "Python . FastAPI . Redis . serverless on Vercel",
    bullets: [
      "A deterministic rule engine scoring inputs across 26 weighted categories, outputting one ranked decision plus a message.",
      "A validation suite of 100 scenarios covering malformed and edge-case payloads.",
      "The judgment call: the obvious move was to call an LLM. I studied the failure modes first and chose a deterministic engine so the system could not fabricate an output.",
    ],
    code: "https://github.com/Shaurya55555/magicpin",
  },
  {
    name: "DevLab . CI/CD and Deployment Automation",
    tagline: "A sandbox for build, test, and deploy automation across two CI systems.",
    role: "Solo.",
    stack: "Node.js . TypeScript . GitHub Actions . Jenkins . Bash . Docker",
    bullets: [
      "A dual pipeline (GitHub Actions and Jenkins) so a change builds, tests, and deploys without manual steps.",
      "Bash scripts automating environment setup, and Docker Compose config for consistent environments across machines.",
    ],
    code: "https://github.com/Shaurya55555/DevLab",
  },
  {
    name: "TorrentEdge . Distributed Multi-Service System",
    tagline:
      "A systems study of reverse proxies, message queues, and containerized multi-service orchestration.",
    role: "Solo. Infrastructure and architecture study, not a working BitTorrent client (peer-protocol layer is scaffolded).",
    stack: "Node.js . Apache Kafka . Nginx . Docker Compose",
    bullets: [
      "A multi-service architecture with a Kafka message queue decoupling ingestion from processing.",
      "Nginx as a reverse proxy routing HTTP, WebSocket, and inter-service traffic.",
      "One-command startup with Docker Compose plus setup documentation.",
    ],
    demo: "https://shaurya55555.github.io/TorrentEdge/",
    code: "https://github.com/Shaurya55555/TorrentEdge",
  },
  {
    name: "Cat vs Dog Image Classifier . Computer Vision",
    tagline: "A convolutional neural network image classifier with proper training discipline.",
    role: "Solo. Learning project.",
    stack: "Python . TensorFlow . Keras . OpenCV",
    bullets: [
      "A CNN binary classifier trained with ImageDataGenerator augmentation to reduce overfitting.",
      "Training controlled with EarlyStopping, ModelCheckpoint, and ReduceLROnPlateau callbacks.",
      "Held-out evaluation with iteration on architecture and learning rate.",
    ],
    code: "https://github.com/Shaurya55555/CatDogImageANN",
  },
  {
    name: "Student Outcome Classification . ML Pipeline",
    tagline: "An end-to-end classification pipeline comparing five algorithms with honest evaluation.",
    role: "Solo. Data science coursework.",
    stack: "Python . scikit-learn . Pandas . NumPy . Matplotlib",
    bullets: [
      "Cleaning, feature engineering, and stratified train/test splits.",
      "Logistic Regression, KNN, Decision Tree, Random Forest, and K-Means trained and compared.",
      "Confusion matrices and precision/recall/F1, selecting the model on held-out performance.",
    ],
    code: "https://github.com/Shaurya55555/DataScProject",
  },
];

function projectsCmd(): Line[] {
  const out: Line[] = [
    <H key="h">projects</H>,
    <Dim key="sub">eight shipped. newest and most involved first.</Dim>,
    gap("g0"),
  ];
  projects.forEach((p, i) => {
    out.push(
      <span key={`n${i}`}>
        <G>{`${String(i + 1).padStart(2, "0")}. ${p.name}`}</G>
      </span>,
      <span key={`s${i}`}>
        <Dim>{p.stack}</Dim>
      </span>,
      para(`t${i}`, p.tagline),
      <span key={`r${i}`}>
        <Dim>role: </Dim>
        {p.role}
      </span>
    );
    p.bullets.forEach((b, j) =>
      out.push(<span key={`b${i}-${j}`}>{`  - ${b}`}</span>)
    );
    const linkRow: React.ReactNode[] = [];
    if (p.live)
      linkRow.push(
        <span key="lv">
          <Dim>live </Dim>
          <Ext href={p.live}>{p.live}</Ext>
          {"  "}
        </span>
      );
    if (p.demo)
      linkRow.push(
        <span key="dm">
          <Dim>demo </Dim>
          <Ext href={p.demo}>{p.demo}</Ext>
          {"  "}
        </span>
      );
    if (p.code)
      linkRow.push(
        <span key="cd">
          <Dim>code </Dim>
          <Ext href={p.code}>{p.code}</Ext>
        </span>
      );
    out.push(<span key={`l${i}`}>{linkRow}</span>, gap(`g${i}`));
  });
  return out;
}

function skills(): Line[] {
  const tier = (label: string, rows: [string, string][]) => [
    <span key={`${label}-h`}>
      <H>{label}</H>
    </span>,
    ...rows.map(([k, v], i) => (
      <span key={`${label}-${i}`}>
        <G>{k.padEnd(14)}</G>
        {v}
      </span>
    )),
    gap(`${label}-g`),
  ];
  return [
    <H key="h">skills</H>,
    gap("g0"),
    ...tier("core . project and internship backed", [
      ["languages", "JavaScript, TypeScript, Python, C++, SQL"],
      ["frontend", "React.js, Next.js, Redux, Tailwind CSS, HTML5, CSS3, WebSockets"],
      ["backend", "Node.js, Express.js, FastAPI, REST design, GraphQL"],
      ["databases", "PostgreSQL, MongoDB, Redis"],
      ["applied ai", "LLM APIs (OpenAI, Anthropic, Gemini), LangChain, RAG, prompt engineering, tool calling, SSE streaming"],
      ["devops", "Git, Docker, Docker Compose, CI/CD (GitHub Actions, Jenkins), Bash, Linux, Postman"],
      ["cs", "Data structures and algorithms (300+), OOP, system design basics"],
    ]),
    ...tier("working knowledge", [
      ["infra", "Apache Kafka, Nginx reverse proxy, message-queue architecture"],
      ["ml", "TensorFlow / Keras, scikit-learn, Pandas, NumPy, model evaluation"],
      ["other", "Flutter, Playwright web scraping, third-party APIs with failover, MySQL, indexing"],
    ]),
    ...tier("familiar / learning", [
      ["", "Java, Spring Boot, PyTorch, OpenCV, Kubernetes, AWS, Azure, GCP, Terraform, Angular, PHP"],
    ]),
  ];
}

function achievements(): Line[] {
  return [
    <H key="h">achievements and recognition</H>,
    gap("g"),
    para("1", "- Runner-Up (2nd place), LNMIIT HackCrux Hackathon, for building OARFIN."),
    para("2", "- Finalist, HackRx 6.0 Hackathon, organized by Bajaj Finserv Health Limited."),
    para("3", "- Top 5 teams from the college, shortlisted for the Smart India Hackathon."),
    para("4", "- GenAI Workshop, LNMIIT, scored 100 out of 100. Covered ANN, CNN, RNN, LLMs, RAG, prompt engineering."),
    para("5", "- 300+ data structures and algorithms problems solved in C++ across LeetCode and other platforms."),
  ];
}

function education(): Line[] {
  return [
    <H key="h">education</H>,
    gap("g"),
    <span key="1">
      <G>The LNM Institute of Information Technology (LNMIIT), Jaipur</G>
    </span>,
    para("2", "B.Tech, Computer Science and Engineering. Aug 2023 - Aug 2027 (expected)."),
    gap("g2"),
    <span key="3">
      <Dim>coursework </Dim>
      data structures and algorithms, operating systems, database systems,
      computer networks, machine learning, generative AI
    </span>,
  ];
}

function leadership(): Line[] {
  return [
    <H key="h">leadership and extracurricular</H>,
    gap("g"),
    para("1", "- Core Member, Media Cell, LNMIIT."),
    para("2", "- Sponsorship Head, Vivacity (LNMIIT cultural festival)."),
    para("3", "- Member, Sankalp social welfare club, LNMIIT."),
  ];
}

function contact(): Line[] {
  return [
    <H key="h">contact</H>,
    gap("g0"),
    para(
      "1",
      "I am looking for software engineering internships and full-time roles where I can work across the stack: backend, frontend, and applied AI. If you are hiring or want to talk about a project, reach out."
    ),
    gap("g1"),
    <span key="2">
      <Dim>email {"    "}</Dim>
      <a href={`mailto:${profile.email}`}>{profile.email}</a>
    </span>,
    <span key="3">
      <Dim>phone {"    "}</Dim>
      {profile.phone}
    </span>,
    <span key="4">
      <Dim>linkedin </Dim>
      <Ext href={profile.links.linkedin}>{profile.links.linkedin}</Ext>
    </span>,
    <span key="5">
      <Dim>github {"   "}</Dim>
      <Ext href={profile.links.github}>{profile.links.github}</Ext>
    </span>,
    <span key="6">
      <Dim>resume {"   "}</Dim>
      <Ext href="/Shaurya_Bajpai_Resume.pdf">/Shaurya_Bajpai_Resume.pdf</Ext>
    </span>,
  ];
}

function resume(): Line[] {
  return [
    <H key="h">resume</H>,
    gap("g"),
    <span key="1">
      <Ext href="/Shaurya_Bajpai_Resume.pdf">
        {"->"} download /Shaurya_Bajpai_Resume.pdf
      </Ext>
    </span>,
  ];
}

function socials(): Line[] {
  return [
    <H key="h">socials</H>,
    gap("g"),
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
      {profile.name}, {profile.role.toLowerCase()}. type <G>about</G> for the
      longer version.
    </span>,
  ];
}

export const COMMANDS: Record<string, () => Line[]> = {
  help,
  about,
  bio,
  experience,
  work: experience,
  projects: projectsCmd,
  skills,
  achievements,
  education,
  leadership,
  contact,
  hire: contact,
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
        type <G>help</G> for the list.
      </Dim>
    </span>,
  ];
}
