export const person = {
  name: "Shaurya Bajpai",
  firstName: "Shaurya",
  role: "Full-Stack Software Engineer / Applied AI Developer",
  availability:
    "Open to internships and full-time 2027 software engineering roles, and happy to relocate anywhere in India.",
  email: "bajpaishaurya2911@gmail.com",
  phone: "+91-7985200306",
  github: "https://github.com/Shaurya55555",
  linkedin: "https://www.linkedin.com/in/shaurya-bajpai/",
  leetcode: "https://leetcode.com/u/shaurya55555/",
  resume: "/Shaurya_Bajpai_Resume.pdf",
};

export const heroCopy = {
  lead: "I build full-stack products and wire",
  lead2: "language models into them.",
  sub: "React and Node on the front, FastAPI and LLMs on the back. Two internships, hackathon wins, and side projects that are actually deployed.",
};

export const navLinks = [
  { id: "about", title: "About" },
  { id: "work", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

/** Section dock (floating bottom nav). ids match the section ids on the page. */
export const dockLinks = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "build", label: "Steps" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "proof", label: "Proof" },
  { id: "stack", label: "Stack" },
  { id: "contact", label: "Contact" },
];

/** Words wrapped in *asterisks* are highlighted in the scroll-reveal statement. */
export const statement =
  "I'm a *full-stack* engineer who takes a feature from the *schema* to the *interface* to *production*, and wires *language* *models* into products people actually use.";

export const aboutContent =
  "I am a full-stack software engineer studying B.Tech Computer Science at LNMIIT, Jaipur, graduating in 2027. I have interned as a Software Development Engineer at Marine Edge and as a Frontend Web Developer at APJ Academy, working on platforms that serve thousands of users. Outside of internships I build and deploy my own projects: an AI stock assistant with a tool-calling agent, an emergency response platform that won a hackathon runner-up prize, a microservice e-commerce backend, and a decision engine I deliberately built without an LLM after analysing where a rule engine was safer. I work comfortably from the database layer to the UI, and I care about correctness, honest evaluation, and readable code. I have solved more than 300 data structures and algorithms problems in C++.";

export const rightNow =
  "Final-year B.Tech Computer Science student at LNMIIT, Jaipur, graduating in 2027. Two internships done, a hackathon runner-up, and every project below is on GitHub with the source open.";

export const stats = [
  { value: "7,000+", label: "users on the platform I built backend services for at Marine Edge" },
  { value: "30%", label: "faster load after schema and index work on PostgreSQL" },
  { value: "25%", label: "lower data-retrieval latency through query and index analysis at APJ Academy" },
  { value: "300+", label: "data structures and algorithms problems solved in C++" },
];

export const steps = [
  {
    n: "01",
    title: "Model the data",
    text: "Schema first. Relational design on PostgreSQL, indexes and queries tuned against real load, plus MongoDB where the shape is document-like.",
    log: ["$ EXPLAIN ANALYZE orders;", "● Seq Scan on orders", "✓ index scan after the fix"],
  },
  {
    n: "02",
    title: "Build the service",
    text: "Node/Express and FastAPI services, REST and GraphQL, Kafka between services. LLM features with tool calling, streaming and retrieval.",
    log: ["POST /chat", "● tool_call: get_quote", "✓ streamed over SSE"],
  },
  {
    n: "03",
    title: "Build the interface",
    text: "React, Next.js, Redux and Tailwind. Responsive components, real-time updates over WebSockets, state that stays predictable.",
    log: ["<Dashboard />", "● websocket connected", "✓ mobile and desktop ok"],
  },
  {
    n: "04",
    title: "Ship and trace",
    text: "Docker, GitHub Actions and Jenkins pipelines, a Git-based deploy flow, and application logs traced to the root cause when something breaks.",
    log: ["$ git push origin main", "● build · test · deploy", "✓ live · logs clean"],
  },
];

export const experiences = [
  {
    title: "Software Development Engineer Intern",
    companyName: "Marine Edge",
    icon: "/company/marineedge.png",
    iconBg: "#ffffff",
    date: "March 2025 - January 2026",
    stack: ["Node.js", "REST APIs", "PostgreSQL", "Razorpay", "RBAC", "Git workflow"],
    points: [
      "Built and maintained backend services and REST APIs for a web platform serving more than 7,000 users.",
      "Integrated the Razorpay REST API, handling authentication, data mapping, and error and retry paths.",
      "Implemented a role-based access control system with defined roles and permissions.",
      "Designed relational schema on PostgreSQL and optimized queries and indexes, contributing to a 30 percent faster load.",
      "Automated deployment with a Git-based workflow and traced production issues to root cause through application logs.",
    ],
  },
  {
    title: "Frontend Web Developer Intern",
    companyName: "APJ Academy",
    icon: "/company/apjacademy.png",
    iconBg: "#ffffff",
    date: "August 2024 - February 2025",
    stack: ["React.js", "WebSockets", "Query tuning", "Code review"],
    points: [
      "Built responsive, cross-device user interfaces in React.js from project requirements.",
      "Optimized database queries, reducing data retrieval latency by 25 percent through query and index analysis.",
      "Implemented real-time data synchronization over WebSockets for low-latency updates.",
      "Collaborated with the team on code reviews and code quality.",
    ],
  },
];

