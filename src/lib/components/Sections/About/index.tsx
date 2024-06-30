import {
  motion,
  useWillChange,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import StaggerText from "react-stagger-text";

import ImageEffect from "../../motion/ImageEffect";

import { data } from "./data";

export default function About() {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref, { once: true });

  return (
    <section id="about">
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
                  padding: "20px",
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
    </section>
  );
}
