import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import Logo from "../../motion/Menu/Logo";
import { useRef } from "react";
import TextSpinner from "../../motion/TextSpinner";

const Title = () => {
  const willChange = useWillChange();
  const ref = useRef(null);

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 200], [0, 100]);

  return (
    <motion.section
      id="home"
      layoutScroll
      ref={ref}
      style={{
        willChange,
        overflow: "hidden",
      }}
    >
      <motion.div
        style={{
          willChange,
          y,
          backgroundImage: `url(${portfolio.image2})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "auto",
          backgroundPosition: "right",
          transformOrigin: "right center",
          zIndex: "-1",
          height: "100vh",
          minWidth: "400px",
          right: "0",
          bottom: "0",
          position: "absolute",
          mixBlendMode: "difference",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          alignSelf: "flex-end",
          mixBlendMode: "difference",
        }}
      >
        <div>
          <h1>Hello</h1>
        </div>
        <div
          style={{
            position: "relative",
            bottom: "0",
            left: "0",
            lineHeight: "1.25em",
            fontSize: "2em",
          }}
        >
          <h6>
            {portfolio.text[0]}
            <br />
            {portfolio.text[1]}
          </h6>
          <p>{portfolio.text[2]}</p>
        </div>
        <TextSpinner />
        <motion.div
          className="logo-pd"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, zIndex: 200 }}
          transition={{
            duration: 2,
            delay: 10,
            ease: "easeIn",
          }}
        >
          <Logo light />
        </motion.div>
        <div
          className="second"
          style={{
            maxWidth: "99vw",
            fontSize: "8vw",
          }}
        >
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </div>
      </div>
    </motion.section>
  );
};

export default Title;
