import { useRef } from "react";
import { intro } from "./data";
import { motion, useTransform, useWillChange, useScroll } from "framer-motion";
import TextReveal from "../../motion/TextReveal";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [0, 800], [-25, 25]);
  const scale = useTransform(scrollY, [0, 800], [1, 0.8]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        willChange,
        maxWidth: "850px",
        margin: "auto",
        height: "85vh",
      }}
      ref={ref}
    >
      <motion.div
        style={{
          backgroundImage: `url(${intro.image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPositionX: "right",
          height: "50vh",
          width: "50vw",
          minWidth: "250px",
          right: "0",
          top: "0",
          position: "absolute",
          scale,
        }}
      />
      <motion.div
        layout
        style={{
          width: "600px",
          padding: "10px",
          willChange,
          x,
        }}
      >
        <h2>About</h2>
        <p>
          <TextReveal text={intro.text2} />
        </p>
      </motion.div>
    </motion.div>
  );
}
