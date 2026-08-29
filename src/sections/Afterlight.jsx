import { ArrowUp, EnvelopeSimple } from "@phosphor-icons/react";
import { WordReveal } from "../components/WordReveal.jsx";
import { hobbies, profile } from "../data/portfolio.js";

export function Afterlight() {
  return (
    <section id="afterlight" className="chapter afterlight" aria-labelledby="afterlight-title">
      <div className="chapter__content afterlight__layout">
        <div className="afterlight__message">
          <p className="chapter-label">05 / Afterlight</p>
          <WordReveal id="afterlight-title" className="section-title section-title--large">
            STILL LEARNING. MOVING FORWARD.
          </WordReveal>
          <p className="afterlight__statement reveal-item">
            My goal is to keep improving through hands-on work, collaboration, and new challenges—one
            project and one lesson at a time.
          </p>
          <a className="contact-link reveal-item" href={`mailto:${profile.email}`}>
            <EnvelopeSimple size={24} weight="light" />
            <span>
              Send an email
              <strong>{profile.email}</strong>
            </span>
          </a>
        </div>

        <aside className="beyond-screen reveal-item" aria-labelledby="beyond-title">
          <p className="chapter-label">Beyond the screen</p>
          <h3 id="beyond-title">Interests & everyday life</h3>
          <ul>
            {hobbies.map((hobby) => (
              <li key={hobby}>{hobby}</li>
            ))}
          </ul>
          <div className="social-record">
            <p>Facebook <span>{profile.facebook}</span></p>
            <p>Instagram <span>{profile.instagram}</span></p>
          </div>
        </aside>
      </div>

      <footer className="manifesto-footer">
        <p>Observe. Practice. Improve.</p>
        <span>{profile.name} · Davao City · {profile.role}</span>
        <a href="#threshold">
          Back to the threshold
          <ArrowUp size={18} weight="light" />
        </a>
      </footer>
    </section>
  );
}
