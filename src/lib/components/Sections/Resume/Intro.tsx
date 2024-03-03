import { useRef } from "react";
import { intro } from "./data";
import { motion, useTransform, useWillChange, useScroll } from "framer-motion";
import TextReveal from "../../motion/TextReveal";
import StaggerText from "react-stagger-text";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [0, 800], [-15, 15]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.7]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        display: "flex",
        justifyContent: "space-between",
        willChange,
        maxWidth: "900px",
        margin: "auto",
        paddingTop: "20vh",
        height: "100vh",
      }}
      ref={ref}
    >
      <motion.div
        style={{
          backgroundImage: `url(${intro.image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",

          backgroundPosition: "50%",
          borderRadius: "5px",
          height: "50vh",
          width: "50%",
          minWidth: "300px",
          right: "0",
          top: "10vh",
          position: "absolute",
          scale,
        }}
      />
      <motion.div
        layout
        className="medium-title"
        style={{
          padding: "10px",
          borderRadius: "5px",
          mixBlendMode: "difference",
          willChange,
          x,
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
          <TextReveal text={intro.text} />
        </p>
      </motion.div>
    </motion.div>
  );
}
