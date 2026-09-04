"use client";

import { Pause, Play } from "lucide-react";
import { setMotionOff } from "@/lib/motion";
import { useMotionOff } from "@/lib/use-motion";

export function MotionToggle({ className = "" }: { className?: string }) {
  const off = useMotionOff();

  return (
    <button
      type="button"
      className={`motion-toggle ${className}`}
      onClick={() => setMotionOff(!off)}
      aria-pressed={off}
      aria-label={off ? "Hareketi aç" : "Hareketi durdur"}
      title={off ? "Hareketi aç" : "Hareketi durdur"}
    >
      {off ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      <span>{off ? "Hareket kapalı" : "Hareket açık"}</span>
    </button>
  );
}
