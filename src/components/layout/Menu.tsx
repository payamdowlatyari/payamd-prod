import { AnimationScope, motion, useAnimate, useCycle } from "framer-motion";
import { Squeeze as Hamburger } from "hamburger-react";
import { useEffect } from "react";

import { FlipLink, LinkArrowOut } from "~/components/ui/Button";
import { portfolio } from "~/data";

const BLUR_EFFECT = "blur(10px)";
const BLUR_EFFECT_EXIT = "blur(0px)";

/**
 * Nav component
 */
export function Nav() {
  const links = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Projects", url: "/projects" },
    { title: "Contact", url: "/contact" },
  ];

  return (
    <div className="flex flex-col justify-center h-auto w-screen">
      {links.map(({ title, url }) => (
        <a
          key={title}
          href={url}
          className="flex justify-center items-center h-1/4 text-4xl md:text-5xl uppercase bg-neutral-950 text-neutral-100"
        >
          <FlipLink href={url}>{title}</FlipLink>
        </a>
      ))}
    </div>
  );
}

/**
 * Contacts component
 */
export function Contacts() {
  return (
    <div className="flex flex-col md:flex-row justify-center items-end h-1/3 w-full">
      {portfolio.contacts.map((section) => (
        <div
          key={`${section.title}`}
          className="flex flex-col justify-end items-start w-full h-1/2"
        >
          <h5 className="font-semibold text-xl md:text-2xl uppercase text-neutral-600 mx-4">
            {section.title}
          </h5>
          <div className="flex flex-wrap gap-4 mt-4">
            {section.links.map((link) => (
              <LinkArrowOut key={link.name} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col justify-end items-start w-full h-1/2">
        <h5 className="font-semibold text-xl md:text-2xl uppercase text-neutral-600 mx-4">
          Social
        </h5>
        <div className="flex flex-wrap gap-4 mt-4">
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
  );
}

/**
 * NavToggle component
 * @param {function} toggle - A function to toggle the menu
 */
const NavToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <span className="outline-none border-none cursor-pointer absolute top-1 right-3 bg-transparent flex items-center z-[1003]">
      <Hamburger onToggle={toggle} color="white" />
    </span>
  );
};

/**
 * useMenuAnimation hook
 * @param {boolean} isOpen - A boolean value indicating whether the menu is open or closed
 * @returns {AnimationScope} An array containing the animation scope and the animate function
 */
function useMenuAnimation(isOpen: boolean): AnimationScope {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animations: any = isOpen
      ? [
          [
            "li",
            { x: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { delay: 1, ease: "easeInOut", duration: 0.5 },
          ],
          [
            ".contacts",
            { x: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { ease: "easeInOut", duration: 0.4 },
          ],
          [
            ".social",
            { y: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { ease: "easeOut", duration: 0.6 },
          ],
        ]
      : [
          [
            ".social",
            { y: 200, opacity: 0, filter: BLUR_EFFECT },
            { ease: "easeIn", duration: 0.5, at: "-0.1" },
          ],
          [
            ".contacts",
            { x: 100, opacity: 0, filter: BLUR_EFFECT },
            { ease: "easeInOut", duration: 0.3, at: "-0.1" },
          ],
          [
            "li",
            { x: -100, opacity: 0, filter: BLUR_EFFECT },
            { duration: 0.5 },
          ],
        ];

    animate(animations);
  }, [isOpen, animate]);

  return scope;
}

/**
 * Menu component
 */
export default function Menu() {
  const [isMenuOpen, toggleMenu] = useCycle(false, true);
  const menuAnimationScope = useMenuAnimation(isMenuOpen);

  return (
    <motion.nav
      layout
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      className="fixed top-0 right-0 bg-transparent z-[1002]"
    >
      <NavToggle toggle={toggleMenu} />
      <motion.div
        layout
        variants={{
          closed: {
            opacity: 0,
            filter: BLUR_EFFECT,
            transition: { duration: 0.5 },
            transitionEnd: { display: "none" },
            transform: "translateY(-100%)",
          },
          open: {
            opacity: 1,
            display: "flex",
            filter: BLUR_EFFECT_EXIT,
            transition: { duration: 0.5 },
            transform: "translateY(0)",
          },
        }}
        transition={{
          duration: 0.75,
          ease: "easeOut",
          delay: 0.25,
        }}
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-end justify-center"
        ref={menuAnimationScope}
      >
        <div className="flex flex-wrap w-full h-5/6 justify-around items-center content-center">
          <Nav />
          <Contacts />
        </div>
      </motion.div>
    </motion.nav>
  );
}
