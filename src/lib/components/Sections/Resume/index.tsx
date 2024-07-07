import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

import Logo from "../../motion/Menu/Logo";
import ParallaxText from "../../motion/ParallaxText";

import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Intro from "./Intro";
import Publications from "./Publications";
import Skills from "./Skills";

const Resume = () => {
  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [1000, 28000], ["20%", "-180%"]);

  return (
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
  );
};

export default Resume;
