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
    const animation = animate(count, 100, { duration: 4, delay: 0 });

    return animation.stop;
  }, [count]);

  return (
    <motion.div
      layout
      initial={{ scaleY: 1, scaleX: 1 }}
      animate={{ scaleY: 0, scaleX: 0 }}
      transition={{
        duration: 2,
        delay: 9,
        ease: "anticipate",
      }}
      style={{
        willChange,
        position: "fixed",
        justifyContent: "center",
        background: "#111",
        transformOrigin: "top left",
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
          delay: 5,
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
      <motion.span
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{
          duration: 1,
          delay: 5,
          ease: "linear",
        }}
        layout
        style={{
          willChange,
          height: "100%",
          width: `1%`,
          scaleX: rounded,
          background: "#fff",
          mixBlendMode: "difference",
          transformOrigin: "0%",
          position: "fixed",
          left: "0",
          bottom: "0",
        }}
      />
      <motion.div
        layout
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 0 }}
        transition={{
          duration: 3,
          delay: 5,
          ease: "circInOut",
        }}
        style={{
          willChange,
          position: "fixed",
          alignSelf: "center",
          textAlign: "center",
        }}
      >
        <Logo size="400px" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 1, ease: "easeOut", delay: 7.5 },
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
