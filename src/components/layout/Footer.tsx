import Link from "next/link";

import BlurFade from "~/components/motion/BlurFade";
import { LinkArrowOut } from "~/components/ui/Button";
import { portfolio } from "~/data";

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
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="flex justify-center items-end w-screen h-full min-h-96 z-0">
      <div className="flex flex-col items-center justify-end z-10">
        <BlurFade blur="6px" duration={0.7} delay={0.3} inView>
          <div className="w-screen h-full flex flex-wrap md:flex-nowrap items-center justify-center my-10">
            <div className="flex flex-row gap-2 md:gap-4 mt-4 w-full justify-center">
              {navigationLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="uppercase text-xs sm:text-sm md:text-base px-1 text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full py-2">
              <div className="flex flex-row gap-2 md:gap-4 mt-4">
                {portfolio.social.map((link) => (
                  <LinkArrowOut
                    key={link.platform}
                    title={link.platform}
                    url={link.url}
                  />
                ))}
              </div>
            </div>
          </div>
        </BlurFade>
        <CopyRight />
      </div>
    </footer>
  );
};

export default Footer;
