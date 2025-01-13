"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import { LinkPreview } from "~/lib/components/motion/LinkPreview";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import ScrollReveal from "~/lib/components/motion/ScrollReveal";
import Footer from "~/lib/layout/Footer";

/**
 * About component
 * @returns {JSX.Element}
 */
const About = (): JSX.Element => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <section
        id="about"
        className="flex flex-wrap relative items-end justify-center overflow-hidden"
      >
        <div className="flex flex-col flex-1 flex-wrap md:flex-nowrap items-baseline z-10">
          <motion.div className="absolute mt-[25vh] mx-1 w-screen flex flex-wrap items-center justify-evenly">
            <BlurFade delay={0.5} inView>
              <GridBeam className="sm:pl-16 pt-28 pl-4 flex">
                <div className="grid gap-2">
                  <h1 className="text-5xl sm:text-7xl font-semibold max-w-sm">
                    About
                  </h1>
                  <p className="text-neutral-400 md:text-lg max-w-lg">
                    My name is Payam Dowlatyari a Software Engineer in
                    California
                  </p>
                </div>
              </GridBeam>
            </BlurFade>

            <BlurFade delay={0} inView>
              <Image
                src="/me-ai-red.jpeg"
                width={400}
                height={400}
                alt="me"
                className="opacity-80 hover:opacity-100 scale-75 md:scale-100"
                loading="lazy"
              />
            </BlurFade>
          </motion.div>
          <ScrollReveal className="text-lg sm:text-xl md:text-2xl text-neutral-200 z-10 mx-auto">
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

export default About;
