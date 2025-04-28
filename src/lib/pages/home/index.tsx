"use client";

import { motion } from "framer-motion";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import Hero from "~/components/motion/Hero";
import ImageEffect from "~/components/motion/ImageEffect";
import NumberTicker from "~/components/motion/NumberTicker";
import { GradientTracing } from "~/components/motion/PulseBeams";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { H2, H4, Paragraph } from "~/components/Texts/titles";
import { about, services } from "~/data/data";
import { cn } from "~/utils/cn";

/**
 * HomePreview component
 *
 * A preview animation that appears at the top of the page for a brief duration.
 *
 * The animation is a full-screen, fixed-positioned element that contains a
 * {@link NumberTicker} component. The animation starts from the top of the
 * screen and moves downwards, taking 1 second to complete, after a 4 second
 * delay. The animation is only visible for 5 seconds.
 */
const HomePreview = () => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: "-100%" }}
    transition={{
      duration: 1,
      delay: 4,
      ease: "easeOut",
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
 *
 * The component consists of two main parts:
 *  - A text block that contains the introduction text.
 *  - An image block that contains an image of the person.
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
 * This component displays a list of services offered by the individual, including
 * roles such as software engineer, web developer, solutions architect, and UX designer.
 * Each service is represented with an icon, name, and description.
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
 * Home component
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <motion.main className="bg-neutral-950 text-neutral-50">
      <Menu />
      <HomePreview />
      <Hero />
      <Intro />
      <div className="flex justify-center items-center">
        <GradientTracing
          width={500}
          height={100}
          path="M0,50 L75,25 L150,75 L225,25 L300,50"
        />{" "}
      </div>
      <Services />
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
}
