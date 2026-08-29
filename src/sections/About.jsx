import { ArrowRight } from "@phosphor-icons/react";
import { WordReveal } from "../components/WordReveal.jsx";
import { profile } from "../data/portfolio.js";

export function About() {
  return (
    <section id="about" className="chapter chapter-editorial about" aria-labelledby="about-title">
      <div className="chapter__content editorial-grid">
        <header className="section-heading">
          <p className="chapter-label">02 / About</p>
          <WordReveal id="about-title" className="section-title">
            CURIOUS BY NATURE. READY FOR THE NEXT CHALLENGE.
          </WordReveal>
        </header>

        <div className="about-copy reveal-item">
          <p>{profile.about}</p>
          <a className="text-link" href="#skills">
            Explore my skills
            <ArrowRight size={20} weight="light" />
          </a>
        </div>

        <dl className="identity-ledger reveal-item">
          <div>
            <dt>Age</dt>
            <dd>{profile.age}</dd>
          </div>
          <div>
            <dt>Location</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt>Course</dt>
            <dd>{profile.course}</dd>
          </div>
          <div>
            <dt>School</dt>
            <dd>{profile.school}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
