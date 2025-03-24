"use client";

import { motion } from "framer-motion";

import { beams } from "~/lib/components/motion/BackgroundBeams";
import Menu from "~/lib/components/motion/Menu/Menu";
import { PulseBeams } from "~/lib/components/motion/PulseBeams";
import ScrollProgressBar from "~/lib/components/motion/ScrollProgressBar";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

/**
 * Contact component
 * @returns {JSX.Element}
 */
export default function Contact(): JSX.Element {
  return (
    <motion.main
      initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-neutral-950 text-neutral-50"
    >
      <Menu />
      <section className="w-fit m-auto z-10">
        <div className="flex flex-col justify-center items-center m-auto">
          <div className="grid gap-2 m-auto">
            <PulseBeams
              beams={beams as any}
              gradientColors={{
                start: "#18CCFC",
                middle: "#6344F5",
                end: "#AE48FF",
              }}
            >
              <h1 className="text-5xl sm:text-7xl font-semibold max-w-lg">
                Contact
              </h1>
            </PulseBeams>
            <p className="text-neutral-400 max-w-lg md:text-lg m-auto text-center">
              Get in touch with me
            </p>
          </div>
          <SendMail />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
}
