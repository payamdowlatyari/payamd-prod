import { useEffect, useRef } from "react";
import {
  easeIn,
  easeOut,
  motion,
  stagger,
  useAnimate,
  useCycle,
  useWillChange,
} from "framer-motion";
import { TfiClose, TfiLineDouble } from "react-icons/tfi";
import TopNav from "./TopNav";

const NavToggle = ({ toggle }: any) => {
  return (
    <motion.button onClick={toggle} layout>
      <motion.span
        variants={{
          closed: { display: "contents" },
          open: { display: "none" },
        }}
      >
        MENU <TfiLineDouble />
      </motion.span>
      <motion.span
        variants={{
          closed: { display: "none" },
          open: { display: "contents" },
        }}
      >
        CLOSE <TfiClose />
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
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.6 },
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
        ]
      : [
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
        background: isOpen ? "#222424" : "transparent",
      }}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        layout
        style={{
          willChange,
          display: isOpen ? "flex" : "none",
        }}
        className="main-nav"
        ref={scope}
      >
        <TopNav />
      </motion.div>
    </motion.nav>
  );
}
