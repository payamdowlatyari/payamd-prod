import { motion } from "framer-motion";
import Link from "next/link";

import { MagneticSocialLinks } from "~/components/motion/FloatingDock";
import Logo from "~/components/ui/Logo";

/**
 * CopyRight component
 */
function CopyRight() {
  return (
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
  );
}

/**
 * Footer component
 */
const Footer = () => {
  const navigationLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.footer
      layout
      className="flex justify-center items-end w-screen h-full min-h-96 z-0"
    >
      <motion.div className="flex flex-col items-center justify-end z-10">
        <div className="w-screen h-full flex flex-col items-center justify-center">
          <Logo type="footer" />
          <div className="flex flex-row mt-4 w-full justify-center">
            {navigationLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="uppercase text-xs px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center h-full w-full py-2">
            <MagneticSocialLinks />
          </div>
        </div>
        <CopyRight />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
