"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import BlurFade from "~/components/motion/BlurFade";
import { ResumeCard } from "~/components/motion/Card";
import LinkPreview from "~/components/motion/LinkPreview";
import { Logos, Marquee } from "~/components/motion/Marquee";
import { GradientTracing } from "~/components/motion/PulseBeams";
import ScrollProgressBar, {
  ProgressiveBlur,
} from "~/components/motion/ScrollProgressBar";
import TextRevealByWord from "~/components/motion/ScrollReveal";
import { H1, H2, Paragraph } from "~/components/Texts/titles";
import { intro, resume } from "~/data/data";

/**
 * BottomSection component
 *
 * Renders a bottom section with a gradient tracing animation.
 */
const BottomSection = () => (
  <div className="flex flex-col items-center justify-center w-screen">
    <div className="flex flex-col items-center text-center max-w-sm mx-auto z-10 px-4 relative bottom-0">
      <p className="text-neutral-400 text-2xl sm:text-3xl md:text-4xl mb-10">
        View my{" "}
        <LinkPreview url="https://blog.payamd.com/" className="font-semibold">
          Blog
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://photos.payamd.com/" className="font-semibold">
          Photography
        </LinkPreview>{" "}
        portfolio.
      </p>
    </div>
    <GradientTracing width={250} height={50} animationDuration={2} />
  </div>
);

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

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ["50%", "50%", "-125%"],
    {
      clamp: false,
    }
  );

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
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
              width={300}
              height={250}
              path="M0,50 L75,25 L150,75 L225,25 L300,50"
              strokeWidth={2}
              gradientColors={["#F1C40F", "#F1C40F", "#E67E22"]}
              animationDuration={5}
            />
            <div className="pl-4 sm:pl-16 pt-1 sm:pt-2 flex">
              <motion.div className="grid gap-2">
                <H1 label="About" />
                <Paragraph text="My name is Payam Dowlatyari a Software Engineer in California" />
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

        <div className="z-10 flex min-h-screen justify-center pt-[200vh]">
          <TextRevealByWord text={intro.text.replace(/\s+/g, " ")} />
        </div>
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
                  <div className="flex flex-col justify-center max-w-screen-lg overflow-hidden z-10">
                    <div className="flex flex-col-reverse px-4">
                      <H2 label={section.section} />
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
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 left-0 h-full w-16 md:w-32"
          direction="left"
          blurIntensity={1}
        />
        <ProgressiveBlur
          className="pointer-events-none absolute top-0 right-0 h-full w-16 md:w-32"
          direction="right"
          blurIntensity={1}
        />
      </motion.div>
      <BottomSection />
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default About;
