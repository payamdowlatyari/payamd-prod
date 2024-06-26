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
      className="resume-main"
      ref={resume}
      layoutScroll
    >
      <Intro />
      <div className="horizental-text">
        <ParallaxText baseVelocity={0.01}>Resume ✳︎ Resume ✳︎ </ParallaxText>
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
        <ParallaxText baseVelocity={-0.01}>Skills ✳︎ Skills ✳︎ </ParallaxText>
      </div>
      <div className="resume-wrapper">
        <motion.ul
          style={{
            willChange,
            x,
          }}
        >
          <li>
            <Experience />
          </li>
          <li>
            <Education />
          </li>
          <li>
            <Certificates />
          </li>
          <li>
            <Publications />
          </li>
          <li>
            <Skills />
          </li>
        </motion.ul>
      </div>
      <div className="logo-pd">
        <Logo light size={60} />
      </div>
    </motion.section>
  );
};

export default Resume;
