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
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  const willChange = useWillChange();

  useEffect(() => {
    const animation = animate(count, 100, { duration: 3, delay: 0 });
    return animation.stop;
  }, [count]);

  return (
    <motion.div
      layout
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 2,
        delay: 7,
        ease: "anticipate",
      }}
      style={{
        willChange,
        position: "fixed",
        justifyContent: "center",
        background: "#222424",
        transformOrigin: "top",
        display: "flex",
        zIndex: "102",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 1, zIndex: "102" }}
        animate={{ opacity: 0, zIndex: "-100" }}
        transition={{
          duration: 1,
          delay: 3,
          ease: "circIn",
        }}
        layout
        style={{
          willChange,
          alignSelf: "center",
          mixBlendMode: "difference",
        }}
      >
        <motion.span>{rounded}</motion.span>
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
          willChange,
          position: "fixed",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        <Logo light size="400px" />
      </motion.div>
    </motion.div>
  );
};

export default Header;
