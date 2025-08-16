"use client";

import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import { CpuArchitecture } from "~/components/motion/CpuArchitecture";
import { EvervaultCard } from "~/components/motion/EvervaultCard";
import { GridBeam } from "~/components/motion/GridBeam";
import ImageEffect from "~/components/motion/ImageEffect";
import { MorphingText } from "~/components/motion/MorphingText";
import ParallaxText from "~/components/motion/ParallaxText";
import Preview from "~/components/motion/Preview";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { TextRipple } from "~/components/motion/TextAnimate";
import { TextHover } from "~/components/motion/TextHover";
import { H2, H3, Paragraph } from "~/components/ui/Texts";
import { about, portfolio, services } from "~/data";

/**
 * A component that displays a hero section with a title, subtitle, description, and image.
 */
const Hero = () => (
  <section id="hero">
    <div className="flex flex-col self-end h-full w-screen items-end right-0">
      <div className="p-4 rounded-xl absolute top-48 md:top-32 left-0 md:left-1/2 w-full md:w-1/2">
        <CpuArchitecture className="opacity-75 hover:opacity-100 transition-all duration-300" />
      </div>
      <GridBeam className="flex flex-col items-start justify-end relative z-10">
        <div className="flex flex-col justify-start items-start w-full px-8 my-8 gap-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tighter leading-tight uppercase w-full">
            <TextRipple>Payam </TextRipple>
            <TextRipple>Dowlatyari</TextRipple>
          </h1>
          <MorphingText texts={portfolio.words} />
        </div>
        <div className="h-12 w-screen uppercase flex justify-end items-center gap-2 z-10">
          <TextHover url="#intro" text="Who I am" />
          <TextHover url="#services" text="What I do" />
        </div>
        <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
      </GridBeam>
    </div>
  </section>
);

/**
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => (
  <section id="intro" className="flex flex-wrap justify-evenly items-center">
    <div className="max-w-2xl p-1 md:p-2 my-2 md:my-4">
      <H3 label={about.title} />
      <Paragraph text={about.text} className="mt-4" />
    </div>
    <div className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 m-1">
      <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
    </div>
  </section>
);

/**
 * A component that displays a single service.
 * @param {{ id: number, name: string, text: string, icon?: React.ElementType }} service
 * The service data.
 */
const Service = React.memo(
  ({ service }: { service: (typeof services)[number] }) => {
    const { id, name, text, icon: ServiceIcon } = service;

    return (
      <div
        key={id}
        className="border border-neutral-200/20 flex flex-col items-start justify-between mx-auto relative h-72 w-72 sm:h-80 sm:w-80 m-2 md:m-4 rounded-lg shadow-xl"
      >
        <ServiceIcon className="absolute h-6 w-6 top-3 left-3 z-20" />
        <EvervaultCard text={name} className="w-full h-1/2" />
        <p className="text-xs md:text-sm relative z-10 p-2 md:p-4">{text}</p>
      </div>
    );
  }
);

/**
 * A component that displays a section with a list of services.
 */
const Services = React.memo(() => (
  <section
    id="services"
    className="flex flex-wrap justify-center w-screen items-baseline m-5 md:m-10"
  >
    <div className="flex flex-col w-96 p-1 md:p-2 m-2 md:m-4">
      <H2 label="Services" />
      <Paragraph
        text="These are the services I can provide for you as a software engineer, web developer, solutions architect, and UX designer including the technologies I have worked with in recent years."
        className="mt-4"
      />
    </div>
    <div className="flex flex-wrap justify-center items-center z-10 max-w-4xl">
      {services.map((service) => (
        <Service key={service.id} service={service} />
      ))}
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
    <main>
      <Menu />
      <Preview value={100} />
      <Hero />
      <Intro />
      <Services />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
}
