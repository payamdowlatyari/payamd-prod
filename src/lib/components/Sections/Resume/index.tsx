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
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.3,
              }}
            >
              <Experience />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 3,
                }}
              >
                {/* <motion.h3>Projects</motion.h3>
                  <Link href="/projects" className="underlined underlinedThin">
                    check out my portfolio
                    <ArrowForwardIcon />
                  </Link> */}
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1.4,
              }}
            >
              <Education />
              <Certificates />
              <Publications />
            </motion.div>
            <Skills />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default Resume;