export type Project = {
  name: string;
  description: string;
  note: string;
  tags: string[];
  monogram: string;
  image?: string;
  liveLink?: string;
  demoLink?: string;
  sourceCodeLink: string;
};

export const projects: Project[] = [
  {
    name: "OARFIN",
    description:
      "Emergency response platform: scrapes disaster news with Playwright, filters each item through a Gemini yes/no relevance classifier, and routes people to the nearest shelter by merging Overpass and FEMA data with failover. Runner-up at LNMIIT HackCrux.",
    note: "Runner-up at the LNMIIT HackCrux hackathon. The LLM is a live classifier inside the pipeline, not a chatbot.",
    tags: ["React", "Node.js", "Gemini API"],
    monogram: "OF",
    image: "/projects/oarfin.png",
    liveLink: "https://oarfin-website-nine.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/Oarfin",
  },
  {
    name: "NammaStocks",
    description:
      "Stock analytics web app with Stockie, an AI assistant that acts through tool calls and answers from live market data. I built the tool-call loop, token-by-token SSE streaming, a retrieval-augmented prompt, and a pluggable OpenAI / Anthropic / Gemini / Ollama provider layer.",
    note: "The model returns structured actions, the app executes them, and the result goes back into the model for the final answer.",
    tags: ["React", "FastAPI", "LangChain"],
    monogram: "NS",
    image: "/projects/nammastocks.png",
    liveLink: "https://nammastocks.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/NammaStocks",
  },
  {
    name: "Ecom Microservice GraphQL",
    description:
      "Three Docker services behind one GraphQL API, communicating over Kafka topics, with a React storefront. Debugged a silent cross-service message loss down to mismatched producer and consumer topic names.",
    note: "No error is not the same as no problem: messages vanished silently until the topic names were reconciled.",
    tags: ["GraphQL", "Kafka", "Docker"],
    monogram: "EC",
    image: "/projects/ecom.png",
    liveLink: "https://ecom-microservice-graphql.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/ecom-microservice-graphql",
  },
  {
    name: "Vera, but Better",
    description:
      "A deterministic decision engine that scores inputs across 26 weighted categories into one ranked outcome. I chose a rule engine over an LLM on purpose after studying the failure modes, then validated it against 100 scenarios.",
    note: "Chosen over an LLM on purpose so the output cannot be fabricated, then checked against 100 scenarios.",
    tags: ["Python", "FastAPI", "Redis"],
    monogram: "VB",
    sourceCodeLink: "https://github.com/Shaurya55555/magicpin",
  },
  {
    name: "DevLab",
    description:
      "A dual CI/CD sandbox: the same change builds, tests, and deploys through both GitHub Actions and Jenkins, with Bash setup scripts and Docker Compose for reproducible environments across machines.",
    note: "One change, two pipelines, one reproducible environment.",
    tags: ["GitHub Actions", "Jenkins", "Docker"],
    monogram: "DL",
    sourceCodeLink: "https://github.com/Shaurya55555/DevLab",
  },
  {
    name: "TorrentEdge",
    description:
      "A distributed-systems study: a Kafka message queue decoupling ingestion from processing, Nginx as a reverse proxy for HTTP, WebSocket and inter-service traffic, and one-command Docker Compose startup. The peer-protocol layer is scaffolded.",
    note: "An infrastructure and architecture study. The peer-protocol layer is scaffolded, not a finished BitTorrent client.",
    tags: ["Kafka", "Nginx", "Docker Compose"],
    monogram: "TE",
    image: "/projects/torrentedge.png",
    demoLink: "https://shaurya55555.github.io/TorrentEdge/",
    sourceCodeLink: "https://github.com/Shaurya55555/TorrentEdge",
  },
  {
    name: "ReconIQ",
    description:
      "A reconciliation agent that matches orders, gateway settlements and bank lines. Deterministic passes handle exact, fuzzy, split (1:N) and batch (N:1) matches, and an LLM is used only for bank narrations the rules cannot read. Anything left over becomes a reason-coded exception.",
    note: "Rules first, an LLM only where the rules genuinely cannot decide. Built for the Razorpay AI Buildathon, finance controller track.",
    tags: ["Python", "LLM", "Reconciliation"],
    monogram: "RQ",
    liveLink: "https://reconiq-mocha.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/reconiq",
  },
  {
    name: "Payeazie",
    description:
      "A payment operations app: asynchronous charge processing on Redis and BullMQ workers, a state-machine payment lifecycle with audit logging, refunds with eligibility rules, retry and stuck-payment recovery, and an internal dashboard for operators.",
    note: "It runs against a mock gateway, so it models the workflow without moving real money.",
    tags: ["Fastify", "PostgreSQL", "BullMQ"],
    monogram: "PZ",
    liveLink: "https://payeazie.netlify.app",
    sourceCodeLink: "https://github.com/Shaurya55555/payeazie",
  },
  {
    name: "Mini ATS",
    description:
      "An applicant tracking system with a drag and drop hiring pipeline, stage rules enforced in both the UI and the API, SQL full-text search, CSV import and export, and a metrics dashboard. 25 tests, including the API against a real Postgres.",
    note: "Built for the EarlyJobs.ai full-stack intern assignment, with a demo video in the repo.",
    tags: ["Next.js", "Postgres", "Zod"],
    monogram: "AT",
    liveLink: "https://earlyjobs-ats-five.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/earlyjobs-ats",
  },
  {
    name: "ElevateBox Voice Agent",
    description:
      "An outbound voice sales agent in Hindi, Telugu and English. Vapi runs the call with Deepgram speech and a Groq model, Gemini classifies each lead as Hot, Warm or Cold, and WhatsApp follow-ups go out through the Meta Cloud API with retries and a template fallback.",
    note: "Tested with simulated calls and a mocked WhatsApp API. A live phone call is not done yet.",
    tags: ["Vapi", "Python", "Gemini"],
    monogram: "EV",
    sourceCodeLink: "https://github.com/Shaurya55555/ElevateBox-VoiceAgent",
  },
  {
    name: "Handsfree Media Controller",
    description:
      "A Chrome extension that controls video with hand gestures from the webcam. MediaPipe hand tracking runs on the device, a debouncer stops false triggers, and every gesture can be remapped to play, mute, speed or skip.",
    note: "No video leaves the machine. Accuracy and latency are not benchmarked.",
    tags: ["MediaPipe", "Chrome MV3", "JavaScript"],
    monogram: "HF",
    sourceCodeLink: "https://github.com/Shaurya55555/handsfree-media-controller",
  },
];

