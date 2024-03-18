import { useRef } from "react";
import { intro } from "./data";
import { motion, useTransform, useWillChange, useScroll } from "framer-motion";
import StaggerText from "react-stagger-text";
import WebGLImage from "../../motion/WebGLImage";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 500], [0, 300]);

  return (
    <motion.div layout className="resume-intro" ref={ref}>
      <div className="intro-image">
        <WebGLImage id="me-home-bw.webp" />
      </div>
      <motion.div
        layout
        className="medium-title intro-text"
        style={{
          willChange,
          y,
        }}
      >
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
        <p>
          <StaggerText
            staggerType="word"
            staggerEasing="cubic-bezier(0.4, 0, 0.2, 1)"
            staggerDuration={0.5}
            startDelay={0.1}
          >
            {intro.text}
          </StaggerText>
        </p>
      </motion.div>
    </motion.div>
  );
}
