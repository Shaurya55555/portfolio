export const person = {
  name: "Shaurya Bajpai",
  firstName: "Shaurya",
  role: "Full-Stack Software Engineer / Applied AI Developer",
  location: "Bengaluru, Karnataka, India",
  availability:
    "Open to Summer 2026 internships and full-time 2027 software engineering roles.",
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

export const services = [
  { title: "Full-Stack Web Developer", icon: "/web.png" },
  { title: "Backend & API Engineer", icon: "/backend.png" },
  { title: "Applied AI Developer", icon: "/creator.png" },
  { title: "DevOps & CI/CD", icon: "/mobile.png" },
];

export const aboutContent =
  "I am a full-stack software engineer studying B.Tech Computer Science at LNMIIT, Jaipur, graduating in 2027. I have interned as a Software Development Engineer at Marine Edge and as a Frontend Web Developer at APJ Academy, working on platforms that serve thousands of users. Outside of internships I build and deploy my own projects: an AI stock assistant with a tool-calling agent, an emergency response platform that won a hackathon runner-up prize, a microservice e-commerce backend, and a decision engine I deliberately built without an LLM after analysing where a rule engine was safer. I work comfortably from the database layer to the UI, and I care about correctness, honest evaluation, and readable code. I have solved more than 300 data structures and algorithms problems in C++.";

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

export const experiences = [
  {
    title: "Software Development Engineer Intern",
    companyName: "Marine Edge",
    icon: "/tech/nodejs.png",
    iconBg: "#383E56",
    date: "March 2025 - January 2026",
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
    icon: "/tech/reactjs.png",
    iconBg: "#E6DEDD",
    date: "August 2024 - February 2025",
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
  tags: { name: string; color: string }[];
  monogram: string;
  image?: string;
  liveLink?: string;
  demoLink?: string;
  sourceCodeLink: string;
};

export const projects: Project[] = [
  {
    name: "NammaStocks",
    description:
      "Stock analytics web app with Stockie, an AI assistant that acts through tool calls and answers from live market data. I built the tool-call loop, token-by-token SSE streaming, a retrieval-augmented prompt, and a pluggable OpenAI / Anthropic / Gemini / Ollama provider layer. Contributor on an existing codebase.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "fastapi", color: "green-text-gradient" },
      { name: "langchain", color: "pink-text-gradient" },
    ],
    monogram: "NS",
    image: "/projects/nammastocks.png",
    liveLink: "https://nammastocks.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/NammaStocks",
  },
  {
    name: "OARFIN",
    description:
      "Emergency response platform: scrapes disaster news with Playwright, filters each item through a Gemini yes/no relevance classifier, and routes people to the nearest shelter by merging Overpass and FEMA data with failover. Runner-up at LNMIIT HackCrux.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "node", color: "green-text-gradient" },
      { name: "gemini-api", color: "orange-text-gradient" },
    ],
    monogram: "OF",
    image: "/projects/oarfin.png",
    liveLink: "https://oarfin-website-nine.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/Oarfin",
  },
  {
    name: "Ecom Microservice GraphQL",
    description:
      "Three Docker services behind one GraphQL API, communicating over Kafka topics, with a React storefront. Debugged a silent cross-service message loss down to mismatched producer and consumer topic names.",
    tags: [
      { name: "graphql", color: "pink-text-gradient" },
      { name: "kafka", color: "orange-text-gradient" },
      { name: "docker", color: "blue-text-gradient" },
    ],
    monogram: "EC",
    image: "/projects/ecom.png",
    liveLink: "https://ecom-microservice-graphql.vercel.app",
    sourceCodeLink: "https://github.com/Shaurya55555/ecom-microservice-graphql",
  },
  {
    name: "Vera, but Better",
    description:
      "A deterministic decision engine that scores inputs across 26 weighted categories into one ranked outcome. I chose a rule engine over an LLM on purpose after studying the failure modes, then validated it against 100 scenarios.",
    tags: [
      { name: "python", color: "blue-text-gradient" },
      { name: "fastapi", color: "green-text-gradient" },
      { name: "redis", color: "orange-text-gradient" },
    ],
    monogram: "VB",
    sourceCodeLink: "https://github.com/Shaurya55555/magicpin",
  },
  {
    name: "DevLab",
    description:
      "A dual CI/CD sandbox: the same change builds, tests, and deploys through both GitHub Actions and Jenkins, with Bash setup scripts and Docker Compose for reproducible environments across machines.",
    tags: [
      { name: "github-actions", color: "blue-text-gradient" },
      { name: "jenkins", color: "pink-text-gradient" },
      { name: "docker", color: "green-text-gradient" },
    ],
    monogram: "DL",
    sourceCodeLink: "https://github.com/Shaurya55555/DevLab",
  },
  {
    name: "TorrentEdge",
    description:
      "A distributed-systems study: a Kafka message queue decoupling ingestion from processing, Nginx as a reverse proxy for HTTP, WebSocket and inter-service traffic, and one-command Docker Compose startup. The peer-protocol layer is scaffolded.",
    tags: [
      { name: "kafka", color: "orange-text-gradient" },
      { name: "nginx", color: "green-text-gradient" },
      { name: "docker-compose", color: "blue-text-gradient" },
    ],
    monogram: "TE",
    image: "/projects/torrentedge.png",
    demoLink: "https://shaurya55555.github.io/TorrentEdge/",
    sourceCodeLink: "https://github.com/Shaurya55555/TorrentEdge",
  },
];

export const sectionCopy = {
  about: { p: "Introduction", h2: "Overview." },
  experience: { p: "What I have done so far", h2: "Work Experience." },
  works: {
    p: "My work",
    h2: "Projects.",
    content:
      "Deployed projects with links to the live site and the source. Each note says what I personally built and any honest caveat about scope.",
  },
  contact: { p: "Get in touch", h2: "Contact." },
};
