"use client";

import { motion, type MotionValue, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef } from "react";

const LINE_COUNT = 25;
const HEIGHT = 640;

/** Draw sparse threads; animate only while the pointer moves or the field settles. */
export default function HeroLineField({
  y: scrollOffset,
  x: sidewaysOffset,
  variant = "hero",
}: {
  y?: MotionValue<number>;
  x?: MotionValue<number>;
  variant?: "hero" | "footer";
}) {
  const footer = variant === "footer";
  const lineCount = footer ? 5 : LINE_COUNT;
  const svgRef = useRef<SVGSVGElement>(null);
  const maskId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const svg = svgRef.current;
    const hero = svg?.closest<HTMLElement>("section, footer");
    if (!svg || !hero) return undefined;
    const paths = svg.querySelectorAll("path");
    let frame = 0;
    let start = 0;
    let pointerX = 700;
    let pointerY = 300;
    let strength = 0;
    let targetStrength = 0;
    let introductoryWave = !reduceMotion;
    let visible = false;

    const draw = (time: number) => {
      frame = 0;
      if (!visible) return;
      if (!start) start = time;
      const elapsed = (time - start) / 1000;
      const wave =
        introductoryWave && elapsed < 2.4
          ? Math.sin((elapsed / 2.4) * Math.PI) * 13
          : 0;
      if (elapsed >= 2.4) introductoryWave = false;
      strength += (targetStrength - strength) * 0.09;
      paths.forEach((path, index) => {
        const baseX = footer ? 620 + index * 65 : 30 + index * 40;
        const points = Array.from({ length: 41 }, (_, step) => {
          const y = (step / 40) * HEIGHT;
          const curve = footer
            ? Math.sin(y / 150 + index * 0.09) * 90
            : Math.sin(y / 180 + index * 0.12) * 32;
          const dx = baseX + curve - pointerX;
          const dy = y - pointerY;
          const influence = Math.exp(-((dx * dx) / 30000 + (dy * dy) / 22000));
          const bend =
            (dx < 0 ? -1 : 1) * influence * strength * (footer ? 28 : 38);
          const entrance =
            Math.sin(y / 120 + index * 0.2 - elapsed * 1.5) * wave;
          return `${step === 0 ? "M" : "L"}${(baseX + curve + bend + entrance).toFixed(2)},${y}`;
        });
        path.setAttribute("d", points.join(" "));
      });
      if (introductoryWave || Math.abs(targetStrength - strength) > 0.001) {
        frame = requestAnimationFrame(draw);
      }
    };
    const schedule = () => {
      if (!frame && visible) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (reduceMotion || event.pointerType === "touch") return;
      const bounds = svg.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width) * 1000;
      pointerY = ((event.clientY - bounds.top) / bounds.height) * HEIGHT;
      targetStrength = 1;
      schedule();
    };
    const leave = () => {
      targetStrength = 0;
      schedule();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
      }
    });
    observer.observe(svg);
    hero.addEventListener("pointermove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, [reduceMotion, footer]);

  return (
    <motion.svg
      style={{ x: sidewaysOffset, y: scrollOffset }}
      ref={svgRef}
      aria-hidden="true"
      viewBox="0 0 1000 640"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 -z-10 h-full w-full text-foreground"
    >
      <defs>
        <radialGradient
          id={maskId}
          gradientUnits="userSpaceOnUse"
          cx="880"
          cy="288"
          r="750"
        >
          <stop stopColor="currentColor" stopOpacity={footer ? 0.14 : 0.34} />
          <stop
            offset="0.55"
            stopColor="currentColor"
            stopOpacity={footer ? 0.07 : 0.14}
          />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke={`url(#${maskId})`} strokeWidth="1">
        {Array.from({ length: lineCount }, (_line, index) => {
          const x = footer ? 620 + index * 65 : 30 + index * 40;
          const path = Array.from({ length: 41 }, (_, step) => {
            const row = (step / 40) * HEIGHT;
            const curve = footer
              ? Math.sin(row / 150 + index * 0.09) * 90
              : Math.sin(row / 180 + index * 0.12) * 32;
            return `${step === 0 ? "M" : "L"}${(x + curve).toFixed(2)},${row}`;
          }).join(" ");
          return <path key={x} d={path} />;
        })}
      </g>
    </motion.svg>
  );
}
