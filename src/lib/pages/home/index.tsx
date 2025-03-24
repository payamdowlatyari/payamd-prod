"use client";

import { motion } from "framer-motion";

import { about, services } from "~/lib/components/data/data";
import { Hero3D } from "~/lib/components/motion/Hero3D";
import ImageEffect from "~/lib/components/motion/ImageEffect";
import Menu from "~/lib/components/motion/Menu/Menu";
import { NumberTicker } from "~/lib/components/motion/NumberTicker";
import { GradientTracing } from "~/lib/components/motion/PulseBeams";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { cn } from "~/lib/components/motion/utils/cn";
import Footer from "~/lib/layout/Footer";

/**
 * Home component
 * @returns {JSX.Element}
 */
export default function Home(): JSX.Element {
  return (
    <motion.main className="bg-neutral-950 text-neutral-50">
      <Menu />
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{
          duration: 1,
          delay: 4,
          ease: "backInOut",
        }}
        className="fixed flex justify-center top-0 left-0 w-full h-full bg-neutral-950 z-[1002]"
      >
        <NumberTicker value={100} className="self-center text-9xl" />
      </motion.div>
      <section id="hero">
        <Hero3D />
      </section>
      <section id="intro">
        <div className="flex flex-wrap justify-evenly items-center w-full">
          <div className="max-w-2xl p-2 my-4 z-0">
            <p className="text-3xl lg:text-4xl tracking-tight leading-8 p-2">
              My name is
            </p>
            <h2 className="text-5xl lg:text-6xl tracking-tight leading-none p-1">
              Payam Dowlatyari
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-neutral-300 m-1 mt-4">
              {about.text}
            </p>
          </div>
          <div className="h-96 w-96 m-1 static right-0 z-[1]">
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center">
        <GradientTracing width={500} height={100} />{" "}
      </div>
      <section
        id="services"
        className="flex flex-wrap justify-evenly items-baseline py-10"
      >
        <div className="max-w-md p-2 my-4 z-0">
          <h2 className="text-5xl md:text-7xl tracking-tight">Services</h2>
          <p className="text-sm md:text-base lg:text-lg text-neutral-300 mt-4">
            These are the services I can provide for you as a software engineer,
            web developer, solutions architect, and UX designer including the
            technologies I have worked with in recent years.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10 py-10 max-w-7xl">
          {services.map((service) => (
            <div
              className={cn(
                "flex flex-col py-10 relative text-neutral-300 group/feature border-l border-t border-neutral-800"
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
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
}
