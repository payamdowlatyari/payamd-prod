"use client";

import { motion, useSpring, useScroll } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import { TextAnimate } from "~/lib/components/motion/TextAnimate";
import { InitialTransition } from "~/lib/components/motion/Transition";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const progressBarRef = useRef(null);
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
        id="about"
        className="overflow-hidden flex flex-1 flex-wrap md:flex-nowrap p-0"
      >
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-7xl md:text-9xl text-neutral-50">
            <TextAnimate text="About" />
          </h1>
          <Image
            src="/me-home-bw.webp"
            alt="test"
            width={350}
            height={350}
            loading="lazy"
            className="relative z-[1]"
          />
        </div>
        <ScrollReveal className="md:text-3xl text-neutral-50 text-xl">
          After obtaining my B.S. in Software Engineering from UC Irvine in
          2020, I entered the tech industry and worked at Amplify.ai for three
          years developing AI applications. Having the opportunity to study at
          UCI and work in an innovative start-up environment, I haveve improved
          my technical and soft skills, uncovered my passion for design, and
          expanded my mastery in software development in recent years.
          Meanwhile, I dedicated time to learning new skills and completed a
          9-month postgraduate program in full-stack web development. Likewise,
          I gained hands-on experience with different tools, such as JS/TS-based
          frameworks, including React.js, server-side technologies such as
          Node.js, automation and DevOps tools, cloud services, and SQL and
          NoSQL databases.
        </ScrollReveal>
        <div className="fixed z-[998] top-1 left-3">
          <Logo light size={60} />
        </div>
      </section>

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
