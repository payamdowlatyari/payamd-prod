import { useScrollbar, useTracker } from "@14islands/r3f-scroll-rig";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect } from "react";

import { MagneticSocialLinks } from "~/components/motion/FloatingDock";
import CopyRight from "~/components/View/CopyRight";
import Logo from "~/components/View/Logo";

/**
 * Footer component
 */
const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { onScroll } = useScrollbar();
  const { scrollState } = useTracker(
    footerRef as React.MutableRefObject<HTMLElement>
  );

  const scrollProgress = useMotionValue(0);
  const footerOpacity = useTransform(scrollProgress, [0.5, 1], [0, 1]);
  const footerScale = useTransform(scrollProgress, [0.5, 1], [0.75, 1]);

  useEffect(() => {
    return onScroll(() => scrollProgress.set(scrollState.visibility));
  }, [onScroll, scrollProgress, scrollState]);

  const navigationLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <motion.footer
      ref={footerRef}
      layout
      className="flex justify-center items-end w-screen h-full min-h-[40vh]"
    >
      <motion.div
        style={{ opacity: footerOpacity, scale: footerScale }}
        className="flex flex-col items-center justify-end h-full z-10"
      >
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
          <div className="flex flex-col items-center justify-center h-full w-full py-2 social">
            <MagneticSocialLinks />
          </div>
        </div>
        <CopyRight />
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
