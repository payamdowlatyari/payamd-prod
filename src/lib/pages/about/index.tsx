"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { BlurFade } from "~/lib/components/motion/BlurFade";
import { LinkPreview } from "~/lib/components/motion/LinkPreview";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import Footer from "~/lib/layout/Footer";

const AboutRoute = () => {
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
        id="about"
        className="flex flex-wrap relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-col flex-1 flex-wrap md:flex-nowrap items-baseline z-10">
          <motion.div className="absolute mt-28 mx-1 w-screen flex flex-wrap items-center justify-evenly">
            <BlurFade delay={1} inView>
              <div className="w-full flex mt-4 items-center justify-center">
                <h1 className="text-center text-6xl md:text-9xl lg:text-[10rem] font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-300 to-neutral-700 select-none">
                  About
                </h1>
              </div>
              <p className="text-lg md:text-xl lg:text-2xl text-neutral-300 mb-5">
                My name is Payam Dowlatyari
                <br /> a Software Engineer <br />
                in California
              </p>
            </BlurFade>
            <BlurFade delay={0.5} inView>
              <Image
                src="/me-ai-red.jpeg"
                width={400}
                height={400}
                alt="me"
                className="opacity-80"
                loading="lazy"
              />
            </BlurFade>
          </motion.div>
          <ScrollReveal className="text-xl sm:text-2xl md:text-3xl text-neutral-200 z-10 mx-auto">
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
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default AboutRoute;
