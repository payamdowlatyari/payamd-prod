"use client";

import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";

import Footer from "~/components/layout/Footer";
import Menu from "~/components/layout/Menu";
import BlurFade from "~/components/motion/BlurFade";
import { Card } from "~/components/motion/Card";
import LinkPreview from "~/components/motion/LinkPreview";
import { Logos, Marquee } from "~/components/motion/Marquee";
import ScrollProgressBar, {
  ProgressiveBlur,
} from "~/components/motion/ScrollProgressBar";
import TextRevealByWord from "~/components/motion/ScrollReveal";
import { LinkArrowOut } from "~/components/ui/Button";
import { IntroImage } from "~/components/ui/Images";
import { H1, H2, Paragraph } from "~/components/ui/Texts";
import { intro, resume } from "~/data";

/** A quiet scroll cue with the same entrance reveal as the introduction. */
const ScrollCue = () => {
  const reduceMotion = useReducedMotion();

  return (
    <BlurFade delay={0.6} duration={0.7}>
      <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <span>Scroll to explore</span>
        <div
          aria-hidden="true"
          className="flex h-10 w-6 justify-center rounded-full border border-border pt-2"
        >
          <motion.span
            className="h-1.5 w-1 rounded-full bg-foreground/80"
            animate={reduceMotion ? { y: 0 } : { y: [0, 14, 0] }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 1.8,
                    repeat: Infinity,
                    repeatDelay: 0.4,
                    ease: "easeInOut",
                  }
            }
          />
        </div>
      </div>
    </BlurFade>
  );
};

/**
 * Renders an introduction section with a gradient tracing animation.
 */
const Intro = ({ opacity }: { opacity: MotionValue<number> }) => (
  <div className="relative">
    <motion.div
      style={{ opacity }}
      className="fixed inset-0 flex h-screen w-full items-center overflow-y-auto px-6 pb-32 pt-24 sm:px-10"
    >
      <div className="m-auto grid w-full max-w-5xl items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,320px)] md:gap-12 lg:gap-20">
        <div className="grid gap-5">
          <H1 label={intro.title} />
          <Paragraph text={intro.summary} />
          <BlurFade delay={0.5} duration={0.7} inView>
            <LinkArrowOut title="Download Resume PDF" url="/pdf/resume.pdf" />
          </BlurFade>
        </div>
        <IntroImage />
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-0 flex w-full justify-center px-4 pb-10">
        <ScrollCue />
      </div>
    </motion.div>
    <div className="z-10 flex min-h-screen justify-center pt-[200vh]">
      <TextRevealByWord
        text={intro.description.replace(/\s+/g, " ")}
        revealSpanWords={4}
        revealCompleteAt={0.65}
      />
    </div>
  </div>
);

/**
 * Renders a resume section with a gradient tracing animation.
 */
const Resume = ({ x }: { x: MotionValue<string> }) => (
  <section
    id="resume"
    className="block top-0 max-w-screen-lg overflow-hidden h-[1500vh] p-0 bg-transparent"
  >
    <div className="fixed flex top-0 overflow-hidden items-center h-screen">
      <motion.ul
        className="fixed flex list-none h-screen"
        layout
        style={{
          x,
        }}
      >
        {resume.map((section) => (
          <li className="w-screen max-w-screen-lg" key={section.section}>
            <div className="flex flex-row justify-center items-center h-screen m-1">
              <div className="flex flex-col justify-center max-w-screen-lg overflow-hidden backdrop-blur-sm rounded-lg p-4">
                <div className="flex flex-col-reverse px-4">
                  <H2 label={section.section} />
                </div>

                <div className="max-w-screen-lg flex flex-col justify-evenly">
                  <BlurFade delay={0.5} inView blur="xl">
                    <Card items={section.items} />
                  </BlurFade>
                </div>
              </div>
            </div>
          </li>
        ))}
      </motion.ul>
    </div>
  </section>
);

/**
 * Renders a marquee section with a gradient tracing animation.
 */
const MarqueeSection = ({ opacity }: { opacity: MotionValue<number> }) => (
  <motion.div layout style={{ opacity }} className="sticky bottom-0 z-10">
    <Marquee>
      {Object.entries(Logos).map(([key, Logo]) => (
        <div
          key={key}
          className="relative scale-75 hover:scale-90 transition-transform h-full w-fit mx-2 flex items-center justify-start"
        >
          <Logo />
        </div>
      ))}
    </Marquee>
    <ProgressiveBlur
      className="pointer-events-none absolute inset-y-0 left-0 w-16"
      direction="left"
      blurIntensity={1}
    />
    <ProgressiveBlur
      className="pointer-events-none absolute inset-y-0 right-0 w-16"
      direction="right"
      blurIntensity={1}
    />
  </motion.div>
);

/**
 * Renders a bottom section with a gradient tracing animation.
 */
const BottomSection = () => (
  <div className="relative flex flex-col md:flex-row justify-evenly my-20 items-center gap-4">
    <div className="text-neutral-400 text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl mx-auto max-w-xl leading-tight px-4 my-10 z-10">
      Check out <br /> my{" "}
      <LinkPreview url="https://blog.payamd.com/">Blog</LinkPreview> <br /> &{" "}
      <br />
      <LinkPreview url="https://photos.payamd.com/">
        Photography
      </LinkPreview>{" "}
      <br />
      portfolio.
    </div>
  </div>
);

/**
 * A component that displays an about page.
 *
 * @returns {JSX.Element} The rendered about page.
 */
const About = (): JSX.Element => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 1],
    ["50%", "50%", "-125%"],
    { clamp: false }
  );
  const opacityIntro = useTransform(
    scrollYProgress,
    [0, 0.05, 0.08, 1],
    [1, 1, 0, 0]
  );

  const opacityMarquee = useTransform(
    scrollYProgress,
    [0, 0.3, 0.4, 0.8, 0.9, 1],
    [0, 0, 1, 1, 0, 0],
    { clamp: false }
  );

  return (
    <main ref={ref}>
      <Menu />
      <Intro opacity={opacityIntro} />
      <Resume x={x} />
      <MarqueeSection opacity={opacityMarquee} />
      <BottomSection />
      <Footer />
      <ScrollProgressBar />
    </main>
  );
};

export default About;
