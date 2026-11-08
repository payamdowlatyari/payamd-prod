"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ImageEffect from "~/components/motion/ImageEffect";
import ParallaxText from "~/components/motion/ParallaxText";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import InfiniteMovingCards from "~/components/ui/infinite-moving-cards";
import MagneticAction from "~/components/ui/magnetic-action";
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
    <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 md:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] md:gap-12 lg:gap-20">
      <div className="flex min-w-0 flex-col items-start gap-7">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground sm:text-sm">
          Software engineer · California
        </p>
        <h1
          id="hero-title"
          className="font-display text-[clamp(2.5rem,8.5vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.04em] text-foreground md:text-[clamp(3rem,6.5vw,7.5rem)]"
        >
          <span className="block">{portfolio.firstName}</span>
          <span className="block">{portfolio.lastName}</span>
        </h1>
        <p className="body-copy max-w-[46ch]">
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
      <div className="mx-auto w-64 sm:w-80 md:w-full">
        <Image
          src="/me-home-bw-removebg.png"
          alt="Payam Dowlatyari"
          width={500}
          height={500}
          sizes="(max-width: 639px) 256px, (max-width: 767px) 320px, (max-width: 1279px) 35vw, 420px"
          priority
          className="mx-auto h-auto w-full max-w-md [mask-image:linear-gradient(to_bottom,black_85%,transparent)]"
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
