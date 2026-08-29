import { useEffect, useState } from "react";
import { AtmosphereCanvas } from "./components/AtmosphereCanvas.jsx";
import { CustomCursor } from "./components/CustomCursor.jsx";
import { Header } from "./components/Header.jsx";
import { MotionControl } from "./components/MotionControl.jsx";
import { chapters } from "./data/portfolio.js";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { useReducedMotion } from "./hooks/useReducedMotion.js";
import { About } from "./sections/About.jsx";
import { Afterlight } from "./sections/Afterlight.jsx";
import { Skills } from "./sections/Skills.jsx";
import { Threshold } from "./sections/Threshold.jsx";
import { Works } from "./sections/Works.jsx";

const chapterIds = chapters.map((chapter) => chapter.id);

export function App() {
  const reducedMotion = useReducedMotion();
  const activeSection = useActiveSection(chapterIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionEnabled, setMotionEnabled] = useState(true);

  useEffect(() => {
    if (reducedMotion) setMotionEnabled(false);
  }, [reducedMotion]);

  useEffect(() => {
    const revealTargets = document.querySelectorAll(".reveal-item, .word-reveal");

    if (reducedMotion) {
      revealTargets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <div className="portfolio-shell">
      <a className="skip-link" href="#main-content">Skip to portfolio content</a>
      <AtmosphereCanvas motionEnabled={motionEnabled} reducedMotion={reducedMotion} />
      <Header
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onNavigate={() => setMenuOpen(false)}
      />

      <main id="main-content">
        <Threshold />
        <About />
        <Skills />
        <Works />
        <Afterlight />
      </main>

      {!reducedMotion && (
        <MotionControl
          motionEnabled={motionEnabled}
          onToggle={() => setMotionEnabled((enabled) => !enabled)}
        />
      )}
      <CustomCursor />
    </div>
  );
}
