"use client";

import "../../styles/globals.css";
import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import About from "~/lib/components/Sections/About";
import Title from "~/lib/components/Sections/Title";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Logo from "~/lib/components/motion/Menu/Logo";
import Header from "~/lib/layout/Header";
import Contact from "~/lib/components/Sections/Contact";
import { useRef } from "react";
import MotionItemX from "~/lib/components/motion/MotionItemX";
import Services from "~/lib/components/Sections/Services";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import Link from "next/link";

const Home = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.1,
  });

  // const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0.25, 0.75], [-500, 0]);

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
