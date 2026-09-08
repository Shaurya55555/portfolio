import Terminal from "@/components/Terminal";
import { profile } from "@/lib/content";

// Visually hidden, always in the DOM: gives crawlers, link-preview bots and
// screen readers the full text that the interactive terminal renders client-side.
const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
  borderWidth: 0,
};

const seoProjects = [
  ["NammaStocks, AI Stock Assistant", "Stock analytics web app with Stockie, a tool-calling AI assistant grounded in live data. React, TypeScript, FastAPI, PostgreSQL, LangChain. Contributor: built the tool-call loop, SSE streaming, RAG prompt, and multi-provider layer.", "https://nammastocks.vercel.app"],
  ["OARFIN, Real-Time Emergency Response Platform", "Scrapes disaster news with Playwright, filters it through a Gemini relevance classifier, and routes people to the nearest shelter using merged Overpass and FEMA data. Runner-up at LNMIIT HackCrux.", "https://oarfin-website-nine.vercel.app"],
  ["Ecom Microservice GraphQL", "Three-service e-commerce backend behind one GraphQL API, communicating over Kafka. Node.js, Express, MongoDB, Docker.", "https://ecom-microservice-graphql.vercel.app"],
  ["Vera, but Better, Decision Automation Engine", "Deterministic rule engine scoring inputs across 26 weighted categories, chosen over an LLM after studying failure modes. Python, FastAPI, Redis. Validated against 100 scenarios.", "https://github.com/Shaurya55555/magicpin"],
  ["DevLab, CI/CD and Deployment Automation", "Dual GitHub Actions and Jenkins pipeline with Bash automation and Docker Compose. Node.js, TypeScript.", "https://github.com/Shaurya55555/DevLab"],
  ["TorrentEdge, Distributed Multi-Service System", "Distributed-systems study: Kafka message queue, Nginx reverse proxy, Docker Compose orchestration. Peer-protocol layer is scaffolded.", "https://github.com/Shaurya55555/TorrentEdge"],
  ["Cat vs Dog Image Classifier", "CNN binary image classifier with augmentation and training callbacks. Python, TensorFlow, Keras, OpenCV.", "https://github.com/Shaurya55555/CatDogImageANN"],
  ["Student Outcome Classification", "End-to-end ML pipeline comparing five algorithms with confusion matrices and precision/recall/F1. Python, scikit-learn.", "https://github.com/Shaurya55555/DataScProject"],
];

export default function Page() {
  return (
    <>
      <article style={srOnly} aria-hidden="false">
        <h1>{profile.name}</h1>
        <p>{profile.role}. Based in {profile.location}. {profile.availability}</p>

        <h2>About</h2>
        <p>
          I am a full-stack software engineer and a B.Tech Computer Science
          student at The LNM Institute of Information Technology in Jaipur,
          graduating in 2027. I build things that run in production, across the
          full path from schema design and API work to the interface a person
          clicks on. My recent focus is applied AI: LLM tool-calling agents,
          retrieval-augmented generation, and honest evaluation of model-driven
          systems. I have solved more than 300 data structures and algorithms
          problems in C++.
        </p>

        <h2>Experience</h2>
        <p>
          Marine Edge, Software Development Engineer Intern (March 2025 to
          January 2026, Bengaluru). Built backend services and REST APIs for a
          platform serving more than 7,000 users, integrated the Razorpay API,
          implemented role-based access control, and designed and tuned
          PostgreSQL schema and indexes toward a 30 percent faster load.
        </p>
        <p>
          APJ Academy, Frontend Web Developer Intern (August 2024 to February
          2025, Bengaluru). Built responsive React interfaces, cut data
          retrieval latency by 25 percent through query and index analysis, and
          implemented real-time sync over WebSockets.
        </p>

        <h2>Projects</h2>
        <ul>
          {seoProjects.map(([name, blurb, url]) => (
            <li key={name}>
              <a href={url}>{name}</a>: {blurb}
            </li>
          ))}
        </ul>

        <h2>Achievements</h2>
        <ul>
          <li>Runner-Up, LNMIIT HackCrux Hackathon, for OARFIN.</li>
          <li>Finalist, HackRx 6.0 Hackathon, by Bajaj Finserv Health.</li>
          <li>Top 5 college teams shortlisted for the Smart India Hackathon.</li>
          <li>GenAI Workshop, LNMIIT, scored 100 out of 100.</li>
          <li>300+ DSA problems solved in C++.</li>
        </ul>

        <h2>Education</h2>
        <p>
          The LNM Institute of Information Technology (LNMIIT), Jaipur. B.Tech,
          Computer Science and Engineering, August 2023 to August 2027.
        </p>

        <h2>Contact</h2>
        <p>
          Email <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          <a href={profile.links.github}>GitHub</a>,{" "}
          <a href={profile.links.linkedin}>LinkedIn</a>,{" "}
          <a href={profile.links.leetcode}>LeetCode</a>.{" "}
          <a href="/Shaurya_Bajpai_Resume.pdf">Resume (PDF)</a>.
        </p>
      </article>
      <Terminal />
    </>
  );
}
