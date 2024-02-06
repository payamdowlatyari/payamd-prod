import { Box } from "@chakra-ui/react";
import {
  motion,
  useWillChange,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import ParallaxText from "../../motion/ParallaxText";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  return (
    <motion.section
      id="about"
      layoutScroll
      style={{
        willChange,
      }}
    >
      <motion.div
        ref={ref}
        layout
        style={{
          willChange,
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        <AnimatePresence initial={false}>
          {isInView && (
            <>
              <motion.div
                layout
                style={{
                  width: "750px",
                  maxWidth: "100vw",
                }}
              >
                <ParallaxText baseVelocity={0.1}>
                  About Me Who I am
                </ParallaxText>
                <Box
                  p={3}
                  m={2}
                  className="second"
                  style={{ mixBlendMode: "difference" }}
                >
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1,
                      ease: "easeIn",
                    }}
                  >
                    {data.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 1,
                      delay: 1.5,
                      ease: "easeIn",
                    }}
                  >
                    {data.text}
                  </motion.p>
                </Box>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 3,
                  ease: "easeInOut",
                }}
                style={{
                  willChange,
                  margin: "auto",
                }}
              >
                <h2>More</h2>
                <HoverLink title="resume and skills" url="/about" />
                <ArrowForwardIcon />
                <br />
                <HoverLink title="my recent projects" url="/projects" />
                <ArrowForwardIcon />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
