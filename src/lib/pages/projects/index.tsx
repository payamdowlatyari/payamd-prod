"use client";

import Image from "next/image";
import Link from "next/link";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ResponsiveHeroParallax from "~/components/motion/HeroParallax";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";

/**
 * Case Study Section component
 */
const CaseStudySection = () => {
  return (
    <section
      aria-label="Featured case study"
      className="relative mx-auto block w-full max-w-7xl px-5 py-20 md:px-10 md:py-32"
    >
      <Link
        href="/projects/case-study"
        className="group mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-300 hover:border-primary/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background md:grid-cols-2"
      >
        <div className="order-2 flex flex-col items-start gap-4 p-5 md:order-1 md:p-6">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
            Featured case study
          </span>
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
              PhysicianGPS
            </h2>
            <p className="max-w-[45ch] text-base leading-relaxed text-muted-foreground">
              Designing and building an AI-powered physician discovery platform.
            </p>
          </div>
          <dl className="space-y-1 text-sm">
            <dt className="text-muted-foreground">My role</dt>
            <dd className="font-medium text-foreground">
              Lead engineer · Architecture & full-stack development
            </dd>
          </dl>
          <ul aria-label="Technologies" className="flex flex-wrap gap-2">
            {["Next.js", "TypeScript", "AWS"].map((technology) => (
              <li
                key={technology}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground"
              >
                {technology}
              </li>
            ))}
          </ul>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-foreground">
            Read case study
          </span>
        </div>
        <div className="order-1 flex items-center border-b border-border bg-secondary/40 p-2 md:order-2 md:border-b-0 md:border-l">
          <Image
            src="/projects/case/physisian-gps-search-cardio.png"
            alt="PhysicianGPS physician search interface with filters and provider results"
            className="h-auto w-full rounded-lg border border-border"
            width={2106}
            height={1542}
            sizes="(min-width: 1104px) 494px, (min-width: 768px) calc((100vw - 116px) / 2), calc(100vw - 58px)"
          />
        </div>
      </Link>
    </section>
  );
};

/**
 * A component that displays a list of projects.
 *
 * @returns {JSX.Element}
 */
export default function Projects(): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Menu />
      <ResponsiveHeroParallax />
      <CaseStudySection />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
