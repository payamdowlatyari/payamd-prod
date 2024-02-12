import {
  motion,
  useWillChange,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  return (
    <motion.section id="about" layoutScroll>
      <motion.div
        ref={ref}
        layout
        style={{
          willChange,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <motion.div
          layout
          style={{
            willChange,
          }}
        >
          <h1>
            Who <br /> I am
          </h1>
          <HoverLink title="professional services" url="#services" />
          <ArrowDownIcon />
        </motion.div>
        <AnimatePresence initial={false}>
          {isInView && (
            <motion.div
              layout
              style={{
                width: "500px",
                maxWidth: "100vw",
                padding: "1em",
                willChange,
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 1,
                ease: "easeInOut",
              }}
            >
              <h6>{data.title}</h6>
              <p>{data.text}</p>
              <HoverLink title="resume and skills" url="/about" />
              <ArrowForwardIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
