"use client";

import { motion, useSpring, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { BlurFade } from "~/lib/components/motion/BlurFade";
import { LinkPreview } from "~/lib/components/motion/LinkPreview";
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

  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0], {
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
        <div className="flex flex-col flex-1 flex-wrap md:flex-nowrap items-baseline z-10">
          <motion.div style={{ opacity }} className="fixed right-0 mt-40 mx-3 ">
            <BlurFade delay={0.5} inView>
              <Image
                src="/me-ai-hat.jpeg"
                width={400}
                height={400}
                alt="me"
                className="opacity-80"
              />
            </BlurFade>
            <BlurFade delay={1} inView>
              <h1 className="relative z-10 text-xl sm:text-5xl md:text-9xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 tracking-tighter">
                About
              </h1>
              <p className="text-lg lg:text-xl text-neutral-500 mb-5">
                My name is Payam Dowlatyari
                <br /> a Software Engineer <br />
                in California
              </p>
            </BlurFade>
          </motion.div>
          <ScrollReveal className="text-xl sm:text-2xl md:text-3xl text-neutral-200 z-10">
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
          <div className="flex justify-center items-center w-screen z-10 px-4">
            <p className="text-neutral-400 text-xl md:text-2xl mx-auto mb-10">
              Check out my personal{" "}
              <LinkPreview
                url="https://payamd-blog.vercel.app/"
                className="font-bold"
              >
                Blog
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview
                url="https://payamd-photo.vercel.app/"
                className="font-bold"
              >
                Photography
              </LinkPreview>{" "}
              portfolio.
            </p>
          </div>
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
