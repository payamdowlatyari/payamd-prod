/* eslint-disable sonarjs/no-duplicate-string */
import { motion, useAnimate, useCycle } from "framer-motion";
import { useEffect } from "react";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";

import Contact from "../../Sections/Contact/ContactDetails";
import { MagneticSocialLinks } from "../FloatingDock";
import { Squares } from "../Squares";

import { Nav } from "./Nav";

/**
 * NavToggle component
 * @param {function} toggle - A function to toggle the menu
 * @returns {JSX.Element}
 */
const NavToggle = ({ toggle }: { toggle: () => void }): JSX.Element => {
  return (
    <motion.button
      onClick={toggle}
      layout
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

/**
 * useMenuAnimation hook
 * @param {boolean} isOpen - A boolean value indicating whether the menu is open or closed
 * @returns {any} - An array containing the scope and animate functions
 */
function useMenuAnimation(isOpen: boolean): any {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const blurEffect = "blur(10px)";
    const animations: any = isOpen
      ? [
          ["ul", { y: 0 }, { ease: "easeOut", duration: 0.7, at: "-0.1" }],
          [
            "li",
            { x: 0, opacity: 1, filter: "blur(0px)" },
            { delay: 0.05, at: "-0.1" },
          ],
          [
            ".contacts",
            { x: 0, opacity: 1, filter: "blur(0px)" },
            { ease: "easeInOut", duration: 0.4 },
          ],
          [
            ".social",
            { y: 0, opacity: 1, filter: "blur(0px)" },
            { ease: "easeInOut", duration: 0.4 },
          ],
        ]
      : [
          [
            ".social",
            { y: 200, filter: blurEffect },
            { ease: "easeInOut", duration: 0.3 },
          ],
          [
            ".contacts",
            { x: 100, opacity: 0, filter: blurEffect },
            { ease: "easeInOut", duration: 0.3, at: "-0.1" },
          ],
          ["li", { x: -100, opacity: 0, filter: blurEffect }, { at: "-0.1" }],
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
  const [isOpen, toggleOpen] = useCycle(false, true);
  const scope = useMenuAnimation(isOpen);

  return (
    <motion.nav
      layout
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="fixed top-0 right-0 z-[100] bg-transparent"
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        variants={{
          closed: {
            opacity: 0,
            display: "none",
            filter: "blur(10px)",
          },
          open: { opacity: 1, display: "flex", filter: "blur(0px)" },
          exit: { opacity: 0, display: "none", filter: "blur(10px)" },
          initial: { opacity: 0, display: "none", filter: "blur(10px)" },
          animate: { opacity: 1, display: "flex", filter: "blur(0px)" },
        }}
        transition={{
          duration: 0.25,
          ease: [0.08, 0.65, 0.53, 0.96],
          delay: 0.75,
        }}
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-end justify-center"
        ref={scope}
      >
        <div className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden bg-neutral-900">
          <Squares
            direction="diagonal"
            speed={0.2}
            squareSize={50}
            borderColor="#222"
            hoverFillColor="#222"
          />
        </div>
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
