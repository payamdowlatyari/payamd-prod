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
// import ImageEffect from "~/lib/components/motion/ImageEffect";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import TextSpinner from "~/lib/components/motion/TextSpinner";
import { GlassButton } from "~/lib/components/motion/View/TailwindButton";
import { ServiceItem } from "~/lib/components/Sections/Services/ServiceItem";
import Footer from "~/lib/layout/Footer";
// import Header from "~/lib/layout/Header";

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
    <main className="relative h-full w-full m-auto bg-black">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <Menu />
      {/* <Header /> */}
      <section id="home">
        <div className="flex flex-col self-end justify-between h-[80vh]">
          <div className="flex flex-col items-start justify-center relative">
            <div className="ml-4">
              <p className="ml-2 text-2xl lg:text-3xl text-ultra-light-gray">
                {portfolio.text[0]}
              </p>
              <h1>
                <span className="inline-flex text-5xl lg:text-7xl">
                  {portfolio.text[1]}
                </span>
              </h1>
              <p className="ml-2 text-2xl lg:text-3xl animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]">
                {portfolio.text[2]}
              </p>
            </div>
            <div className="uppercase m-5 flex">
              <GlassButton url="#about" title="Who I am" />
              <GlassButton url="#services" title="What I do" />
            </div>
          </div>
          <TextSpinner />
          <div className="max-w-[100vw]">
            <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
          </div>
        </div>
      </section>
      <section id="about">
        <motion.div
          ref={ref2}
          layout
          className="flex flex-wrap justify-evenly w-full p-1"
          style={{
            willChange,
          }}
        >
          <div className="max-w-3xl p-1">
            <AnimatePresence initial={false}>
              {isInView && (
                <motion.div
                  layout
                  style={{
                    willChange,
                  }}
                >
                  <h2 className="text-3xl tracking-[-0.1vw] leading-none font-light mx-[0] my-[0.25em]">
                    <StaggerText
                      staggerType="letter"
                      staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                      staggerDuration={1}
                      startDelay={0.5}
                    >
                      {about.title}
                    </StaggerText>
                  </h2>
                  <p className="pl-2">
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
          {/* <div className="h-[400px] w-[400px] m-1 static right-0">
            <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
          </div> */}
        </motion.div>
      </section>
      <ParallaxText baseVelocity={0.01}>About ✳︎ Services ✳︎</ParallaxText>
      <section id="services" className="flex flex-wrap-reverse justify-around">
        <div className="grid p-[1w] justify-end">
          {services?.map((service: any) => {
            return <ServiceItem service={service} />;
          })}
        </div>
      </section>
      <motion.div
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 2,
          delay: 10,
          ease: "easeIn",
        }}
      >
        <div className="fixed z-[998] -top-4 left-3">
          <Logo light size={60} />
        </div>
      </motion.div>
      <Footer />
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-ultra-light-gray"
        style={{ scaleX }}
      />
    </main>
  );
};

export default Home;
