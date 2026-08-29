import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { chapters } from "../data/portfolio.js";

export function Header({ activeSection, menuOpen, onMenuToggle, onNavigate }) {
  const menuButtonRef = useRef(null);
  const chapterLinksRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (
      wasOpenRef.current &&
      !menuOpen &&
      chapterLinksRef.current?.contains(document.activeElement)
    ) {
      menuButtonRef.current?.focus();
    }
    wasOpenRef.current = menuOpen;
  }, [menuOpen]);

  return (
    <header className="site-header">
      <nav className="chapter-nav" aria-label="Portfolio chapters">
        <a className="brand-mark" href="#threshold" onClick={onNavigate} aria-label="Return to Threshold">
          <span className="brand-mark__glyph" aria-hidden="true">影</span>
          <span className="brand-mark__name">KAGE / SHADOW</span>
        </a>

        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          onClick={onMenuToggle}
          aria-expanded={menuOpen}
          aria-controls="chapter-links"
        >
          {menuOpen ? <X size={23} /> : <List size={23} />}
          <span>{menuOpen ? "Close" : "Menu"}</span>
        </button>

        <ol
          ref={chapterLinksRef}
          id="chapter-links"
          className={menuOpen ? "chapter-links is-open" : "chapter-links"}
        >
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className={activeSection === chapter.id ? "is-active" : ""}
                aria-current={activeSection === chapter.id ? "location" : undefined}
                onClick={onNavigate}
              >
                <span>{chapter.number}</span>
                {chapter.label}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
