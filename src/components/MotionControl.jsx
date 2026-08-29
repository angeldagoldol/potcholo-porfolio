import { Pause, Play } from "@phosphor-icons/react";

export function MotionControl({ motionEnabled, onToggle }) {
  return (
    <button
      className="motion-control"
      type="button"
      onClick={onToggle}
      aria-pressed={!motionEnabled}
    >
      {motionEnabled ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
      <span>{motionEnabled ? "Pause background motion" : "Resume background motion"}</span>
    </button>
  );
}
