"use client";

import { useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

import BlurFade from "~/components/motion/BlurFade";
import { scrollToPosition } from "~/components/motion/SmoothScrolling";
import { LinkArrowOut } from "~/components/ui/Button";
import { portfolio } from "~/data";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

/** Compact footer with the site logo and short link groups. */
export default function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="relative isolate w-full overflow-hidden border-t border-border bg-background">
      <div className="section-shell relative pt-12 md:pt-16">
        <div className="mb-12 grid gap-10 md:mb-16 md:grid-cols-[1fr_3fr] md:gap-12">
          <BlurFade inView delay={0.1} duration={0.6}>
            <div className="flex flex-col items-start gap-4">
              <Link
                href="/"
                aria-label="Payam Dowlatyari home"
                className="inline-block rounded-sm"
              >
                <Image
                  src="/pd-logo1-removebg-preview.png"
                  alt="Payam Dowlatyari logo"
                  width={80}
                  height={80}
                  className="h-20 w-20 object-contain"
                />
              </Link>
              <p className="text-sm font-medium text-muted-foreground">
                {portfolio.name}
              </p>
            </div>
          </BlurFade>
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            <BlurFade inView delay={0.1} duration={0.6}>
              <nav aria-label="Footer navigation">
                <h2 className="heading-label mb-4">Explore</h2>
                <ul className="space-y-2">
                  {navigationLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="inline-block rounded-sm py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </BlurFade>
            {portfolio.contacts.map((section) => (
              <BlurFade key={section.title} inView delay={0.1} duration={0.6}>
                <div>
                  <h2 className="heading-label mb-4">{section.title}</h2>
                  <ul className="space-y-2">
                    {section.links.map(({ name, url }) => (
                      <li key={url}>
                        <LinkArrowOut title={name} url={url} />
                      </li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-border py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {portfolio.name}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => scrollToPosition(0, Boolean(reduceMotion))}
            className="w-fit rounded-sm py-2 text-sm font-medium transition-colors hover:text-foreground"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
