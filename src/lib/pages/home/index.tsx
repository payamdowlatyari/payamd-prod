"use client";

import { motion } from "framer-motion";

import { about, services } from "~/lib/components/data/data";
import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BorderBeam } from "~/lib/components/motion/BorderBeam";
import { Feature } from "~/lib/components/motion/Feature";
import { Hero3D } from "~/lib/components/motion/Hero3D";
import ImageEffect from "~/lib/components/motion/ImageEffect";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBat";
import Footer from "~/lib/layout/Footer";
import Header from "~/lib/layout/Header";

const Home = () => {
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
        <div className="flex flex-wrap justify-evenly items-center w-full p-1">
          <div className="max-w-2xl p-2 my-4 z-0">
            <div className="relative flex h-full w-full flex-col justify-center overflow-hidden rounded-lg border border-transparent md:shadow-xl p-4">
              <h2 className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b bg-clip-text text-2xl md:text-4xl font-semibold leading-none text-transparent from-apple to-gray-500 px-2">
                {about.title}
              </h2>
              <p className="text-sm md:text-base lg:text-lg text-neutral-400 mt-4 px-2">
                {about.text}
              </p>
              <BorderBeam size={250} duration={12} delay={9} />
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
        <div className="">
          <GridBeam className="w-full h-full">
            <h2 className="font-semibold text-3xl md:text-5xl mx-0 my-2 text-neutral-200">
              My Services
            </h2>
          </GridBeam>
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
