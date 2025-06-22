"use client";

import React from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import { GridBeam } from "~/components/motion/GridBeam";
import ImageEffect from "~/components/motion/ImageEffect";
import { MorphingText } from "~/components/motion/MorphingText";
import ParallaxText from "~/components/motion/ParallaxText";
import Preview from "~/components/motion/Preview";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { TextHover } from "~/components/motion/TextHover";
import { H2, H4, Paragraph } from "~/components/ui/Texts";
import { about, portfolio, services } from "~/data";
import { cn } from "~/utils/cn";

/**
 * A component that displays a hero section with a title, subtitle, description, and image.
 */
const Hero = () => (
  <section id="hero">
    <div className="flex flex-col self-end h-full w-screen items-end right-0">
      <GridBeam className="flex flex-col items-start justify-end relative z-10">
        <div className="flex flex-col justify-start items-start w-full px-8 my-8 gap-2">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-500 font-bold tracking-tighter leading-tight uppercase w-full">
            Payam <br /> Dowlatyari
          </h1>
          <MorphingText texts={portfolio.words} />
        </div>
        <div className="h-12 w-screen uppercase flex justify-end items-center gap-2 z-10">
          <TextHover url="#intro" text="Who I am" />
          <TextHover url="#services" text="What I do" />
        </div>
        <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        <ParallaxText baseVelocity={0.05}>{portfolio.titles}</ParallaxText>
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
      <H4 label={about.title} />
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
    const { id, name, text, icon: Icon } = service;

    return (
      <div
        key={id}
        className={cn(
          "flex flex-col py-10 w-80 h-80 relative text-neutral-300 group/feature rounded-lg border border-neutral-800 hover:border-neutral-500 transition duration-200 ease-in-out"
        )}
      >
        {Icon && (
          <div className="mb-4 relative z-10 px-5 md:px-10">
            <Icon size={25} color="white" />
          </div>
        )}
        <div className="text-lg font-bold mb-2 relative z-10 px-5 md:px-10">
          <span className="group-hover/feature:translate-x-2 transition duration-200 ease-in-out inline-block">
            {name}
          </span>
        </div>
        <p className="text-sm max-w-xs relative z-10 px-5 md:px-10">{text}</p>
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
    className="flex flex-wrap justify-evenly w-screen items-baseline m-5 md:m-10"
  >
    <div className="w-full p-1 md:p-2 m-2 md:m-4">
      <H2 label="Services" />
      <Paragraph
        text="These are the services I can provide for you as a software engineer, web developer, solutions architect, and UX designer including the technologies I have worked with in recent years."
        className="mt-4"
      />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative my-5 z-10">
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
