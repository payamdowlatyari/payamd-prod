import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  useWillChange,
} from "framer-motion";
import { useEffect } from "react";

import Logo from "../components/motion/Menu/Logo";

const Header = () => {
  const countValue = useMotionValue(0);
  const roundedCount = useTransform(countValue, Math.round);
  const willChangeValue = useWillChange();

  useEffect(() => {
    const countAnimation = animate(countValue, 100, { duration: 3, delay: 0 });
    return () => countAnimation.stop();
  }, [countValue]);

  return (
    <motion.div
      layout
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 2,
        delay: 7,
        ease: "circInOut",
      }}
      style={{
        willChange: willChangeValue,
      }}
      className="fixed flex justify-center bg-neutral-950 top-0 left-0 w-full h-full origin-top z-[102]"
    >
      <motion.div
        initial={{ opacity: 1, zIndex: "102" }}
        animate={{ opacity: 0, zIndex: "-100" }}
        transition={{
          duration: 1,
          delay: 3,
          ease: "anticipate",
        }}
        layout
        style={{
          willChange: willChangeValue,
        }}
        className="self-center mix-blend-difference"
      >
        <motion.span>{roundedCount}</motion.span>
        <span>%</span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 2, ease: "easeIn", delay: 4 },
        }}
        layout
        style={{
          willChange: willChangeValue,
        }}
        className="self-center text-center fixed"
      >
        <Logo light size={100} />
      </motion.div>
    </motion.div>
  );
};

export default Header;
