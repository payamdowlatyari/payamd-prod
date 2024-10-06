"use client";

import {
  motion,
  useSpring,
  useScroll,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useRef } from "react";

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

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.5, 0.4, 0.3], {
    clamp: false,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["-5%", "45%"], {
    clamp: false,
  });

  const opacity2 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0], {
    clamp: false,
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const willChange = useWillChange();

  return (
    <article>
      <Menu />
      <InitialTransition />
      <section
        ref={ref}
        id="about"
        className="flex flex-wrap bg-black relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-1 flex-wrap md:flex-nowrap items-baseline z-[1]">
          <motion.div
            style={{ opacity, x, willChange }}
            className="fixed right-0 bottom-20 z-[1] bg-[url('/me-home-removebg34.png')] mix-blend-exclusion shadow-xl shadow-black bg-cover bg-center w-[400px] md:w-[600px] h-[400px] md:h-[600px]"
          />

          <motion.h1
            style={{ opacity: opacity2, scale, willChange }}
            className="fixed left-10 top-36 text-7xl md:text-9xl text-gray-50"
          >
            About
          </motion.h1>

          <ScrollReveal className="text-2xl md:text-4xl text-gray-50 max-w-screen-md">
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
        className="fixed bottom-0 left-0 right-0 h-2 z-10 origin-[0%] bg-neutral-400 opacity-50"
        style={{ scaleX }}
      />
    </article>
  );
};

export default AboutRoute;
