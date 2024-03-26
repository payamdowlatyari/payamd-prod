"use client";

import "../../styles/globals.css";
import { useRef } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
import About from "~/lib/components/Sections/About";
import Title from "~/lib/components/Sections/Title";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Services from "~/lib/components/Sections/Services";
import Header from "~/lib/layout/Header";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import Logo from "~/lib/components/motion/Menu/Logo";

const Home = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  return (
    <>
      <Menu />
      <Header />
      <Title />
      <About />
      <ParallaxText baseVelocity={0.01}>About ✳︎ Services ✳︎</ParallaxText>
      <Services />
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
      </motion.div>
      <Footer />
      <motion.div ref={ref} className="progress" style={{ scaleX }} />
    </>
  );
};

export default Home;
