"use client";

import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";
import StaggerText from "react-stagger-text";

import { about, services, portfolio } from "~/lib/components/data/data";
import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { Feature } from "~/lib/components/motion/Feature";
import { FlipWords } from "~/lib/components/motion/FlipWords";
import { Hero3D } from "~/lib/components/motion/Hero3D";
import ImageEffect from "~/lib/components/motion/ImageEffect";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import Scramble from "~/lib/components/motion/Scramble";
import Footer from "~/lib/layout/Footer";
import Header from "~/lib/layout/Header";

const Home = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const ref2 = useRef(null);

  const willChange = useWillChange();
  const isInView = useInView(ref2, { once: true });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      {/* <Header /> */}
      <section id="hero">
        <Hero3D />
      </section>
      <section id="intro">
        <motion.div
          ref={ref2}
          layout
          className="flex flex-wrap justify-evenly items-center w-full p-1"
          style={{
            willChange,
          }}
        >
          <div className="max-w-2xl p-1 my-4 z-[1]">
            <GridBeam className="w-full h-full">
              <AnimatePresence initial={false}>
                {isInView && (
                  <motion.div
                    layout
                    style={{
                      willChange,
                    }}
                  >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-[-0.1vw] leading-none mx-[0] my-[0.25em]">
                      <StaggerText
                        staggerType="word"
                        staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                        staggerDuration={1}
                        startDelay={0.5}
                      >
                        {about.title}
                      </StaggerText>
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg">
                      <StaggerText
                        staggerType="word"
                        staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                        staggerDuration={0.1}
                        startDelay={0.5}
                      >
                        {about.text}
                      </StaggerText>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GridBeam>
          </div>
          <div className="h-[400px] w-[400px] m-1 static right-0 z-[1]">
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </div>
        </motion.div>
      </section>

      <section
        id="services"
        className="flex flex-wrap justify-evenly items-baseline py-10"
      >
        <div className="">
          <GridBeam className="w-full h-full">
            <h2 className="z-[1] text-3xl md:text-5xl leading-none mx-[0] my-[0.25em]">
              My Services
            </h2>
          </GridBeam>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 relative z-10 py-10 max-w-7xl ">
          {services.map((service, index) => (
            <Feature
              title={service.name}
              description={service.text}
              icon={
                service.icon ? <service.icon size={25} color="white" /> : null
              }
              key={service.id}
              {...Feature}
              index={index}
            />
          ))}
        </div>
      </section>
      <Footer />
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-2 z-10 origin-[0%] bg-gray-50"
        style={{ scaleX }}
      />
    </motion.main>
  );
};

export default Home;
