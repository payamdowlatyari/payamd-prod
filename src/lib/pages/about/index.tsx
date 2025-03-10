"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { intro, resume } from "~/lib/components/data/data";
// import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import { ResumeCard } from "~/lib/components/motion/Card";
import { LinkPreview } from "~/lib/components/motion/LinkPreview";
import { Logos, Marquee } from "~/lib/components/motion/Marquee";
import Menu from "~/lib/components/motion/Menu/Menu";
import { GradientTracing } from "~/lib/components/motion/PulseBeams";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { TextRevealByWord } from "~/lib/components/motion/ScrollReveal";
import Footer from "~/lib/layout/Footer";

/**
 * About component
 * @returns {JSX.Element}
 */
const About = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0.3, 1], ["25%", "-125%"], {
    clamp: false,
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.2, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
    {
      clamp: false,
    }
  );

  const opacity2 = useTransform(scrollYProgress, [0, 0.05, 0.08], [1, 1, 0]);

  return (
    <motion.main
      className="bg-neutral-950 text-neutral-50"
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      ref={ref}
    >
      <Menu />
      <div id="about">
        <motion.div
          style={{ opacity: opacity2 }}
          className="fixed mt-40 sm:mt-60 md:mt-80 mx-1 w-screen flex flex-wrap items-center justify-evenly"
        >
          <BlurFade delay={0.5} inView>
            <GradientTracing
              width={500}
              height={250}
              path="M0,150 Q75,0 150,150 T300,150"
              gradientColors={["#E74C3C", "#E74C3C", "#F39C12"]}
            />
            <div className="pl-4 sm:pl-16 pt-1 sm:pt-2 flex">
              <motion.div className="grid gap-2">
                <h1 className="text-5xl sm:text-7xl font-semibold max-w-sm">
                  About
                </h1>
                <p className="text-neutral-400 md:text-lg max-w-screen-sm">
                  My name is Payam Dowlatyari a Software Engineer in California
                </p>
              </motion.div>
            </div>
          </BlurFade>

          <BlurFade delay={0} inView>
            <Image
              src="/me-ai-red_processed.jpeg"
              width={400}
              height={400}
              alt="me"
              className="scale-50 sm:scale-75 md:scale-100 opacity-75"
              loading="lazy"
            />
          </BlurFade>
        </motion.div>

        <div className="z-10 flex min-h-screen items-center justify-center pt-[100vh]">
          <TextRevealByWord text={intro.text.replace(/\s+/g, " ")} />
        </div>
      </div>
      <div className="flex justify-center items-center w-screen">
        <GradientTracing width={300} height={100} path="M0,50 Q150,0 300,50" />
      </div>
      <motion.section
        id="resume"
        className="block top-0 max-w-screen-lg overflow-hidden h-[1500vh] p-0"
        ref={ref}
        layoutScroll
      >
        <div className="fixed flex top-0 overflow-hidden items-center h-screen z-[2]">
          <motion.ul
            className="fixed flex list-none h-screen"
            style={{
              x,
            }}
          >
            {resume.map((section) => (
              <li className="w-screen max-w-screen-lg" key={section.section}>
                <div className="flex flex-row justify-center items-center h-screen m-1 z-0">
                  <div className="flex flex-col justify-center max-w-[98vw] h-[90vh] overflow-hidden z-10">
                    <div className="flex flex-col-reverse px-4">
                      <BlurFade delay={0.5} inView>
                        <div className="w-full flex mt-2 items-center justify-start">
                          <h2 className="text-center text-5xl md:text-7xl tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-700 select-none">
                            {section.section}
                          </h2>
                        </div>
                      </BlurFade>
                    </div>

                    <div className="max-w-screen-lg flex flex-col justify-evenly">
                      <BlurFade delay={1} inView>
                        <ResumeCard items={section.items} />
                      </BlurFade>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </motion.ul>
        </div>
      </motion.section>

      <motion.div layout style={{ opacity }} className="sticky bottom-0 z-10">
        <div className="absolute left-0 w-1/6 h-full bg-gradient-to-r from-black to-transparent z-10 bg-opacity-50" />
        <div className="absolute right-0 w-1/6 h-full bg-gradient-to-l from-black to-transparent z-10 bg-opacity-50" />
        <Marquee>
          {Object.values(Logos).map((Logo) => (
            <div
              key={Logo.name}
              className="relative scale-75 hover:scale-100 transition h-full w-fit mx-[0.5rem] flex items-center justify-start"
            >
              <Logo />
            </div>
          ))}
        </Marquee>
      </motion.div>

      <div className="flex justify-center items-center w-screen">
        <GradientTracing
          width={500}
          height={100}
          path="M0,50 C75,0 150,100 225,50 S300,0 375,50"
          gradientColors={["#FF6B6B", "#FF6B6B", "#4ECDC4"]}
        />
      </div>
      <div className="flex flex-col justify-center items-center text-center max-w-sm m-auto z-10 px-4 relative bottom-0">
        <p className="text-neutral-400 text-2xl sm:text-3xl md:text-4xl mx-auto mb-10">
          Check out my personal{" "}
          <LinkPreview url="https://blog.payamd.com/" className="font-semibold">
            Blog
          </LinkPreview>{" "}
          and{" "}
          <LinkPreview
            url="https://photos.payamd.com/"
            className="font-semibold"
          >
            Photography
          </LinkPreview>{" "}
          portfolio.
        </p>
      </div>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default About;
