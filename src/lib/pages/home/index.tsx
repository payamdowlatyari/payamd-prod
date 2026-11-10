"use client";

import Link from "next/link";
import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ImageEffect from "~/components/motion/ImageEffect";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import HeroLineField from "~/components/ui/hero-line-field";
import InfiniteMovingCards from "~/components/ui/infinite-moving-cards";
import MagneticAction from "~/components/ui/magnetic-action";
import { H2, Paragraph } from "~/components/ui/Texts";
import { about, portfolio, services } from "~/data";

/** A typographic opening with a quiet, pointer-responsive line field. */
const Hero = () => (
  <section
    id="hero"
    aria-labelledby="hero-title"
    className="relative isolate flex min-h-svh flex-col justify-between gap-16 overflow-hidden px-6 pb-8 pt-32 sm:px-10 md:pt-40 lg:px-16"
  >
    <HeroLineField />
    <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center gap-10 md:gap-14">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
        Software engineer · California
      </p>
      <h1
        id="hero-title"
        className="font-display text-[clamp(3.25rem,11vw,10rem)] font-medium leading-[0.95] tracking-[-0.06em] text-foreground"
      >
        <span className="block">{portfolio.firstName}</span>
        <span className="block">{portfolio.lastName}</span>
      </h1>
      <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end md:gap-12">
        <p className="body-copy max-w-[40ch]">
          I build thoughtful software, from AI-powered applications to scalable
          cloud systems.
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
      {["Interfaces", "Intelligence", "Infrastructure"].map((label, index) => (
        <p key={label} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
          <span className="opacity-50">0{index + 1}</span>
          {label}
        </p>
      ))}
    </div>
  </section>
);

/**
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => (
  <section
    id="intro"
    className="section-shell grid items-center gap-10 py-16 md:grid-cols-[minmax(0,1fr)_384px] md:gap-16 md:py-24"
  >
    <div className="min-w-0">
      <H2 label={about.title} />
      <Paragraph text={about.text} className="mt-4" />
    </div>
    <div className="mx-auto h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
      <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
    </div>
  </section>
);

/**
 * A component that displays a section with a list of services.
 */
const Services = React.memo(() => (
  <section
    id="services"
    aria-label="Services"
    className="flex w-full flex-col items-center gap-10 py-16 md:gap-12 md:py-24"
  >
    <div className="w-full px-6 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <H2 label="Services" />
        <Paragraph
          text="From user experience to cloud infrastructure, I design, build, and maintain reliable software across the full stack."
          className="mt-5"
        />
      </div>
    </div>
    <div className="h-full flex flex-col antialiased bg-transparent items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={services.map((service) => ({
          name: service.name,
          title: service.text,
          quote: service.text,
          icon: service.icon,
        }))}
        direction="right"
        speed="slow"
      />
    </div>
  </section>
));

/**
 * A component that displays a home page.
 *
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <main className="overflow-hidden">
      <Menu />
      <Hero />
      <Intro />
      <Services />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
