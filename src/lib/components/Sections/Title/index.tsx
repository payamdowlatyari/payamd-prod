import { motion, useScroll, useTransform } from "framer-motion";
import Social from "./Social";
import ParallaxText from "../../motion/ParallaxText";
import { ArrowDownIcon } from "@chakra-ui/icons";

const Title = () => {
  const { scrollY } = useScroll();

  const x = useTransform(scrollY, [0, 50, 300], [0, -100, -900]);

  const opacity = useTransform(scrollY, [0, 300, 320], [1, 1, 0]);

  return (
    <motion.section
      id="home"
      layoutScroll
      transition={{
        layout: { duration: 1 },
      }}
    >
      <motion.div
        layout
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          height: "50vh",
        }}
      >
        <motion.div
          className="second"
          layout
          style={{
            opacity,
            x,
            transition: "1.5s ease-in-out",
          }}
        >
          <motion.h1
            layout
            style={{
              fontSize: "12em",
            }}
          >
            he
            <br />
            llo
            <b style={{ color: "#e17a47" }}>.</b>
          </motion.h1>
        </motion.div>
        <motion.div
          className="third"
          layout
          style={{
            paddingLeft: "1em",
            opacity,
            transition: "1s ease-in-out",
            x,
          }}
        >
          <motion.h4
            style={{
              opacity,
            }}
          >
            I am <br />
            Payam Dowlatyari
          </motion.h4>
          <motion.div
            layout
            style={{
              paddingTop: "1em",
            }}
          >
            <Social />
          </motion.div>
          <motion.div>
            <motion.a href="#about">
              about me <br />
              <ArrowDownIcon />
            </motion.a>
          </motion.div>
        </motion.div>
        <motion.div
          layout
          style={{
            paddingTop: "1em",
            maxWidth: "100vw",
            opacity,
          }}
        >
          <ParallaxText baseVelocity={-0.1}>
            Empathize Define Ideate Prototype Test
          </ParallaxText>
          <ParallaxText baseVelocity={0.1}>
            Design Thinking Design Thinking
          </ParallaxText>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Title;
