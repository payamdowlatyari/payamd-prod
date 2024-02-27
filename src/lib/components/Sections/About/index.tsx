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
import StaggerText from "react-stagger-text";

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
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          style={{
            width: "500px",
            padding: "1em",
          }}
        >
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
                layout
                style={{
                  willChange,
                }}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: "easeInOut",
                }}
              >
                <h6>{data.title}</h6>
                <TextReveal text={data.text} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <motion.div>
          <h1>
            <StaggerText
              staggerType="letter"
              staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
              staggerDuration={1}
              startDelay={0.5}
            >
              About
            </StaggerText>
          </h1>
          <HoverLink title="resume and skills" url="/about" />
          <ArrowForwardIcon />
          <br />
          <HoverLink title="professional services" url="#services" />
          <ArrowDownIcon />
        </motion.div>
      </motion.div>
      <motion.div
        style={{
          width: "100%",
          right: "0",
          top: "0",
          position: "absolute",
          zIndex: "-1",
          mixBlendMode: "overlay",
          fontSize: "20em",
          willChange,
          y,
        }}
      >
        01
      </motion.div>
    </motion.section>
  );
}
