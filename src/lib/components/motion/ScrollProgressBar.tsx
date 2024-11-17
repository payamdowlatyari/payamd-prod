"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";

import { cn } from "./utils/cn";

interface ScrollProgressBarType {
  type?: "circle" | "bar";
  position?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  strokeSize?: number;
  showPercentage?: boolean;
}

export default function ScrollProgressBar({
  type = "circle",
  position = "bottom-right",
  strokeSize = 2,
  showPercentage = false,
}: ScrollProgressBarType) {
  const { scrollYProgress } = useScroll();

  const scrollPercentage = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [percentage, setPercentage] = useState(0);

  useMotionValueEvent(scrollPercentage, "change", (latest) => {
    setPercentage(Math.round(latest));
  });

  if (type === "bar") {
    return (
      <div
        className="fixed start-0 end-0 top-0 pointer-events-none z-20"
        style={{ height: `${strokeSize + 2}px` }}
      >
        <span
          className="bg-transparent text-neutral-400 h-full w-full block"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("fixed flex items-center justify-center z-20", {
        "top-0 end-0": position === "top-right",
        "bottom-0 end-0": position === "bottom-right",
        "top-0 start-0": position === "top-left",
        "bottom-0 start-0": position === "bottom-left",
      })}
    >
      {percentage > 0 && (
        <>
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="30"
              fill="none"
              strokeWidth={strokeSize}
            />
            <motion.circle
              cx="50"
              cy="50"
              r="30"
              pathLength="1"
              fill="none"
              strokeDashoffset="0"
              strokeWidth={strokeSize}
              style={{ pathLength: scrollYProgress }}
              className={cn("stroke-neutral-400")}
            />
          </svg>
          {showPercentage && (
            <span className="text-xs absolute ml-2">{percentage}%</span>
          )}
        </>
      )}
    </div>
  );
}
