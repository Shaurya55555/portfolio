import Portfolio from "@/components/Portfolio";
import { person, experiences, projects, aboutContent } from "@/lib/data";

// Visually hidden, always in the DOM: gives crawlers, link-preview bots and
// screen readers the full text that the 3D/animated UI renders client-side.
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

export default function Page() {
  return (
    <>
      <article style={srOnly}>
        <h1>{person.name}</h1>
        <p>
          {person.role}. Based in {person.location}. {person.availability}
        </p>

        <h2>About</h2>
        <p>{aboutContent}</p>

        <h2>Experience</h2>
        {experiences.map((e) => (
          <div key={e.companyName}>
            <h3>
              {e.title}, {e.companyName} ({e.date})
            </h3>
            <ul>
              {e.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}

        <h2>Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.name}>
              <a href={p.sourceCodeLink}>{p.name}</a>
              {p.liveLink ? (
                <>
                  {" "}
                  (<a href={p.liveLink}>live</a>)
                </>
              ) : null}
              : {p.description}
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
          Email <a href={`mailto:${person.email}`}>{person.email}</a>.{" "}
          <a href={person.github}>GitHub</a>,{" "}
          <a href={person.linkedin}>LinkedIn</a>,{" "}
          <a href={person.leetcode}>LeetCode</a>,{" "}
          <a href={person.resume}>Resume (PDF)</a>.
        </p>
      </article>

      <Portfolio />
    </>
  );
}
