"use client";

import {
  motion,
  useSpring,
  useScroll,
  useIsPresent,
  useWillChange,
  useTransform,
} from "framer-motion";
import { useRef } from "react";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import Certificates from "~/lib/components/Sections/Resume/Certificates";
import Education from "~/lib/components/Sections/Resume/Education";
import Experience from "~/lib/components/Sections/Resume/Experience";
import Intro from "~/lib/components/Sections/Resume/Intro";
import Publications from "~/lib/components/Sections/Resume/Publications";
import Skills from "~/lib/components/Sections/Resume/Skills";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const ref = useRef(null);
  const progressBarRef = useRef(null);
  const { scrollYProgress } = useScroll();

  const isPresent = useIsPresent();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [1000, 28000], ["20%", "-180%"]);

  return (
    <main className="relative h-full w-full m-auto bg-black">
      <div className="bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]" />

      <Menu />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleY: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originY: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[2]"
        ref={ref}
      />
      <motion.section
        id="resume"
        className="block top-0 max-w-[100vw] overflow-hidden h-[2300vh] p-0"
        ref={resume}
        layoutScroll
      >
        <Intro />
        <div className="relative top-96">
          <ParallaxText baseVelocity={-0.01}>
            Experience ✳︎ Experience ✳︎{" "}
          </ParallaxText>
          <ParallaxText baseVelocity={0.01}>
            Education ✳︎ Education ✳︎{" "}
          </ParallaxText>
          <ParallaxText baseVelocity={-0.01}>
            Certificates ✳︎ Certificates ✳︎{" "}
          </ParallaxText>
          <ParallaxText baseVelocity={0.01}>
            Publications ✳︎ Publications ✳︎{" "}
          </ParallaxText>
          <ParallaxText baseVelocity={-0.01}>
            Skills ✳︎ Skills ✳︎ Skills ✳︎{" "}
          </ParallaxText>
        </div>
        <div className="fixed flex top-0 overflow-hidden items-center h-screen">
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
        <div className="fixed z-[998] -top-4 left-3">
          <Logo light size={60} />
        </div>
      </motion.section>
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-ultra-light-gray"
        style={{ scaleX }}
      />
    </main>
  );
};

export default AboutRoute;
