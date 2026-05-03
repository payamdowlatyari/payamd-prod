import { Squeeze as Hamburger } from "hamburger-react";
import { motion, useCycle } from "motion/react";

import { FlipLink } from "~/components/ui/Button";

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
        <span
          key={title}
          className="flex justify-center items-center h-1/4 text-5xl md:text-6xl uppercase bg-neutral-950 text-neutral-100"
        >
          <FlipLink href={url}>{title}</FlipLink>
        </span>
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
    <span className="outline-none border-none cursor-pointer absolute top-1 right-3 bg-transparent flex items-center z-[1003]">
      <Hamburger onToggle={toggle} color="white" />
    </span>
  );
};

/**
 * Menu component
 */
export default function Menu() {
  const [isMenuOpen, toggleMenu] = useCycle(false, true);

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
        className="flex flex-wrap w-screen h-screen bg-neutral-950 relative items-center justify-center"
      >
        <Nav />
      </motion.div>
    </motion.nav>
  );
}
