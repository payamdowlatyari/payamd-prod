import { motion, useWillChange } from "framer-motion";
import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import Link from "next/link";

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
      <motion.div
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
        style={{
          position: "absolute",
          display: "grid",
          right: "0",
          top: "35vh",
          zIndex: "99",
          textAlign: "justify",
          fontSize: "1.1em",
        }}
      >
        <Link href="#about" className="underlined underlinedThin">
          01 Who I am
        </Link>
        <Link href="#services" className="underlined underlinedThin">
          02 What I do
        </Link>
        <Link href="/projects" className="underlined underlinedThin">
          03 Portfolio
        </Link>
      </motion.div>
      <motion.div
        layout
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignSelf: "flex-end",
        }}
      >
        <motion.div
          layout
          style={{
            padding: "1em 1em",
            fontSize: "1.2em",
            display: "grid",
            transition: "1s ease-in-out",
            alignContent: "flex-end",
          }}
        >
          <motion.h4>
            {portfolio.text[0]} <br />
            {portfolio.text[1]} <br />
            {portfolio.text[2]} <br />
            {portfolio.text[3]}
          </motion.h4>
        </motion.div>
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