export const proof = [
  {
    kicker: "01 · Hackathons",
    title: "Built under a clock.",
    text: "Runner-Up at the LNMIIT HackCrux Hackathon with OARFIN. Finalist at HackRx 6.0, organised by Bajaj Finserv Health. One of the top 5 college teams shortlisted for the Smart India Hackathon.",
  },
  {
    kicker: "02 · Problem solving",
    title: "Fundamentals, kept sharp.",
    text: "More than 300 data structures and algorithms problems solved in C++ across LeetCode and other platforms.",
    link: { label: "LeetCode profile", href: "https://leetcode.com/u/shaurya55555/" },
  },
  {
    kicker: "03 · Learning",
    title: "Degree and applied AI.",
    text: "B.Tech in Computer Science and Engineering at LNMIIT, Jaipur, 2023 to 2027. Scored 100 out of 100 in the college GenAI workshop covering ANN, CNN, RNN, LLMs, RAG and prompt engineering.",
  },
];

export const proofLog = [
  "Runner-Up · LNMIIT HackCrux (OARFIN)",
  "Finalist · HackRx 6.0 · Bajaj Finserv Health",
  "Top 5 college teams · Smart India Hackathon shortlist",
  "GenAI workshop · LNMIIT · 100 / 100",
  "300+ DSA problems · C++",
];

/** Logos shown as the floating 3D tech stones. */
export const technologies = [
  { name: "HTML 5", icon: "/tech/html.png" },
  { name: "CSS 3", icon: "/tech/css.png" },
  { name: "JavaScript", icon: "/tech/javascript.png" },
  { name: "TypeScript", icon: "/tech/typescript.png" },
  { name: "React JS", icon: "/tech/reactjs.png" },
  { name: "Redux Toolkit", icon: "/tech/redux.png" },
  { name: "Tailwind CSS", icon: "/tech/tailwind.png" },
  { name: "Node JS", icon: "/tech/nodejs.png" },
  { name: "MongoDB", icon: "/tech/mongodb.png" },
  { name: "git", icon: "/tech/git.png" },
  { name: "Docker", icon: "/tech/docker.png" },
];

/** Flat logos for the wider toolbox (the 3D stones above are the core set). */
export const moreTech = [
  { name: "Next.js", icon: "/tech/x-nextdotjs.svg" },
  { name: "Express", icon: "/tech/x-express.svg" },
  { name: "Python", icon: "/tech/x-python.svg" },
  { name: "FastAPI", icon: "/tech/x-fastapi.svg" },
  { name: "C++", icon: "/tech/x-cplusplus.svg" },
  { name: "PostgreSQL", icon: "/tech/x-postgresql.svg" },
  { name: "Redis", icon: "/tech/x-redis.svg" },
  { name: "GraphQL", icon: "/tech/x-graphql.svg" },
  { name: "Kafka", icon: "/tech/x-apachekafka.svg" },
  { name: "Nginx", icon: "/tech/x-nginx.svg" },
  { name: "Jenkins", icon: "/tech/x-jenkins.svg" },
  { name: "GitHub Actions", icon: "/tech/x-githubactions.svg" },
  { name: "LangChain", icon: "/tech/x-langchain.svg" },
  { name: "Gemini API", icon: "/tech/x-googlegemini.svg" },
];

export const sectionCopy = {
  contact: { p: "Get in touch", h2: "Contact." },
};
