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
    >
      <motion.div
        className="third"
        style={{
          willChange,
          backgroundImage: `url(${portfolio.image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "right",
          mixBlendMode: "difference",
          zIndex: "-1",
          height: "100vh",
          width: "45vw",
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
          mixBlendMode: "difference",
        }}
      >
        <div
          style={{
            fontSize: "2em",
            lineHeight: "1.25em",
            padding: "0.2em",
            display: "grid",
          }}
        >
          <h1>
            He <br /> llo
          </h1>
          <h6>
            {portfolio.text[0]} <br />
            {portfolio.text[1]}
          </h6>
          <br />
          <div
            style={{
              fontSize: "0.65em",
              // display: "inline-grid"
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
