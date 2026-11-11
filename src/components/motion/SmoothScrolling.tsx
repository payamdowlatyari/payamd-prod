"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

let activeScroller: Lenis | undefined;

/** Share programmatic scrolling with controls instead of starting a second animation. */
export function scrollToPosition(top: number, instant = false) {
  if (activeScroller) {
    activeScroller.scrollTo(top, { immediate: instant, duration: 0.65 });
  } else {
    window.scrollTo({ top, behavior: instant ? "instant" : "smooth" });
  }
}

/** Wheel smoothing on desktop; touch and reduced-motion scrolling stay native. */
export default function SmoothScrolling() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
    );
    let scroller: Lenis | undefined;
    const synchronizeLock = () => {
      if (!scroller) return;
      if (document.body.style.overflow === "hidden") scroller.stop();
      else scroller.start();
    };
    const configure = () => {
      scroller?.destroy();
      activeScroller = undefined;
      scroller = undefined;
      if (!preference.matches) return;
      scroller = new Lenis({
        autoRaf: true,
        lerp: 0.16,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        prevent: (node) =>
          node.matches("dialog, textarea, select, [data-lenis-prevent]"),
        virtualScroll: ({ deltaX, deltaY }) =>
          Math.abs(deltaY) >= Math.abs(deltaX),
      });
      activeScroller = scroller;
      synchronizeLock();
    };
    const observer = new MutationObserver(synchronizeLock);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    preference.addEventListener("change", configure);
    configure();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", configure);
      scroller?.destroy();
      if (activeScroller === scroller) activeScroller = undefined;
    };
  }, [pathname]);

  return null;
}
