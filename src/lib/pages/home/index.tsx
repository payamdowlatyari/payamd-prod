"use client";

import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import ImageEffect from "~/components/motion/ImageEffect";
import ParallaxText from "~/components/motion/ParallaxText";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { TextHover } from "~/components/motion/TextHover";
import UnfoldingText from "~/components/motion/UnfoldingText";
import { AsciiArt } from "~/components/ui/ascii-art";
import { IntroImage } from "~/components/ui/Images";
import InfiniteMovingCards from "~/components/ui/infinite-moving-cards";
import { H2, H3, Paragraph } from "~/components/ui/Texts";
import { about, portfolio, services } from "~/data";

/**
 * A component that displays a hero section with a title, subtitle, description, and image.
 */
const Hero = () => (
  <section id="hero">
    <div className="flex flex-col self-end h-full w-screen items-end right-0">
      <div className="absolute top-20 md:top-10 left-0 md:left-1/2 w-full md:w-1/2 p-2">
        <AsciiArt
          src="/me-home-bw.webp"
          className="w-full max-w-3xl aspect-square object-cover opacity-100"
          charset="dots"
          animated={false}
          resolution={100}
          color="#C0C0C0"
        />
      </div>
      <div className="flex flex-col items-start justify-end relative w-full z-10">
        <div className="flex flex-col justify-start items-start w-full px-4 md:px-8 pt-16 md:pt-32">
          <UnfoldingText
            text={`${portfolio.firstName} ${portfolio.lastName}`}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] uppercase tracking-tight"
          />
        </div>
        <div className="h-12 w-screen uppercase flex justify-start items-center gap-2 md:gap-4 mx-2 md:mx-4 z-10">
          <TextHover url="#intro" text="Who I am" />
          <TextHover url="#services" text="What I do" />
        </div>
        <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
      </div>
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
    className="flex flex-col justify-evenly w-screen items-center gap-2 m-5 md:m-10"
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
