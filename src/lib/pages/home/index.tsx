"use client";

import Image from "next/image";
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
    className="relative isolate flex min-h-svh flex-col justify-between gap-12 px-6 pb-8 pt-28 sm:px-10 md:pt-36 lg:px-16"
  >
    <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12 lg:gap-20">
      <div className="flex min-w-0 flex-col items-start gap-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
          Software engineer · California
        </p>
        <h1 id="hero-title" className="sr-only">
          {portfolio.firstName} {portfolio.lastName}
        </h1>
        <div
          aria-hidden="true"
          className="space-y-1 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] text-foreground lg:text-[clamp(3.5rem,6.5vw,6rem)]"
        >
          <UnfoldingText
            text={portfolio.firstName}
            strokeColor="currentColor"
          />
          <UnfoldingText text={portfolio.lastName} strokeColor="currentColor" />
        </div>
        <p className="max-w-[36ch] text-lg leading-relaxed text-muted-foreground lg:text-xl">
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
      <div>
        <div
          aria-hidden="true"
          className="hidden opacity-75 [mask-image:linear-gradient(to_bottom,black_80%,transparent)] md:block"
        >
          <AsciiArt
            src="/me-home-bw.webp"
            className="aspect-square w-full"
            charset="dots"
            resolution={100}
            color="hsl(var(--foreground))"
            animated={false}
          />
        </div>
        <Image
          src="/me-home-bw.webp"
          alt="Black-and-white portrait of Payam Dowlatyari"
          width={500}
          height={500}
          sizes="224px"
          priority
          className="mx-auto aspect-square h-auto w-56 rounded-xl border border-border object-cover md:hidden"
        />
      </div>
    </div>
    <div
      aria-hidden="true"
      className="mx-auto w-full max-w-7xl overflow-hidden border-t border-border pt-6"
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
    aria-label="Services"
    className="flex w-full flex-col items-center gap-10 py-16 md:gap-12 md:py-24"
  >
    <div className="w-full px-6 sm:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-7xl">
        <H2 label="Services" />
        <Paragraph
          text="From user experience to cloud infrastructure, I design, build, and maintain reliable software across the full stack."
          className="mt-4 max-w-[60ch]"
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
