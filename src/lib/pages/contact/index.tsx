"use client";

import { motion, useIsPresent } from "framer-motion";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

const Contact = () => {
  const isPresent = useIsPresent();

  return (
    <main className="relative h-full w-full m-auto bg-white text-black">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] text-black" />
      <Menu />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-white z-[2]"
      />
      <section className="relative z-[1]">
        <div className="flex flex-col justify-center items-center m-auto">
          <h1>Contact</h1>
          <p>Get in touch with me</p>
          <SendMail />
        </div>
      </section>
      <ParallaxText baseVelocity={0.01}>Contact ✳︎ Contact ✳︎</ParallaxText>
      <div className="fixed z-[998] -top-4 left-3">
        <Logo light size={60} />
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
