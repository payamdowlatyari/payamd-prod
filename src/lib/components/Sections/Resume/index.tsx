import { useRef } from "react";
import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import Skills from "./Skills";
import Intro from "./Intro";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Logo from "../../motion/Menu/Logo";

const Resume = () => {
  const resume = useRef(null);
  const willChange = useWillChange();
  const { scrollY } = useScroll({ target: resume });
  const x = useTransform(scrollY, [1000, 28000], ["-100%", "100%"]);

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
        height: "2000vh",
      }}
    >
      <div className="logo-pd">
        <Logo light />
      </div>
      <Intro />
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
            <Skills />
          </li>
          <li>
            <Publications />
          </li>
          <li>
            <Certificates />
          </li>
          <li>
            <Education />
          </li>
          <li>
            <Experience />
          </li>
        </motion.ul>
      </div>
      <div
        className="large-title"
        style={{
          marginTop: "1800vh",
          textTransform: "uppercase",
          textAlign: "center",
        }}
      >
        <h2>Projects</h2>
        <HoverLink title="check out my portfolio" url="/projects" />
        <ArrowForwardIcon />
      </div>
    </motion.section>
  );
};

export default Resume;
