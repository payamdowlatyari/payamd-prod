import Link from "next/link";

import { TextHover } from "../motion/TextHover";
import BlurFade from "~/components/motion/BlurFade";

import Contacts from "./Contacts";

/**
 * Footer component
 */
const Footer = () => {
  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="flex justify-center items-end w-screen h-full min-h-screen z-0 bg-gradient-to-b from-neutral-950 to-neutral-800">
      <div className="flex flex-col items-center justify-end h-[75vh] z-10">
        <BlurFade
          blur="6px"
          duration={0.7}
          delay={0.3}
          inView
          variant={{ hidden: { y: 50 }, visible: { y: 0 } }}
        >
          <div className="w-screen h-[70vh] flex flex-wrap md:flex-nowrap items-center justify-center my-10">
            <div className="flex flex-col mt-4 w-full items-center justify-center">
              {navigationLinks.map(({ href, label }) => (
                <TextHover key={href} text={label} url={href} />
              ))}
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full py-2">
              <Contacts />
            </div>
          </div>
        </BlurFade>
        <div className="flex mx-auto text-xs self-end py-7">
          <Link
            className="text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold px-1"
            href="https://www.payamd.com"
            target="_blank"
            rel="noreferrer"
          >
            payamd.com
          </Link>
          <span className="text-neutral-500">
            {" © "}
            {new Date().getFullYear()}
            {" | "}
            All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
