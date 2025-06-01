import { AnimationScope, motion, useAnimate, useCycle } from "framer-motion";
import { Pivot as Hamburger } from "hamburger-react";
import { useEffect } from "react";

import { MagneticSocialLinks } from "~/components/motion/FloatingDock";
import Squares from "~/components/motion/Squares";
import { LinkArrowOut } from "~/components/ui/Button";
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
    <ul className="inline-grid justify-start h-fit w-fit py-2 my-4 min-w-64">
      {links.map(({ title, url }) => (
        <li key={title} className="list-none my-1 ml-4">
          <a
            href={url}
            className="text-4xl md:text-5xl uppercase text-neutral-400 hover:text-neutral-50 transition-colors duration-500"
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Renders a list of contact links and a list of links to other websites in two
 * separate sections.
 */
export function Contacts() {
  return (
    <div className="flex flex-col px-2 md:px-4 my-2 md:my-4 z-10 contacts min-w-64">
      {portfolio.contacts.map((section) => (
        <div key={`${section.title}`} className="flex flex-col w-60 my-2 pl-2">
          <h5 className="font-semibold text-3xl md:text-4xl m-1 uppercase text-neutral-600">
            {section.title}
          </h5>
          <div className="inline-grid p-1">
            {section.links.map((link) => (
              <LinkArrowOut key={link.name} title={link.name} url={link.url} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * NavToggle component
 * @param {function} toggle - A function to toggle the menu
 */
const NavToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <span className="outline-none border-none cursor-pointer absolute top-1 right-3 bg-transparent flex items-center z-[1001]">
      <Hamburger onToggle={toggle} color="white" direction="right" />
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
            "ul",
            { y: 0 },
            { ease: "easeOut", duration: 0.7, delay: 0.3, at: "-0.1" },
          ],
          [
            "li",
            { x: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { delay: 0.05, ease: "easeInOut", duration: 0.3, at: "-0.1" },
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
          ["li", { x: -100, opacity: 0, filter: BLUR_EFFECT }, { at: "-0.1" }],
          ["ul", { y: -100 }, { at: "-0.1", ease: "easeIn", duration: 0.5 }],
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
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      className="fixed top-0 right-0 z-[100] bg-transparent"
    >
      <NavToggle toggle={toggleMenu} />
      <motion.div
        variants={{
          closed: {
            opacity: 0,
            display: "none",
            filter: BLUR_EFFECT,
          },
          open: { opacity: 1, display: "flex", filter: BLUR_EFFECT_EXIT },
        }}
        transition={{
          duration: 0.75,
          ease: "easeOut",
          delay: 0.25,
        }}
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-end justify-center"
        ref={menuAnimationScope}
      >
        <Squares
          direction="diagonal"
          speed={0.1}
          squareSize={40}
          hoverFillColor="rgba(255, 255, 255, 0.1)"
          borderColor="rgba(255, 255, 255, 0.1)"
          className="absolute top-0 left-0 w-full h-full overflow-hidden bg-neutral-950"
        />
        <div className="flex flex-wrap w-full h-4/5 sm:h-3/5 justify-around items-center content-end">
          <Nav />
          <Contacts />
        </div>

        <div className="flex flex-col items-center justify-end h-1/5 sm:h-2/5 w-screen py-2 social">
          <MagneticSocialLinks />
        </div>
      </motion.div>
    </motion.nav>
  );
}
