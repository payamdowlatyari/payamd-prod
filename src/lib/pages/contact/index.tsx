"use client";

import { motion } from "framer-motion";

import Footer from "~/components/Footer/Footer";
import Menu from "~/components/Menu/Menu";
import SendMail from "~/components/Message/SendMail";
import { beams } from "~/components/motion/BackgroundBeams";
import { PulseBeams } from "~/components/motion/PulseBeams";
import ScrollProgressBar from "~/components/motion/ScrollProgressBar";
import { H1, Paragraph } from "~/components/Texts/titles";

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
              <H1 label="Contact" />
            </PulseBeams>
            <Paragraph
              text="I would love to hear from you! Please fill out the form below and I will get back to you as soon as possible."
              className="mb-4 mx-auto text-center max-w-sm"
            />
          </div>
          <SendMail />
        </div>
      </section>
      <Footer />
      <ScrollProgressBar showPercentage />
    </motion.main>
  );
}
