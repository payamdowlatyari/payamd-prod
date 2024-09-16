"use client";

import { motion, useSpring, useScroll } from "framer-motion";
import { useRef } from "react";
import { BackgroundGradientAnimation } from "~/lib/components/motion/BackgroundGradientAnimation";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import { InitialTransition } from "~/lib/components/motion/Transition";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const progressBarRef = useRef(null);
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
      <InitialTransition />
      <section
        ref={ref}
        id="about"
        className="flex flex-wrap bg-black bg-grid-white/[0.05] relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-1 flex-wrap md:flex-nowrap items-baseline z-[1] mix-blend-exclusion">
          <div className="fixed right-0 bottom-80 mix-blend-difference z-[1] bg-[url('/me-home-bw.webp')] bg-cover bg-center w-96 h-96" />

          <h1 className="absolute left-0 top-40 text-7xl md:text-9xl text-white mix-blend-difference">
            About
          </h1>

          <ScrollReveal className="md:text-4xl text-white text-2xl max-w-screen-md">
            After obtaining my B.S. in Software Engineering from UC Irvine in
            2020, I entered the tech industry and worked at Amplify.ai for three
            years developing AI applications. Having the opportunity to study at
            UCI and work in an innovative start-up environment, I haveve
            improved my technical and soft skills, uncovered my passion for
            design, and expanded my mastery in software development in recent
            years. Meanwhile, I dedicated time to learning new skills and
            completed a 9-month postgraduate program in full-stack web
            development. Likewise, I gained hands-on experience with different
            tools, such as JS/TS-based frameworks, including React.js,
            server-side technologies such as Node.js, automation and DevOps
            tools, cloud services, and SQL and NoSQL databases.
          </ScrollReveal>
        </div>
        <div className="fixed z-[998] top-1 left-3">
          <Logo light size={60} />
        </div>
      </section>
      <BackgroundGradientAnimation />

      <Footer />

      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 right-0 h-3 origin-[0%] bg-neutral-400"
        style={{ scaleX }}
      />
    </>
  );
};

export default AboutRoute;
