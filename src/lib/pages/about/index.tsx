"use client";

import {
  motion,
  useSpring,
  useScroll,
  useWillChange,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import { BackgroundGradientAnimation } from "~/lib/components/motion/BackgroundGradientAnimation";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import { InitialTransition } from "~/lib/components/motion/Transition";
import Certificates from "~/lib/components/Sections/Resume/Certificates";
import Education from "~/lib/components/Sections/Resume/Education";
import Experience from "~/lib/components/Sections/Resume/Experience";
import Intro from "~/lib/components/Sections/Resume/Intro";
import Publications from "~/lib/components/Sections/Resume/Publications";
import Skills from "~/lib/components/Sections/Resume/Skills";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [1000, 28000], ["20%", "-180%"], {
    clamp: false,
  });

  return (
    <>
      <Menu />
      <InitialTransition />
      <motion.section
        id="resume"
        className="block top-0 max-w-[100vw] overflow-hidden h-[2300vh] p-0"
        ref={resume}
        layoutScroll
      >
        <Intro />
        <div className="relative top-96 z-[1]">
          <ParallaxText baseVelocity={-0.01}>
            Experience ✳︎ Education ✳︎ Certificates ✳︎ Publications ✳︎
            Skills ✳︎{" "}
          </ParallaxText>
        </div>
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[1]">
          <motion.ul
            className="fixed flex list-none h-screen"
            style={{
              willChange,
              x,
            }}
          >
            <li className="w-screen">
              <Experience />
            </li>
            <li className="w-screen">
              <Education />
            </li>
            <li className="w-screen">
              <Certificates />
            </li>
            <li className="w-screen">
              <Publications />
            </li>
            <li className="w-screen">
              <Skills />
            </li>
          </motion.ul>
        </div>
        <div className="fixed z-[998] top-1 left-3">
          <Logo light size={60} />
        </div>
      </motion.section>
      <BackgroundGradientAnimation />
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-neutral-400"
        style={{ scaleX }}
      />
    </>
  );
};

export default AboutRoute;
