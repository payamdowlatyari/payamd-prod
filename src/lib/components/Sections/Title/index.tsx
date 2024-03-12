import { motion } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import Logo from "../../motion/Menu/Logo";
import TextSpinner from "../../motion/TextSpinner";
import LineOver from "../../motion/View/LineOver";

const Title = () => {
  return (
    <section id="home">
      <div className="title-content blend-difference">
        <div className="main-title">
          <h2>{portfolio.text[0]}</h2>
          <h1>{portfolio.text[1]}</h1>
          <h1>{portfolio.text[2]}</h1>
          <p>{portfolio.text[3]}</p>
        </div>

        <TextSpinner />
        <motion.div
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 2,
            delay: 10,
            ease: "easeIn",
          }}
        >
          <div className="logo-pd">
            <Logo light size="60px" />
          </div>
          <div className="top-links">
            <LineOver title="01 Who I am" url="#about" />
            <LineOver title="02 What I do" url="#services" />
          </div>
        </motion.div>
        <div className="max-width-screen">
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </div>
      </div>
    </section>
  );
};

export default Title;
