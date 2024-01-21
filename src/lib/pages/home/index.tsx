"use client";

import "../../styles/globals.css";
import { motion, useSpring, useScroll } from "framer-motion";
import About from "~/lib/components/Sections/About";
import Title from "~/lib/components/Sections/Title";
import Contact from "~/lib/components/Sections/Contact";
import Gallery from "~/lib/components/motion/Gallery";
import Menu from "~/lib/components/motion/Menu/Menu";
import Footer from "~/lib/layout/Footer";
import Skills from "~/lib/components/Sections/Resume/Skills";
import Resume from "~/lib/components/Sections/Resume";
import Logo from "~/lib/components/Sections/Title/Logo";
import Header from "~/lib/layout/Header";

const Home = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      <Menu />

      <Title />
      <Header />
      <Logo />
      <About />
      <Resume />
      <Skills />
      <Gallery />
      <Contact />
      <motion.div className="progress" style={{ scaleX }} />
      <Footer />
    </>
  );
};

export default Home;
