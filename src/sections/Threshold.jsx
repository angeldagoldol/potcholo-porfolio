import { ArrowDown, ArrowRight } from "@phosphor-icons/react";
import { PortraitCard } from "../components/PortraitCard.jsx";
import { WordReveal } from "../components/WordReveal.jsx";
import { profile } from "../data/portfolio.js";

export function Threshold() {
  return (
    <section id="threshold" className="chapter threshold" aria-labelledby="threshold-title">
      <div className="chapter__content threshold__layout">
        <div className="threshold__copy">
          <p className="eyebrow reveal-item">{profile.name} / Portfolio</p>
          <WordReveal as="h1" id="threshold-title" className="hero-title">
            I BUILD BY LEARNING.
          </WordReveal>
          <div className="hero-meta reveal-item">
            <p>{profile.role}</p>
            <p>Programming · Web · Databases · Security</p>
          </div>
          <a className="text-link hero-cta reveal-item" href="#about">
            Begin the night walk
            <ArrowRight size={21} weight="light" />
          </a>
        </div>

        <PortraitCard />

        <aside className="field-notes reveal-item" aria-label="Profile highlights">
          <p className="field-notes__title">Field notes</p>
          <span>{profile.course}</span>
          <span>{profile.school}</span>
          <a href="#about">
            Scroll to explore
            <ArrowDown size={17} weight="light" />
          </a>
        </aside>
      </div>

      <a className="next-chapter" href="#about" aria-label="Continue to About">
        <span>02 / The person behind the work</span>
        <ArrowDown size={19} weight="light" />
      </a>
    </section>
  );
}
