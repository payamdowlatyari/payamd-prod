"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ImageEffect from "~/components/motion/ImageEffect";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import HeroLineField from "~/components/ui/hero-line-field";
import MagneticAction from "~/components/ui/magnetic-action";
import ServiceGallery from "~/components/ui/service-gallery";
import { H2, Paragraph } from "~/components/ui/Texts";
import { about, portfolio } from "~/data";

/** A typographic opening with a quiet, pointer-responsive line field. */
const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fieldY = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 90]),
    { stiffness: 120, damping: 30 }
  );

  const fieldX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -60]),
    { stiffness: 120, damping: 30 }
  );

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col justify-between gap-16 overflow-hidden px-6 pb-16 pt-32 sm:px-10 md:pb-32 md:pt-40 lg:px-16"
    >
      <HeroLineField x={fieldX} y={fieldY} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-b from-transparent via-background/80 to-background md:h-64"
      />
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 md:gap-14">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Software engineer · California
        </p>
        <h1 id="hero-title" className="hero-title">
          <span className="block">{portfolio.firstName}</span>
          <span className="block">{portfolio.lastName}</span>
        </h1>
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end md:gap-12">
          <p className="body-copy max-w-[40ch]">
            I build thoughtful software, from AI-powered applications to
            scalable cloud systems.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <MagneticAction href="/projects">Explore my work</MagneticAction>
            <Link href="/contact" className="button-secondary gap-2">
              Let’s connect
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-3 gap-4 border-t border-border/70 pt-5 text-[0.625rem] text-muted-foreground sm:text-xs">
        {["Interfaces", "Intelligence", "Infrastructure"].map(
          (label, index) => (
            <p key={label} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
              <span className="opacity-50">0{index + 1}</span>
              {label}
            </p>
          )
        )}
      </div>
    </section>
  );
};

/**
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useSpring(
    useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24]),
    { stiffness: 120, damping: 30 }
  );

  return (
    <section
      ref={ref}
      id="intro"
      className="relative z-10 block bg-background px-0 py-16 md:-mt-12 md:py-24"
    >
      <div className="section-shell grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_384px] md:gap-16">
        <div className="min-w-0">
          <H2 label={about.title} />
          <Paragraph text={about.text} className="mt-4" />
        </div>
        <div className="relative mx-auto h-64 w-64 overflow-hidden sm:h-80 sm:w-80 md:h-96 md:w-96">
          <motion.div
            style={{ y: imageY }}
            className="absolute -top-8 inset-x-0 h-[calc(100%+4rem)]"
          >
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/**
 * A component that displays a home page.
 *
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <main>
      <Menu />
      <Hero />
      <Intro />
      <ServiceGallery />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
