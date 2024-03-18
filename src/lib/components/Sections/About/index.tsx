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
import ImageEffect from "../../motion/ImageEffect";
import StaggerText from "react-stagger-text";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref);

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [500, 1200], [-100, 400]);

  return (
    <motion.section id="about" layoutScroll>
      <motion.div
        ref={ref}
        layout
        className="about-section"
        style={{
          willChange,
        }}
      >
        <div className="about-wrapper">
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
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
                <h3>
                  <StaggerText
                    staggerType="letter"
                    staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                    staggerDuration={1}
                    startDelay={0.5}
                  >
                    {data.title}
                  </StaggerText>
                </h3>
                <p>
                  <StaggerText
                    staggerType="word"
                    staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
                    staggerDuration={0.5}
                    startDelay={0.5}
                  >
                    {data.text}
                  </StaggerText>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="about-image">
          <ImageEffect item1="/me-sea2.webp" item2="/me-sea3.webp" />
        </div>
      </motion.div>
      <motion.div
        className="section-number"
        style={{
          willChange,
          y,
        }}
      >
        <span>01</span>
      </motion.div>
    </motion.section>
  );
}
