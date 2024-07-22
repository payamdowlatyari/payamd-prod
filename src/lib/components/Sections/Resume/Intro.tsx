import { motion, useTransform, useWillChange, useScroll } from "framer-motion";
import { useRef } from "react";
import StaggerText from "react-stagger-text";

import { intro } from "../../data/data";
// import WebGLImage from "../../motion/WebGLImage";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 500], [0, 300]);

  return (
    <motion.div
      layout
      className="p-1 w-[800px] max-w-[95vw] m-auto top-[40vh] h-screen"
      ref={ref}
    >
      {/* <div className="top-[40vh] right-0 absolute mix-blend-difference w-[600px] max-w-[100vw]">
        <WebGLImage id="me-home-bw.webp" size={400} />
      </div> */}
      <motion.div
        layout
        className="absolute top-[20vh] w-[600px] max-w-[95vw] m-auto"
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
