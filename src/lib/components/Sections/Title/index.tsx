import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import Logo from "../../motion/Menu/Logo";
import { useRef } from "react";
import { BsFillMouseFill } from "react-icons/bs";

const Title = () => {
  const willChange = useWillChange();
  const ref = useRef(null);

  const { scrollY } = useScroll({ target: ref });
  const width = useTransform(scrollY, [0, 200], ["100vw", "45vw"]);

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
        className="second"
        style={{
          willChange,
          width,
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
            lineHeight: "0.8em",
            padding: "0.2em",
            display: "grid",
          }}
        >
          <h1>
            He <br />
            llo
          </h1>
        </div>
        <div
          style={{
            lineHeight: "1.3em",
            padding: "5px",
            alignSelf: "center",
          }}
        >
          <h6>
            {portfolio.text[0]} <br />
            {portfolio.text[1]}
          </h6>
          <p>{portfolio.text[2]}</p>
          <HoverLink title="01 Who I am" url="#about" />
          <HoverLink title="02 What I do" url="#services" />
        </div>
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, zIndex: 200 }}
          transition={{
            duration: 2,
            delay: 15,
            ease: "easeIn",
          }}
          style={{
            willChange,
            position: "absolute",
            width: "100px",
            top: "-20px",
            left: "0",
          }}
        >
          <Logo light />
        </motion.div>
        <motion.div
          layout
          style={{
            maxWidth: "99vw",
            fontSize: "4em",
          }}
        >
          <ParallaxText baseVelocity={-0.1}>{portfolio.titles}</ParallaxText>
        </motion.div>
      </motion.div>
      <div
        style={{
          mixBlendMode: "exclusion",
          zIndex: "-1",
          bottom: "3em",
          margin: "auto",
          position: "absolute",
          fontSize: "3em",
        }}
      >
        <BsFillMouseFill />
      </div>
    </motion.section>
  );
};

export default Title;
