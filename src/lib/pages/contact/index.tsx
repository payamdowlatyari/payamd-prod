"use client";

import { motion } from "framer-motion";

import Menu from "~/lib/components/motion/Menu/Menu";
import { Transition } from "~/lib/components/motion/Transition";
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
          <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter py-1">
            Contact
          </h1>
          <p className="text-lg lg:text-xl mb-5">Get in touch with me</p>
          <SendMail />
        </div>
      </section>
      <Footer />
      <Transition />
    </motion.main>
  );
};

export default Contact;
