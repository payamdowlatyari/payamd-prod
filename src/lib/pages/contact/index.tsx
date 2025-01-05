"use client";

import { motion } from "framer-motion";

import { GridBeam } from "~/lib/components/motion/BackgroundBeams";
import { BlurFade } from "~/lib/components/motion/BlurFade";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

/**
 * Contact component
 * @returns {JSX.Element}
 */
const Contact = (): JSX.Element => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 3, ease: "easeInOut" }}
      className="bg-black"
    >
      <Menu />
      <section className="w-fit m-auto z-10">
        <div className="flex flex-col justify-center items-center m-auto">
          <BlurFade delay={0.5} inView>
            <GridBeam className="flex items-center justify-center">
              <div className="grid gap-2 m-auto">
                <h1 className="text-5xl sm:text-7xl font-semibold max-w-lg">
                  Contact
                </h1>
                <p className="text-neutral-400 max-w-lg text-center">
                  Get in touch with me
                </p>
              </div>
            </GridBeam>
          </BlurFade>
          <SendMail />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
};

export default Contact;
