import {
  motion,
  useWillChange,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import TextReveal from "../../motion/TextReveal";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [500, 1200], [0, 400]);

  return (
    <motion.section id="about" layoutScroll>
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
        <div
          style={{
            maxWidth: "800px",
            borderRadius: "5px",
          }}
        >
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
                className="about-section"
                layout
                style={{
                  willChange,
                  padding: "10px",
                }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              >
                <h3>{data.title}</h3>
                <TextReveal text={data.text} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="second sec-side">
          <div>
            <h3>
              <TextReveal text="About Me" />
            </h3>
            <HoverLink title="resume and skills" url="/about" />
            <ArrowForwardIcon />
          </div>
          <div>
            <h3>
              <TextReveal text="My Work" />
            </h3>
            <HoverLink title="my recent projects" url="/projects" />
            <ArrowForwardIcon />
          </div>
          <div>
            <h3>
              <TextReveal text="More" />
            </h3>
            <HoverLink title="professional services" url="#services" />
            <ArrowDownIcon />
          </div>
        </div>
      </motion.div>
      <motion.div
        className="section-number"
        style={{
          willChange,
          y,
        }}
      >
        01
      </motion.div>
    </motion.section>
  );
}
