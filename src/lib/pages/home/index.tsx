"use client";

import Link from "next/link";
import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ImageEffect from "~/components/motion/ImageEffect";
import ParallaxText from "~/components/motion/ParallaxText";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import UnfoldingText from "~/components/motion/UnfoldingText";
import { AsciiArt } from "~/components/ui/ascii-art";
import InfiniteMovingCards from "~/components/ui/infinite-moving-cards";
import { H2, Paragraph } from "~/components/ui/Texts";
import { about, portfolio, services } from "~/data";

/**
 * A component that displays a hero section with a title, subtitle, description, and image.
 */
const Hero = () => (
  <section
    id="hero"
    aria-labelledby="hero-title"
    className="relative isolate flex min-h-svh flex-col justify-between gap-12 px-0 pb-6 pt-28 md:pt-36"
  >
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 top-16 z-0 w-3/4 max-w-xl opacity-20 [mask-image:linear-gradient(to_bottom,black_60%,transparent)] md:top-24 md:w-[45%] md:opacity-80"
    >
      <AsciiArt
        src="/me-home-bw.webp"
        className="aspect-square w-full"
        charset="dots"
        resolution={100}
        color="#E5E5E5"
      />
    </div>
    <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center gap-8 px-5 md:gap-10 md:px-10 lg:px-16">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
        Software engineer · California
      </p>
      <h1 id="hero-title" className="sr-only">
        {portfolio.firstName} {portfolio.lastName}
      </h1>
      <div aria-hidden="true" className="max-w-full">
        <UnfoldingText
          text={`${portfolio.firstName} ${portfolio.lastName}`}
          className="text-[clamp(3rem,8.5vw,8rem)] font-semibold leading-[1.05] uppercase tracking-[-0.04em]"
        />
      </div>
      <div className="flex max-w-xl flex-col items-start gap-6 md:w-[55%]">
        <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl lg:text-2xl">
          I build thoughtful software, from AI-powered applications to scalable
          cloud systems.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/projects" className="button-primary gap-2">
            Explore my work
          </Link>
          <Link href="/contact" className="button-secondary gap-2">
            Let’s connect
          </Link>
        </div>
      </div>
    </div>
    <div
      className="relative z-10 w-full overflow-hidden border-t border-border pt-6"
      aria-hidden="true"
    >
      <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
    </div>
  </section>
);

/**
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => (
  <section id="intro" className="flex flex-wrap justify-evenly items-center">
    <div className="max-w-2xl p-1 md:p-2 my-2 md:my-4">
      <H2 label={about.title} />
      <Paragraph text={about.text} className="mt-4" />
    </div>
    <div className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 m-1">
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
    className="flex flex-col justify-evenly w-screen items-center gap-10"
  >
    <div className="flex flex-col justify-center self-start mx-2 md:mx-4 my-4 md:my-8 p-1 md:p-2">
      <H2 label="Services" />
      <Paragraph
        text="These are the services I can provide for you as a software engineer, web developer, solutions architect, and UX designer including the technologies I have worked with in recent years."
        className="mt-4"
      />
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
