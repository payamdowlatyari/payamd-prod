"use client";

import { motion } from "framer-motion";

import { about, services } from "~/lib/components/data/data";
import { Feature } from "~/lib/components/motion/Feature";
import { Hero3D } from "~/lib/components/motion/Hero3D";
import ImageEffect from "~/lib/components/motion/ImageEffect";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { TextHoverEnter } from "~/lib/components/motion/TextHoverEnter";
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
              <p className="text-3xl lg:text-4xl tracking-tight leading-8 p-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 select-none">
                My name is
              </p>
              <h2 className="text-5xl lg:text-6xl tracking-tight leading-none p-1 bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 select-none">
                Payam Dowlatyari
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-400 m-1 mt-4">
                {about.text}
              </p>
            </div>
            <div className="flex justify-start items-center gap-1 md:gap-2 px-1 md:px-2 text-sm md:text-base uppercase">
              <TextHoverEnter title="About me" url="/about" />
              <TextHoverEnter title="Contact me" url="/contact" />
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
        <div className="max-w-md p-2 my-4 z-0">
          <div className="w-full flex my-4 items-center justify-start">
            <h2 className="text-5xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-600 select-none">
              Services
            </h2>
          </div>
          <p className="text-sm md:text-base lg:text-lg text-neutral-400 mt-4">
            These are the services I can provide for you as a software engineer,
            web developer, solutions architect, and UX designer including the
            technologies I have worked with in recent years.
          </p>
          <div className="flex justify-start items-center gap-1 md:gap-2 mt-8 text-sm md:text-base uppercase">
            <TextHoverEnter title="My projects" url="/projects" />
            <TextHoverEnter title="Contact me" url="/contact" />
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
