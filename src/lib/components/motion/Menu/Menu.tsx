import { JSX, RefAttributes, useRef } from "react";
import { SVGMotionProps, motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimentions";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Path = (
  props: JSX.IntrinsicAttributes &
    SVGMotionProps<SVGPathElement> &
    RefAttributes<SVGPathElement>
) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="#1e2125"
    strokeLinecap="round"
    {...props}
  />
);

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const itemIds = ["home", "about", "resume", "skills", "projects", "contact"];

const menuVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const Navigation = ({ toggle }: any) => (
  <motion.ul layout variants={variants} onClick={toggle}>
    {itemIds.map((i) => (
      <motion.li variants={menuVariants} key={i}>
        <motion.h2>
          <motion.a className="underlined underlinedThick" href={`#${i}`}>
            {i}
          </motion.a>
        </motion.h2>
      </motion.li>
    ))}
  </motion.ul>
);

const NavToggle = ({ toggle }: any) => {
  return (
    <motion.button onClick={toggle} layout>
      <motion.svg width="40" height="40" viewBox="0 0 30 30">
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5", stroke: "#1e2125" },
            open: { d: "M 3 16.5 L 17 2.5", stroke: "#e9dfce" },
          }}
          transition={{ duration: 0.3 }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.3 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346", stroke: "#1e2125" },
            open: { d: "M 3 2.5 L 17 16.346", stroke: "#e9dfce" },
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.svg>
    </motion.button>
  );
};

export default function Menu() {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      style={{
        background: isOpen ? "#1e2125" : "transparant",
        color: isOpen ? "#e9dfce" : "transparent",
        height: isOpen ? "100vh" : "0",
      }}
    >
      <NavToggle toggle={() => toggleOpen()} />
      <motion.div
        variants={sidebar}
        style={{
          display: isOpen ? "block" : "none",
        }}
      >
        <Navigation toggle={() => toggleOpen()} />
      </motion.div>
    </motion.nav>
  );
}
