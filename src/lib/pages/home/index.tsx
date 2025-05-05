"use client";

import { motion } from "framer-motion";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import { ContainerTextFlip } from "~/components/motion/FlipWords";
import { GridBeam } from "~/components/motion/GridBeam";
import ImageEffect from "~/components/motion/ImageEffect";
import NumberTicker from "~/components/motion/NumberTicker";
import ParallaxText from "~/components/motion/ParallaxText";
import { GradientTracing } from "~/components/motion/PulseBeams";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { TextHoverEnter } from "~/components/motion/TextHoverEnter";
import { H2, H4, Paragraph } from "~/components/Texts/Texts";
import { about, portfolio, services } from "~/data";
import { cn } from "~/utils/cn";

/**
 * Preview component
 *
 * A component that displays a preview of the page.
 */
const Preview = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: "-100%" }}
    transition={{
      duration: 1,
      delay: 4,
      ease: "easeInOut",
    }}
    className="fixed flex justify-center top-0 left-0 w-full h-full bg-neutral-950 z-[1002]"
  >
    <NumberTicker value={100} className="self-center text-9xl" />
  </motion.div>
);

/**
 * Intro component
 *
 * A component that displays a hero section with a short introduction.
 */
const Intro = () => (
  <section id="intro">
    <div className="flex flex-wrap justify-evenly items-center w-full">
      <div className="max-w-2xl p-2 my-4 z-0">
        <H4 label={about.title} />
        <Paragraph text={about.text} className="mt-4" />
      </div>
      <div className="h-96 w-96 m-1 static right-0 z-[1]">
        <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
      </div>
    </div>
  </section>
);

/**
 * Services component
 *
 * A component that displays a section with a list of services.
 */
const Services = () => (
  <section
    id="services"
    className="flex flex-wrap justify-evenly items-baseline py-10"
  >
    <div className="max-w-md p-2 my-4 z-0">
      <H2 label="Services" />
      <Paragraph
        text="These are the services I can provide for you as a software engineer, web developer, solutions architect, and UX designer including the technologies I have worked with in recent years."
        className="mt-4"
      />
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10 py-10 max-w-7xl">
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
 * Hero component
 *
 * A component that displays a hero section with a title, subtitle, description, and image.
 */
const Hero = () => {
  return (
    <section id="hero">
      <div className="flex flex-col self-end h-full w-screen items-end right-0">
        <div className="absolute z-0">
          <GradientTracing
            width={800}
            height={200}
            animationDuration={3}
            path="M0,50 L75,25 L150,75 L225,25 L300,50"
          />
        </div>
        <GridBeam className="flex flex-col items-start justify-end relative z-10">
          <div className="flex flex-col justify-start items-start w-full px-8 my-8 gap-2">
            <div className="relative mb-6 max-w-2xl text-left text-4xl leading-normal font-bold tracking-tight">
              <div className="inline-block w-screen">
                <h1 className="text-5xl sm:text-8xl md:text-9xl uppercase w-full">
                  {portfolio.name}
                </h1>
                <ContainerTextFlip
                  words={portfolio.words}
                  className="text-2xl sm:text-4xl md:text-6xl w-full"
                />
              </div>
            </div>
          </div>
          <div className="h-12 w-screen uppercase flex justify-end items-center gap-2">
            <TextHoverEnter url="#intro" title="Who I am" />
            <TextHoverEnter url="#services" title="What I do" />
          </div>
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </GridBeam>
      </div>
    </section>
  );
};

/**
 * Home component
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <main>
      <Menu />
      <Preview />
      <Hero />
      <Intro />
      <div className="flex justify-center items-end">
        <GradientTracing
          width={500}
          height={100}
          path="M0,50 L75,25 L150,75 L225,25 L300,50"
        />{" "}
      </div>
      <Services />
      <Footer />
      <ScrollProgressBar showPercentage />
    </main>
  );
}
