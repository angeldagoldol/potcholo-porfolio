import { ArrowRight } from "@phosphor-icons/react";
import { WordReveal } from "../components/WordReveal.jsx";
import { skillGroups } from "../data/portfolio.js";

export function Skills() {
  return (
    <section id="skills" className="chapter chapter-editorial skills" aria-labelledby="skills-title">
      <div className="chapter__content">
        <header className="section-heading section-heading--split">
          <div>
            <p className="chapter-label">03 / Skills</p>
            <WordReveal id="skills-title" className="section-title">
              THE DISCIPLINE BEHIND THE CRAFT.
            </WordReveal>
          </div>
          <p className="section-intro reveal-item">
            Foundations shaped through classwork, practice, troubleshooting, and collaboration.
          </p>
        </header>

        <div className="skill-ledger">
          {skillGroups.map((group) => (
            <article className="skill-group reveal-item" key={group.number}>
              <p className="item-number">{group.number}</p>
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <a className="text-link section-link reveal-item" href="#works">
          View practice work
          <ArrowRight size={20} weight="light" />
        </a>
      </div>
    </section>
  );
}
