"use client";

import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
  const progressBarRef = useRef(null);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    restDelta: 0.001,
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0], {
    clamp: false,
  });

  const translateY = useTransform(scrollYProgress, [0, 0.8], ["-5%", "5%"], {
    clamp: false,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.5], {
    clamp: false,
  });

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <section
        ref={ref}
        id="about"
        className="flex flex-wrap relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-1 flex-wrap md:flex-nowrap items-baseline z-10">
          <motion.div
            style={{ translateY, scale }}
            className="fixed right-0 top-0 z-11 bg-[url('/me-home-filter.webp')] opacity-60 bg-right bg-contain bg-no-repeat w-[600px] max-w-[100vw] h-full"
          />
          <motion.h1
            style={{ opacity }}
            className="fixed top-40 left-20 text-7xl md:text-9xl text-gray-50 z-10"
          >
            About
          </motion.h1>

          <ScrollReveal className="text-2xl md:text-4xl text-gray-50 max-w-screen-md z-10">
            After obtaining my B.S. in Software Engineering from UC Irvine in
            2020, I entered the tech industry and worked at Amplify.ai for three
            years developing AI applications. I satrted working as a software
            engineer and web application architect at Avalon AI to improve
            healthcare services in the United States. Having the opportunity to
            study at UCI and work in an innovative start-up environments, I have
            improved my technical and soft skills, uncovered my passion for
            design, and expanded my mastery in software development in recent
            years. Meanwhile, I dedicated time to learning new skills and
            completed a 9-month postgraduate program in full-stack web
            development. Likewise, I gained hands-on experience with different
            tools, such as JS/TS-based frameworks, including React.js,
            server-side technologies such as Node.js, automation and DevOps
            tools, and database technologies such as SQL and NoSQL databases, as
            well as cloud technologies such as AWS, Google Cloud, and Microsoft
            Azure. I am a team player, and I am always willing to learn new
            skills and improve my skills. I have a great interest in learning
            new technologies and am always looking for new challenges.
          </ScrollReveal>
        </div>
      </section>
      <Footer />
      <motion.div
        ref={progressBarRef}
        className="fixed bottom-0 left-0 h-2 w-screen z-10 origin-left bg-gray-100"
        style={{ scaleX }}
      />
    </motion.main>
  );
};

export default AboutRoute;
