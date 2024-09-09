import {
  easeIn,
  easeOut,
  motion,
  stagger,
  useAnimate,
  useCycle,
  useWillChange,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";

import Contact from "../../Sections/Contact/ContactDetails";
import { Social } from "../../Sections/Contact/Social";

import Nav from "./Nav";

const NavToggle = ({ toggle }: any) => {
  return (
    <motion.button
      onClick={toggle}
      layout
      className="outline-[none] border-[none] cursor-pointer [position:inherit] top-[5px] right-[15px] bg-transparent flex items-center z-[101]"
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

function useMenuAnimation(isOpen: boolean) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations: any = isOpen
      ? [
          [
            "ul",
            { transform: "translateX(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.8 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
          [
            ".contacts",
            { opacity: 1, filter: "blur(0px)" },
            { ease: easeIn, duration: 1 },
          ],
          [
            ".social",
            { opacity: 1, y: 0 },
            { ease: easeIn, duration: 1, delay: 0.75 },
          ],
        ]
      : [
          [
            ".social",
            { opacity: 0, y: 10 },
            { ease: easeOut, duration: 1, delay: 0.75 },
          ],
          [
            ".contacts",
            { opacity: 0, filter: "blur(10px)" },
            { ease: easeOut, duration: 1 },
          ],
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["ul", { transform: "translateX(-100%)" }, { at: "-0.1" }],
        ];

    animate([...menuAnimations]);
  }, [isOpen, animate]);

  return scope;
}

export default function Menu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const willChange = useWillChange();
  const scope = useMenuAnimation(isOpen);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      style={{
        willChange,
      }}
      className={`fixed top-0 left-0 z-[100] ${isOpen ? "bg-black" : "bg-transparent"}`}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        style={{
          willChange,
          display: isOpen ? "flex" : "none",
        }}
        className="flex flex-wrap w-screen h-screen bg-black bg-grid-white/[0.1] relative items-end justify-center"
        ref={scope}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="flex flex-wrap w-full h-[75vh] justify-around items-center content-end">
          <Nav />
          <Contact />
        </div>

        <div className="m-auto h-[25vh]">
          <Social />
        </div>
      </motion.div>
    </motion.nav>
  );
}
