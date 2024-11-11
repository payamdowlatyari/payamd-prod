import {
  motion,
  stagger,
  useAnimate,
  useCycle,
  useWillChange,
} from "framer-motion";
import { useEffect, useRef } from "react";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";

import Contact from "../../Sections/Contact/ContactDetails";
import { DockDemo } from "../FloatingDock";

import Nav from "./Nav";

const NavToggle = ({ toggle }: { toggle: () => void }) => {
  return (
    <motion.button
      onClick={toggle}
      layout
      className="outline-none border-none cursor-pointer absolute top-1 right-3 bg-transparent flex items-center z-[101]"
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
            { transform: "translateY(0%)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5 },
          ],
          [
            "li",
            { transform: "translateX(0%)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
          [
            ".contacts",
            { opacity: 1, transform: "translateX(0%)", filter: "blur(0px)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5 },
          ],
          [
            ".social",
            { opacity: 1, transform: "translateY(0%)", filter: "blur(0px)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.5 },
          ],
        ]
      : [
          [".social", { opacity: 0, transform: "translateY(100%)" }],
          [
            ".contacts",
            { opacity: 0, transform: "translateX(100%)", filter: "blur(10px)" },
          ],
          [
            "li",
            {
              transform: "translateX(-100%)",
              opacity: 0,
              filter: "blur(10px)",
            },
          ],
          ["ul", { transform: "translateY(-100%)" }, { at: "-0.1" }],
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
      layout
      initial={false}
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      style={{
        willChange,
      }}
      className="fixed top-0 right-0 z-[100] bg-transparent"
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        style={{
          willChange,
        }}
        variants={{
          closed: { opacity: 0, display: "none" },
          open: { opacity: 1, display: "flex" },
        }}
        transition={{ duration: 0.5, ease: [0.08, 0.65, 0.53, 0.96] }}
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-end justify-center"
        ref={scope}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]" />
        <div className="flex flex-wrap w-full h-[80vh] md:h-[70vh] justify-around items-center content-end">
          <Nav />
          <Contact />
        </div>
        <div className="m-auto h-[20vh] md:h-[30vh] z-10">
          <div className="flex flex-col items-center justify-center h-full w-full py-2 social">
            <DockDemo />
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
