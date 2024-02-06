import { useRef } from "react";
import Certificates from "./Certificates";
import Education from "./Education";
import Experience from "./Experience";
import Publications from "./Publications";
import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";
import Skills from "./Skills";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Intro from "./Intro";
import ParallaxText from "../../motion/ParallaxText";
import HoverLink from "../../motion/View/HoverLink";

const Resume = () => {
  const resume = useRef(null);
  const isInView = useInView(resume);
  const willChange = useWillChange();

  return (
    <motion.section
      id="resume"
      ref={resume}
      layoutScroll
      style={{
        willChange,
        display: "block",
        padding: "6em 1em",
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            style={{
              maxWidth: "800px",
              margin: "auto",
            }}
          >
            <Intro />
            <motion.div
              layout
              style={{
                maxWidth: "99vw",
              }}
            >
              <ParallaxText baseVelocity={0.1}>
                My Resume My Resume
              </ParallaxText>
            </motion.div>
            <Experience />
            <Education />
            <Certificates />
            <Publications />
            <ParallaxText baseVelocity={-0.1}>My Skills My Skills</ParallaxText>
            <Skills />

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 5,
              }}
              style={{ padding: "2em 1em", textTransform: "uppercase" }}
            >
              <h3>Projects</h3>
              <HoverLink title="check out my portfolio" url="/projects" />
              <ArrowForwardIcon />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;
