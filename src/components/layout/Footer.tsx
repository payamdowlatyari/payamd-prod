"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { type CSSProperties, useEffect, useRef, useState } from "react";

import LinkPreview from "~/components/motion/LinkPreview";
import { scrollToPosition } from "~/components/motion/SmoothScrolling";
import HeroLineField from "~/components/ui/hero-line-field";
import { portfolio } from "~/data";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const emailLink = portfolio.contacts
  .flatMap((group) => group.links)
  .find(({ url }) => url.startsWith("mailto:"));

const footerGroups = [
  { title: "Explore", links: navigationLinks },
  {
    title: "Connect",
    links: portfolio.contacts
      .filter(({ title }) => title === "Social" || title === "Contact")
      .flatMap((group) => group.links)
      .filter(({ url }) => !url.startsWith("mailto:"))
      .map(({ name, url }) => ({ label: name, href: url })),
  },
];

// A warm paper surface gives the closing page its own palette.
const footerPalette = {
  "--background": "42 20% 88%",
  "--foreground": "60 8% 13%",
  "--muted-foreground": "60 5% 35%",
  "--border": "42 10% 73%",
  "--ring": "60 8% 13%",
} as CSSProperties;

/** A full-height closing composition, with a gentle desktop scroll reveal. */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [desktop, setDesktop] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [desktop && !reduceMotion ? 48 : 0, 0]
  );

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 1024px) and (min-height: 700px)"
    );
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <footer
      ref={ref}
      style={footerPalette}
      className="relative isolate w-full overflow-hidden border-t border-border bg-background text-foreground"
    >
      <HeroLineField variant="footer" />
      <motion.div
        style={{ y }}
        className="section-shell relative z-10 flex min-h-svh flex-col justify-between gap-10 pt-28 md:pt-32"
      >
        <div className="max-w-3xl py-6 md:py-10">
          <p className="font-display text-3xl font-medium leading-relaxed tracking-tight text-muted-foreground md:text-[2.5rem]">
            Check out my{" "}
            <LinkPreview
              url="https://blog.payamd.com/"
              className="text-foreground underline decoration-foreground/30 decoration-1 underline-offset-8 transition-colors hover:decoration-foreground focus-visible:decoration-foreground"
            >
              Blog
            </LinkPreview>{" "}
            &amp;{" "}
            <LinkPreview
              url="https://photos.payamd.com/"
              className="text-foreground underline decoration-foreground/30 decoration-1 underline-offset-8 transition-colors hover:decoration-foreground focus-visible:decoration-foreground"
            >
              Photography
            </LinkPreview>{" "}
            portfolio.
          </p>
          <div className="mt-6 min-w-0">
            {emailLink && (
              <p className="text-sm text-muted-foreground">
                Or say hello by{" "}
                <a
                  href={emailLink.url}
                  className="inline-block rounded-sm py-2 text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
                >
                  email
                </a>
                .
              </p>
            )}
          </div>
        </div>

        <div className="py-8">
          <div className="grid w-full max-w-[39rem] gap-12 md:grid-cols-2 md:gap-12 lg:gap-20">
            {footerGroups.map((group, index) => (
              <nav
                key={group.title}
                aria-label={`Footer ${group.title.toLowerCase()}`}
              >
                <h2 className="heading-label mb-4 flex items-baseline gap-3">
                  <span aria-hidden="true" className="tabular-nums opacity-60">
                    0{index + 1}
                  </span>
                  {group.title}
                </h2>
                <ul>
                  {group.links.map(({ href, label }) => {
                    const external = /^https?:\/\//.test(href);
                    return (
                      <li key={href} className="border-b border-border/70">
                        <Link
                          href={href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="group flex min-h-11 items-center justify-between gap-3 rounded-sm py-2 font-display text-base font-medium tracking-tight transition-colors hover:text-muted-foreground"
                        >
                          <span>{label}</span>
                          <span
                            aria-hidden="true"
                            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-sm transition-colors group-hover:border-foreground/50 group-hover:bg-foreground group-hover:text-background"
                          >
                            {external ? "↗" : "→"}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4 border-t border-border/60 py-6 text-xs text-muted-foreground lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <div className="space-y-2">
              <p>
                © {new Date().getFullYear()} {portfolio.name}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-8">
              <button
                type="button"
                onClick={() => scrollToPosition(0, Boolean(reduceMotion))}
                className="flex min-h-11 w-fit items-center gap-3 rounded-sm text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                Back to top <span aria-hidden="true">↑</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
