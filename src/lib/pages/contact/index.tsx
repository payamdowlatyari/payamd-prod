"use client";

import Menu from "~/lib/components/motion/Menu/Menu";
import { SendMail } from "~/lib/components/Sections/Contact/SendMail";
import Footer from "~/lib/layout/Footer";

const Contact = () => {
  return (
    <main className="bg-black">
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
    </main>
  );
};

export default Contact;
