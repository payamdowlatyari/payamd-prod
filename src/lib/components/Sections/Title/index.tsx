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
      }}
      transition={{
        layout: { duration: 1 },
      }}
    >
      <div
        style={{
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
          mixBlendMode: "lighten",
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
            fontSize: "1.2em",
            display: "grid",
            transition: "1s ease-in-out",
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
              fontSize: "1.1em",
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
