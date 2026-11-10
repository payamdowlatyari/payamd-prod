"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/** Project a torus onto a tilted plane, without a WebGL scene or animation loop. */
function point(u: number, v: number) {
  const radius = 132 + 48 * Math.cos(v);
  const x = radius * Math.cos(u);
  const y = radius * Math.sin(u);
  const z = 48 * Math.sin(v);
  const tiltedY = y * Math.cos(0.95) - z * Math.sin(0.95);
  const tiltedZ = y * Math.sin(0.95) + z * Math.cos(0.95);
  const turnedX = x * Math.cos(0.35) + tiltedZ * Math.sin(0.35);
  const angle = -0.4;
  return [
    230 + turnedX * Math.cos(angle) - tiltedY * Math.sin(angle),
    225 + turnedX * Math.sin(angle) + tiltedY * Math.cos(angle),
  ];
}

function ringPath(fixed: number, meridian: boolean) {
  const points = Array.from({ length: 65 }, (_, index) => {
    const angle = (index / 64) * Math.PI * 2;
    const [x, y] = meridian ? point(fixed, angle) : point(angle, fixed);
    return `${index === 0 ? "M" : "L"}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(" ");
  return `${points} Z`;
}

const rings = [
  ...Array.from({ length: 16 }, (_, index) => ({
    id: `meridian-${index}`,
    path: ringPath((index / 16) * Math.PI * 2, true),
  })),
  ...Array.from({ length: 6 }, (_, index) => ({
    id: `parallel-${index}`,
    path: ringPath((index / 6) * Math.PI * 2, false),
  })),
];

export default function HeroWireframe() {
  const reduceMotion = useReducedMotion();
  const gradientId = useId();

  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-lg text-foreground">
      <svg
        viewBox="0 0 460 460"
        fill="none"
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={gradientId}
            x1="80"
            y1="100"
            x2="365"
            y2="355"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="currentColor" stopOpacity="0.65" />
            <stop offset="0.55" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="1" stopColor="currentColor" stopOpacity="0.04" />
          </linearGradient>
        </defs>
        <g stroke={`url(#${gradientId})`} strokeWidth="0.8">
          {rings.map(({ id, path }, index) => (
            <motion.path
              key={id}
              d={path}
              initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: reduceMotion ? 0 : 1.8,
                delay: reduceMotion ? 0 : index * 0.025,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.6,
          }}
        >
          <text
            x="230"
            y="232"
            textAnchor="middle"
            fill="currentColor"
            className="font-display text-lg font-medium tracking-[-0.04em]"
          >
            PD
          </text>
          <circle
            cx="384"
            cy="105"
            r="3"
            fill="currentColor"
            fillOpacity="0.6"
          />
          <path
            d="M365 105H332"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="0.8"
          />
        </motion.g>
      </svg>
    </div>
  );
}
