"use client";

import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

const stages = [
  {
    title: "Ingestion pipeline",
    detail:
      "Step Functions + Lambda validate, normalize, and enrich provider datasets.",
  },
  {
    title: "Search index",
    detail:
      "OpenSearch supports text relevance, geospatial queries, and provider filters.",
  },
  {
    title: "Server query layer",
    detail:
      "Next.js server components invoke query logic with caching and tenant boundaries.",
  },
  {
    title: "Search experience",
    detail:
      "The React interface presents filters, maps, and ranked provider results.",
  },
];

function Stage({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion();
  const opacity = useTransform(
    progress,
    [index / 4, (index + 1) / 4],
    [0.55, 1]
  );
  return (
    <li className="relative py-5 pl-12 first:pt-0 last:pb-0">
      <motion.span
        aria-hidden="true"
        style={{ opacity: reduceMotion ? 1 : opacity }}
        className={`absolute left-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-background text-[0.625rem] tabular-nums ${index === 0 ? "top-0" : "top-5"}`}
      >
        {String(index + 1).padStart(2, "0")}
      </motion.span>
      <h3 className="item-title">{stages[index].title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {stages[index].detail}
      </p>
    </li>
  );
}

/** A simplified logical data flow, progressively traced as it enters the viewport. */
export default function CaseStudyArchitecture() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 65%"],
  });
  return (
    <figure ref={ref} className="my-8 border-y border-border py-8">
      <figcaption className="mb-8 text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Provider data → search experience
      </figcaption>
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-3 top-3 w-px bg-border"
        >
          <motion.div
            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
            className="h-full origin-top bg-foreground/70"
          />
        </div>
        <ol>
          {stages.map((stage, index) => (
            <Stage key={stage.title} index={index} progress={scrollYProgress} />
          ))}
        </ol>
      </div>
      <p className="mt-8 text-xs leading-5 text-muted-foreground">
        Simplified data flow. Tenant isolation and observability support the
        system across layers.
      </p>
    </figure>
  );
}
