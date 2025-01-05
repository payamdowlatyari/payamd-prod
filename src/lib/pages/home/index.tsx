"use client";

import { motion } from "framer-motion";

import { about, services } from "~/lib/components/data/data";
import { Feature } from "~/lib/components/motion/Feature";
import { Hero3D } from "~/lib/components/motion/Hero3D";
import ImageEffect from "~/lib/components/motion/ImageEffect";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { LinkOverlay } from "~/lib/components/motion/View/TailwindButton";
import Footer from "~/lib/layout/Footer";
import Header from "~/lib/layout/Header";

/**
 * Home component
 * @returns {JSX.Element}
 */
const Home = (): JSX.Element => {
  return (
    <motion.main
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <Header />
      <section id="hero">
        <Hero3D />
      </section>
      <section id="intro">
        <div className="flex flex-wrap justify-evenly items-center w-full">
          <div className="max-w-2xl p-2 my-4 z-0">
            <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-lg border border-transparent md:shadow-xl p-4">
              <h2 className="text-5xl lg:text-6xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-700 select-none">
                {about.title}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-neutral-300 mt-4 px-2">
                {about.text}
              </p>
            </div>
            <div className="flex justify-center uppercase">
              <LinkOverlay url="/about" title="About me" />
              <LinkOverlay url="/resume" title="My resume" />
              <LinkOverlay url="/contact" title="Contact me" />
            </div>
          </div>
          <div className="h-96 w-96 m-1 static right-0 z-[1]">
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="flex flex-wrap justify-evenly items-baseline py-10"
      >
        <div>
          <div className="w-full flex my-4 items-center justify-center">
            <h2 className="text-7xl lg:text-9xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-900 select-none">
              Services
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-neutral-300 mt-4 px-2">
            These are the services I can provide for you as a software engineer
            <br />
            including the technologies I have worked with in recent years.
          </p>
          <div className="flex justify-center uppercase">
            <LinkOverlay url="/projects" title="My projects" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10 py-10 max-w-7xl ">
          {services.map((service) => (
            <Feature
              title={service.name}
              description={service.text}
              icon={
                service.icon ? <service.icon size={25} color="white" /> : null
              }
              key={service.id}
              {...Feature}
            />
          ))}
        </div>
      </section>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default Home;
