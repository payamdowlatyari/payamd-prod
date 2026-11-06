"use client";

import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Adapted from https://motion-lexicon.pages.dev/r/magnetic-action.json.
 * A stable pointer area avoids feedback as the action moves toward the cursor.
 */
export default function MagneticAction({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const area = useRef<HTMLSpanElement>(null);
  const action = useRef<HTMLAnchorElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const zone = area.current;
    const link = action.current;
    const text = label.current;
    if (!zone || !link || !text) return;

    const media = gsap.matchMedia();
    media.add(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const options = { duration: 0.42, ease: "power3.out" };
        const x = gsap.quickTo(link, "x", options);
        const y = gsap.quickTo(link, "y", options);
        const lx = gsap.quickTo(text, "x", { ...options, duration: 0.5 });
        const ly = gsap.quickTo(text, "y", { ...options, duration: 0.5 });
        let pressed = false;

        const reset = () => {
          x(0);
          y(0);
          lx(0);
          ly(0);
        };
        const move = (event: PointerEvent) => {
          if (
            event.pointerType === "touch" ||
            pressed ||
            link.matches(":focus-visible")
          )
            return;
          const bounds = zone.getBoundingClientRect();
          const dx = (event.clientX - bounds.left - bounds.width / 2) * 0.22;
          const dy = (event.clientY - bounds.top - bounds.height / 2) * 0.22;
          x(dx);
          y(dy);
          lx(dx * 0.42);
          ly(dy * 0.42);
        };
        const press = () => {
          pressed = true;
          reset();
        };
        const release = () => {
          pressed = false;
          reset();
        };

        zone.addEventListener("pointermove", move);
        zone.addEventListener("pointerleave", release);
        zone.addEventListener("pointerdown", press);
        window.addEventListener("pointerup", release);
        window.addEventListener("pointercancel", release);
        window.addEventListener("blur", release);
        link.addEventListener("focus", reset);
        link.addEventListener("blur", reset);
        return () => {
          zone.removeEventListener("pointermove", move);
          zone.removeEventListener("pointerleave", release);
          zone.removeEventListener("pointerdown", press);
          window.removeEventListener("pointerup", release);
          window.removeEventListener("pointercancel", release);
          window.removeEventListener("blur", release);
          link.removeEventListener("focus", reset);
          link.removeEventListener("blur", reset);
        };
      }
    );
    return () => media.revert();
  }, []);

  return (
    <span ref={area} className="relative -m-3 inline-flex p-3">
      <Link
        ref={action}
        href={href}
        className="button-primary relative touch-manipulation"
      >
        <span ref={label} className="inline-flex items-center gap-2">
          {children}
        </span>
      </Link>
    </span>
  );
}
