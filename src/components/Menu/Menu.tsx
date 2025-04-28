import { motion, useAnimate, useCycle } from "framer-motion";
import { useEffect } from "react";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";

import Contact from "~/components/Contact/Contact";
import { MagneticSocialLinks } from "~/components/motion/FloatingDock";
import Squares from "~/components/motion/Squares";

/**
 * Background component
 * @returns {JSX.Element}
 */
function Background(): JSX.Element {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden bg-neutral-900">
      <Squares
        direction="diagonal"
        speed={0.2}
        squareSize={50}
        borderColor="#222"
        hoverFillColor="#222"
      />
    </div>
  );
}

/**
 * Nav component
 * @returns {JSX.Element}
 */
export function Nav(): JSX.Element {
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
            className="text-3xl sm:text-4xl uppercase text-neutral-200 hover:text-neutral-50 transition-all duration-200 ease-in-out"
          >
            {title}
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * NavToggle component
 * @param {function} toggle - A function to toggle the menu
 * @returns {JSX.Element}
 */
const NavToggle = ({ toggle }: { toggle: () => void }): JSX.Element => {
  return (
    <motion.button
      onClick={toggle}
      className="outline-none border-none cursor-pointer absolute top-1 right-3 bg-transparent flex items-center z-[1001]"
    >
      <motion.span
        variants={{
          closed: { display: "contents" },
          open: { display: "none" },
        }}
      >
        MENU <TfiLineDouble className="px-2 text-5xl" />
      </motion.span>
      <motion.span
        variants={{
          closed: { display: "none" },
          open: { display: "contents" },
        }}
      >
        CLOSE <TfiClose className="px-2 text-5xl" />
      </motion.span>
    </motion.button>
  );
};

const BLUR_EFFECT = "blur(10px)";
const BLUR_EFFECT_EXIT = "blur(0px)";

/**
 * useMenuAnimation hook
 * @param {boolean} isOpen - A boolean value indicating whether the menu is open or closed
 * @returns {any} - An array containing the scope and animate functions
 */
function useMenuAnimation(isOpen: boolean): any {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const animations: any = isOpen
      ? [
          ["ul", { y: 0 }, { ease: "easeOut", duration: 0.7, at: "-0.1" }],
          [
            "li",
            { x: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { delay: 0.05, at: "-0.1" },
          ],
          [
            ".contacts",
            { x: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { ease: "easeInOut", duration: 0.4 },
          ],
          [
            ".social",
            { y: 0, opacity: 1, filter: BLUR_EFFECT_EXIT },
            { ease: "easeInOut", duration: 0.4 },
          ],
        ]
      : [
          [
            ".social",
            { y: 200, filter: BLUR_EFFECT },
            { ease: "easeInOut", duration: 0.3 },
          ],
          [
            ".contacts",
            { x: 100, opacity: 0, filter: BLUR_EFFECT },
            { ease: "easeInOut", duration: 0.3, at: "-0.1" },
          ],
          ["li", { x: -100, opacity: 0, filter: BLUR_EFFECT }, { at: "-0.1" }],
          ["ul", { y: -100 }, { at: "-0.1" }],
        ];

    animate(animations);
  }, [isOpen, animate]);

  return scope;
}
/**
 * Menu component
 * @returns {JSX.Element}
 */
export default function Menu(): JSX.Element {
  const [isMenuOpen, toggleMenu] = useCycle(false, true);
  const menuAnimationScope = useMenuAnimation(isMenuOpen);

  return (
    <motion.nav
      layout
      initial={false}
      animate={isMenuOpen ? "open" : "closed"}
      className="fixed top-0 right-0 z-[100] bg-transparent"
    >
      <NavToggle toggle={toggleMenu} />
      <motion.div
        layout
        variants={{
          closed: {
            opacity: 0,
            display: "none",
            filter: "blur(10px)",
          },
          open: { opacity: 1, display: "flex", filter: "blur(0px)" },
        }}
        transition={{
          duration: 0.25,
          ease: [0.08, 0.65, 0.53, 0.96],
          delay: 0.75,
        }}
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-end justify-center"
        ref={menuAnimationScope}
      >
        <Background />
        <div className="flex flex-wrap w-full h-3/5 justify-around items-center content-end">
          <Nav />
          <Contact />
        </div>

        <div className="flex flex-col items-center justify-end min-w-72 h-1/5 py-2 social">
          <MagneticSocialLinks />
        </div>
      </motion.div>
    </motion.nav>
  );
}
