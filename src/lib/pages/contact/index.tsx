"use client";

import { motion } from "framer-motion";

import { BlurFade } from "~/lib/components/motion/BlurFade";
import Menu from "~/lib/components/motion/Menu/Menu";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBat";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

const Contact = () => {
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
            <h1 className="text-6xl md:text-7xl lg:text-8xl text-neutral-400 tracking-tighter py-1">
              Contact
            </h1>
          </BlurFade>
          <BlurFade delay={1.25} inView>
            <p className="text-lg lg:text-xl mb-5 text-neutral-200">
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
