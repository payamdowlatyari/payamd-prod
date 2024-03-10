import { useRef } from "react";
import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import Skills from "./Skills";
import Intro from "./Intro";
import Logo from "../../motion/Menu/Logo";
import ParallaxText from "../../motion/ParallaxText";

const Resume = () => {
  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [1000, 28000], ["20%", "-180%"]);

  return (
    <motion.section
      id="resume"
      ref={resume}
      layoutScroll
      style={{
        willChange,
        display: "block",
        padding: "0",
        maxWidth: "100vw",
        overflow: "hidden",
        height: "2200vh",
      }}
    >
      <Intro />
      <ParallaxText baseVelocity={0.01}>Resume ✳︎ Resume ✳︎ </ParallaxText>
      <ParallaxText baseVelocity={-0.01}>Skills ✳︎ Skills ✳︎ </ParallaxText>
      <div
        style={{
          position: "fixed",
          display: "flex",
          top: "0",
          overflow: "hidden",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.ul
          style={{
            position: "fixed",
            display: "flex",
            listStyle: "none",
            height: "100vh",
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
        <Logo light size="60px" />
      </div>
    </motion.section>
  );
};

export default Resume;
