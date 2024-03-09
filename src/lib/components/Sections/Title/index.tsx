import { motion } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import Logo from "../../motion/Menu/Logo";
import TextSpinner from "../../motion/TextSpinner";
import LineOver from "../../motion/View/LineOver";

const Title = () => {
  return (
    <motion.section id="home">
      <div
        style={{
          right: "0",
          position: "absolute",
          zIndex: "1",
          margin: "1vw",
        }}
      >
        <LineOver title="Who I am" url="#about" />
        <LineOver title="What I do" url="#services" />
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          mixBlendMode: "difference",
        }}
      >
        <div className="main-title">
          <h2>{portfolio.text[0]}</h2>
          <h1>{portfolio.text[1]}</h1>
          <h1>{portfolio.text[2]}</h1>
          <p>{portfolio.text[3]}</p>
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
          <Logo light size="60px" />
        </motion.div>

        <div
          style={{
            maxWidth: "99vw",
          }}
        >
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </div>
      </div>
    </motion.section>
  );
};

export default Title;
