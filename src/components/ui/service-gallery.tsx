"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { scrollToPosition } from "~/components/motion/SmoothScrolling";
import { services } from "~/data";

import ServiceIcon from "./service-icon";
import { H2, Paragraph } from "./Texts";

/** A measured desktop scroll sequence, with native horizontal browsing elsewhere. */
export default function ServiceGallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [layout, setLayout] = useState({
    pinned: false,
    distance: 0,
    height: 0,
  });
  const [first, setFirst] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return undefined;
    const pointer = window.matchMedia("(pointer: fine)");
    const measure = () => {
      const distance = Math.max(0, rail.scrollWidth - rail.clientWidth);
      setLayout({
        pinned:
          !reduceMotion &&
          pointer.matches &&
          (contentRef.current?.scrollHeight ?? 0) + 128 <= window.innerHeight &&
          window.innerWidth >= 1024 &&
          window.innerHeight >= 800 &&
          distance > 0,
        distance,
        height: window.innerHeight + distance * 0.6,
      });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    if (contentRef.current) observer.observe(contentRef.current);
    pointer.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    measure();
    return () => {
      observer.disconnect();
      pointer.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [reduceMotion]);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (layout.pinned && railRef.current)
      railRef.current.scrollLeft = progress * layout.distance;
  });

  const browse = (direction: number) => {
    const rail = railRef.current;
    const target = targetRef.current;
    if (!rail || !target) return;
    const destination = Math.min(
      layout.distance,
      Math.max(0, rail.scrollLeft + direction * 304)
    );
    if (layout.pinned) {
      const top = target.getBoundingClientRect().top + window.scrollY;
      scrollToPosition(
        top +
          (destination / layout.distance) * (layout.height - window.innerHeight)
      );
    } else {
      rail.scrollTo({
        left: destination,
        behavior: reduceMotion ? "instant" : "smooth",
      });
    }
  };

  return (
    <div
      ref={targetRef}
      id="services"
      role="region"
      aria-label="Services"
      style={{ height: layout.pinned ? layout.height : undefined }}
    >
      <div
        className={
          layout.pinned
            ? "sticky top-0 flex min-h-svh flex-col justify-center py-16"
            : "py-16 md:py-24"
        }
      >
        <div ref={contentRef} className="section-shell">
          <div className="mb-8">
            <H2 label="Services" />
            <Paragraph
              text="From user experience to cloud infrastructure, I design, build, and maintain reliable software across the full stack."
              className="mt-5"
            />
          </div>
          <div
            ref={railRef}
            id="service-cards"
            onScroll={(event) => {
              const rail = event.currentTarget;
              setFirst(
                Math.min(services.length - 1, Math.floor(rail.scrollLeft / 304))
              );
              setAtStart(rail.scrollLeft <= 1);
              setAtEnd(
                rail.scrollLeft >= rail.scrollWidth - rail.clientWidth - 1
              );
            }}
            className={
              reduceMotion ? "" : "overflow-x-auto overscroll-x-contain pb-4"
            }
          >
            <ul
              className={
                reduceMotion
                  ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  : "flex w-max items-stretch gap-4"
              }
            >
              {services.map((service, index) => (
                <li
                  key={service.id}
                  className={`border-t border-border bg-card/40 p-5 ${reduceMotion ? "" : "w-72 shrink-0"}`}
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <ServiceIcon
                      name={service.name}
                      fallback={service.icon}
                      active={false}
                    />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="card-title">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {service.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          {!reduceMotion && (
            <div className="mt-5 flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>
                {layout.pinned
                  ? "Scroll to explore"
                  : "Swipe or use the arrows"}
              </span>
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className="tabular-nums">
                  {String(first + 1).padStart(2, "0")} / {services.length}
                </span>
                <button
                  type="button"
                  aria-label="Previous services"
                  aria-controls="service-cards"
                  onClick={() => browse(-1)}
                  disabled={atStart}
                  className="min-h-11 min-w-11 rounded-sm border border-border text-lg text-foreground disabled:opacity-30"
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next services"
                  aria-controls="service-cards"
                  onClick={() => browse(1)}
                  disabled={atEnd}
                  className="min-h-11 min-w-11 rounded-sm border border-border text-lg text-foreground disabled:opacity-30"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
