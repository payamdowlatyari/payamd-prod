import { motion, useWillChange } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import HoverLink from "../../motion/View/HoverLink";

const Title = () => {
  const willChange = useWillChange();

  return (
    <motion.section
      id="home"
      layoutScroll
      style={{
        willChange,
        overflow: "hidden",
      }}
      transition={{
        layout: { duration: 1 },
      }}
    >
      <motion.div
        style={{
          willChange,
          backgroundImage: `url(${portfolio.image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right",
          mixBlendMode: "screen",
          backdropFilter: "invert(1)",
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
            fontSize: "1.5em",
            lineHeight: "1.5em",
            display: "grid",
          }}
        >
          <h1>Hello</h1>
          <h6>
            {portfolio.text[0]} <br />
            {portfolio.text[1]}
          </h6>
          <div
            style={{
              alignSelf: "flex-end",
              fontSize: "0.75em",
              left: "0",
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
