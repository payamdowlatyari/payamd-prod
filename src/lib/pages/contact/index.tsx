"use client";

// import "../../styles/globals.css";
import { motion, useIsPresent } from "framer-motion";

import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import ParallaxText from "~/lib/components/motion/ParallaxText";
import ContactPage from "~/lib/components/Sections/Contact";
import Footer from "~/lib/layout/Footer";

const Contact = () => {
  const isPresent = useIsPresent();

  return (
    <>
      <Menu />
      <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: { duration: 1, ease: "circOut" } }}
        exit={{ scaleX: 1, transition: { duration: 1, ease: "circIn" } }}
        style={{ originX: isPresent ? 0 : 1 }}
        className="fixed top-0 left-0 right-0 bottom-0 bg-slate-100 z-[2]"
      />

      <ContactPage />
      <ParallaxText baseVelocity={0.01}>Contact ✳︎ Contact ✳︎</ParallaxText>
      <div className="fixed z-[998] -top-4 left-3">
        <Logo light size={60} />
      </div>
      <Footer />
    </>
  );
};

export default Contact;
