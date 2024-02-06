import { useRef } from "react";
import { intro } from "./data";
import { motion, useTransform, useWillChange, useScroll } from "framer-motion";

export default function Intro() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [0, 800], [-25, 25]);
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const scale = useTransform(scrollY, [0, 500, 800], [1, 0.9, 0.8]);

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        display: "flex",
        alignItems: "end",
        justifyContent: "space-between",
        willChange,
        height: "85vh",
      }}
      ref={ref}
    >
      <motion.div
        style={{
          backgroundImage: `url(${intro.image})`,
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
          y,
        }}
      />
      <motion.div
        layout
        style={{
          fontSize: "1em",
          width: "500px",
          willChange,
          x,
        }}
      >
        <h1>About</h1>
        <p>{intro.text2}</p>
      </motion.div>
    </motion.div>
  );
}
