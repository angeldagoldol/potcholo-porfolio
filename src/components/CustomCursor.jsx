import { CrosshairSimple } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return undefined;

    const cursor = cursorRef.current;
    const move = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursor.classList.add("is-visible");
    };
    const show = () => cursor.classList.add("is-visible");
    const hide = () => cursor.classList.remove("is-visible");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerenter", show);
    window.addEventListener("pointerleave", hide);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerenter", show);
      window.removeEventListener("pointerleave", hide);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <CrosshairSimple size={24} weight="thin" />
    </div>
  );
}
