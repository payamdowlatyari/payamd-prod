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
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const ref2 = useRef(null);

  const willChange = useWillChange();
  const isInView = useInView(ref2, { once: true });

  return (
    <article>
      <Menu />
      <Header />
      <section id="home">
        <div className="flex flex-col self-end justify-between">
          <GridBeam className="flex flex-col items-start justify-center h-[50vh] w-[600px] max-w-[100vw] relative z-[2]">
            <div className="ml-2 z-[1]">
              <h1 className="m-2 py-4 bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-clip-text text-transparent">
                <span className="inline-flex text-7xl lg:text-9xl tracking-tight">
                  {portfolio.text[1]}
                </span>
              </h1>
            </div>
            <div className="flex justify-start items-center px-4">
              <div className="text-3xl md:text-5xl z-[1] font-normal text-neutral-300">
                <FlipWords words={portfolio.words} />
              </div>
            </div>
            <div className="h-48 uppercase ml-6 mt-6 flex justify-evenly z-[1]">
              <Scramble url="#about" title="Who I am" />
              <Scramble url="#services" title="What I do" />
            </div>
          </GridBeam>

          <div className="max-w-[100vw] z-[1]">
            <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
          </div>
        </div>
      </section>
      <section id="about">
        <motion.div
          ref={ref2}
          layout
          className="flex flex-wrap justify-evenly items-center w-full p-1"
          style={{
            willChange,
          }}
        >
          <div className="max-w-2xl p-1 my-4 z-[1]">
            <AnimatePresence initial={false}>
              {isInView && (
                <motion.div
                  layout
                  style={{
                    willChange,
                  }}
                >
                  <h2 className="text-3xl font-medium tracking-[-0.1vw] leading-none mx-[0] my-[0.25em]">
                    <StaggerText
                      staggerType="letter"
                      staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                      staggerDuration={1}
                      startDelay={0.5}
                    >
                      {about.title}
                    </StaggerText>
                  </h2>
                  <p>
                    <StaggerText
                      staggerType="word"
                      staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                      staggerDuration={0.5}
                      startDelay={0.5}
                    >
                      {about.text}
                    </StaggerText>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="h-[400px] w-[400px] m-1 static right-0 z-[1]">
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </div>
        </motion.div>
      </section>

      <section id="services" className="flex flex-wrap justify-evenly py-5">
        <h2 className="z-[1] text-3xl md:text-5xl leading-none mx-[0] my-[0.25em]">
          My Services
        </h2>
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
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 8,
          ease: "easeInOut",
        }}
      />
      <Footer />
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-2 z-10 origin-[0%] bg-gray-400 opacity-50"
        style={{ scaleX }}
      />
    </article>
  );
};

export default Home;
