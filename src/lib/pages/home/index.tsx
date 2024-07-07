"use client";

// import "../../styles/globals.css";
import { motion, useSpring, useScroll } from "framer-motion";
import { useRef } from "react";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import About from "~/lib/components/Sections/About";
import Services from "~/lib/components/Sections/Services";
import Title from "~/lib/components/Sections/Title";
import Footer from "~/lib/layout/Footer";
// import Header from "~/lib/layout/Header";

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
      {/* <Header /> */}

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
        <div className="fixed z-[998] -top-4 left-3">
          <Logo light size={60} />
        </div>
      </motion.div>
      <Footer />
      <motion.div
        ref={ref}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-slate-100"
        style={{ scaleX }}
      />
    </>
  );
};

export default Home;
