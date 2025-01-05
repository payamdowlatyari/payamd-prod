"use client";

import { motion } from "framer-motion";

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
          <BlurFade delay={1} inView>
            <div className="w-full flex mt-4 items-center justify-center">
              <h1 className="text-center text-5xl md:text-7xl lg:text-9xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-800 select-none">
                Contact
              </h1>
            </div>
          </BlurFade>
          <BlurFade delay={1.25} inView>
            <p className="text-lg lg:text-xl mb-5 text-neutral-400">
              Get in touch with me
            </p>
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
