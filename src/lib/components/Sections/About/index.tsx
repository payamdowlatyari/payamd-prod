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
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: "easeInOut",
          }}
          style={{
            willChange,
            margin: "auto",
          }}
        >
          <h1>
            Who <br /> I am
          </h1>
          <HoverLink title="resume and skills" url="/about" />
          <ArrowForwardIcon />
        </motion.div>
        <AnimatePresence initial={false}>
          {isInView && (
            <motion.div
              layout
              style={{
                width: "600px",
                maxWidth: "100vw",
                padding: "1em",
                fontSize: "0.9em",
                willChange,
              }}
            >
              <motion.h6
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1,
                  ease: "easeIn",
                }}
              >
                {data.title}
              </motion.h6>
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
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
