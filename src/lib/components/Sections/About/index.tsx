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
import TextReveal from "../../motion/TextReveal";
import ImageEffect from "../../motion/ImageEffect";

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
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            maxWidth: "750px",
            margin: "auto",
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
        <div
          style={{
            height: "400px",
            width: "400px",
            position: "static",
            right: "0",
          }}
        >
          <ImageEffect item1="/me-sea2.jpeg" item2="/me-sea3.jpeg" />
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
