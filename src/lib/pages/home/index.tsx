"use client";

import "../../styles/globals.css";
import { useRef } from "react";
import { motion, useSpring, useScroll } from "framer-motion";
import About from "~/lib/components/Sections/About";
import Title from "~/lib/components/Sections/Title";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Header from "~/lib/layout/Header";
import Services from "~/lib/components/Sections/Services";

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
      <Title />
      <Header />
      <About />
      <Services />
      <motion.div ref={ref} className="progress" style={{ scaleX }} />
      <Footer />
    </>
  );
};

export default Home;
