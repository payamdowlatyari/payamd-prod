"use client";

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
const Hero = () => {
  return (
    <section id="hero">
      <div className="flex flex-col self-end h-full w-screen items-end right-0">
        <GridBeam className="flex flex-col items-start justify-end relative z-10">
          <div className="flex flex-col justify-start items-start w-full px-8 my-8 gap-2">
            <div className="relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight">
              <div className="block w-screen">
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-neutral-500 font-bold -tracking-wider leading-tight uppercase w-full">
                  Payam <br /> Dowlatyari
                </h1>
                <MorphingText texts={portfolio.words} />
              </div>
            </div>
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
};

/**
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => (
  <section id="intro">
    <div className="flex flex-wrap justify-evenly items-center w-full">
      <div className="max-w-2xl p-1 md:p-2 my-2 md:my-4">
        <H4 label={about.title} />
        <Paragraph text={about.text} className="mt-4" />
      </div>
      <div className="h-72 w-72 sm:h-80 sm:w-80 md:h-96 md:w-96 m-1">
        <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
      </div>
    </div>
  </section>
);

/**
 * A component that displays a section with a list of services.
 */
const Services = () => (
  <section
    id="services"
    className="flex flex-wrap justify-evenly items-baseline py-10"
  >
    <div className="w-full p-1 md:p-2 m-2 md:m-4 max-w-md">
      <H2 label="Services" />
      <Paragraph
        text="These are the services I can provide for you as a software engineer, web developer, solutions architect, and UX designer including the technologies I have worked with in recent years."
        className="mt-4"
      />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 relative z-10 py-10">
      {services.map((service) => (
        <div
          key={service.id}
          className={cn(
            "flex flex-col py-10 relative text-neutral-300 group/feature rounded-lg border border-neutral-800 hover:border-neutral-500 transition duration-200 ease-in-out"
          )}
        >
          <div className="mb-4 relative z-10 px-5 md:px-10">
            {service.icon ? <service.icon size={25} color="white" /> : null}
          </div>
          <div className="text-lg font-bold mb-2 relative z-10 px-5 md:px-10">
            <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block">
              {service.name}
            </span>
          </div>
          <p className="text-sm max-w-xs relative z-10 px-5 md:px-10">
            {service.text}
          </p>
        </div>
      ))}
    </div>
  </section>
);

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
