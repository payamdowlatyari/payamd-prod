"use client";

import { BackgroundGradientAnimation } from "~/lib/components/motion/BackgroundGradientAnimation";
import Logo from "~/lib/components/motion/Menu/Logo";
import Menu from "~/lib/components/motion/Menu/Menu";
import { InitialTransition } from "~/lib/components/motion/Transition";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

const Contact = () => {
  return (
    <>
      <Menu />
      <InitialTransition />
      <section className="relative z-[2]">
        <div className="flex flex-col justify-center items-center m-auto">
          <h1 className="text-5xl md:text-7xl lg:text-9xl tracking-tighter py-1">
            Contact
          </h1>
          <p className="text-lg lg:text-xl mb-5">Get in touch with me</p>
          <SendMail />
        </div>
      </section>
      <div className="fixed z-[998] top-1 left-3">
        <Logo light size={60} />
      </div>

      <BackgroundGradientAnimation />
      <Footer />
    </>
  );
};

export default Contact;
