import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { useRef } from "react";

const Title = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const scale = useTransform(scrollY, [0, 200], [0.9, 1]);
  const x = useTransform(scrollY, [0, 200], [0, 600]);
  const y = useTransform(scrollY, [0, 200], [0, -200]);
  return (
    <motion.section
      id="home"
      ref={ref}
      layoutScroll
      style={{
        willChange,
      }}
      transition={{
        layout: { duration: 1 },
      }}
    >
      <motion.div
        style={{
          willChange,
          scale,
          backgroundImage: `url(${portfolio.image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right",
          zIndex: "-1",
          height: "100vh",
          width: "50vw",
          minWidth: "400px",
          right: "0",
          bottom: "0",
          position: "absolute",
        }}
      />

      <motion.div
        style={{
          willChange,
          x,
          y,
          height: "50vh",
          width: "50vw",
          minWidth: "400px",
          left: "0",
          bottom: "0",
          position: "absolute",
          mixBlendMode: "exclusion",
          background: "white",
        }}
      />
      <motion.div
        layout
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignSelf: "flex-end",
        }}
      >
        <div
          style={{
            padding: "1em 1em",
            fontSize: "1.75em",
            display: "grid",
            alignContent: "flex-end",
          }}
        >
          <h4>
            {portfolio.text[0]} <br />
            {portfolio.text[1]} <br />
            {portfolio.text[2]} <br />
            {portfolio.text[3]}
          </h4>
          <div
            style={{
              alignSelf: "flex-end",
              left: "0",
              textAlign: "justify",
              textTransform: "uppercase",
              fontSize: "0.75em",
            }}
          >
            <HoverLink title="01 Who I am" url="#about" />
            <HoverLink title="02 What I do" url="#services" />
          </div>
        </div>
        <motion.div
          layout
          style={{
            maxWidth: "99vw",
          }}
        >
          <ParallaxText baseVelocity={-0.1}>{portfolio.titles}</ParallaxText>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Title;
