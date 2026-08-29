import { ArrowRight } from "@phosphor-icons/react";
import { WordReveal } from "../components/WordReveal.jsx";
import { achievements, projects } from "../data/portfolio.js";

export function Works() {
  return (
    <section id="works" className="chapter chapter-editorial works" aria-labelledby="works-title">
      <div className="chapter__content">
        <header className="section-heading section-heading--split">
          <div>
            <p className="chapter-label">04 / Works</p>
            <WordReveal id="works-title" className="section-title">
              PRACTICE BECOMES PROGRESS.
            </WordReveal>
          </div>
          <p className="section-intro reveal-item">
            Academic exercises and independent practice documenting a growing technical foundation.
          </p>
        </header>

        <div className="works-layout">
          <div className="project-list" aria-label="Projects and practice work">
            {projects.map((project) => (
              <article className="project-item reveal-item" key={project.number}>
                <p className="item-number">{project.number}</p>
                <div>
                  <h3>{project.title}</h3>
                  <p>{project.detail}</p>
                </div>
              </article>
            ))}
          </div>

          <aside className="progress-record reveal-item" aria-labelledby="progress-title">
            <p className="chapter-label">Progress record</p>
            <h3 id="progress-title">Learning milestones</h3>
            <ul>
              {achievements.map((achievement) => (
                <li key={achievement}>{achievement}</li>
              ))}
            </ul>
          </aside>
        </div>

        <a className="text-link section-link reveal-item" href="#afterlight">
          Continue to afterlight
          <ArrowRight size={20} weight="light" />
        </a>
      </div>
    </section>
  );
}
