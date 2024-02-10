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
    const animation = animate(count, 100, { duration: 4, delay: 1 });

    return animation.stop;
  }, [count]);

  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ zIndex: "-100", transition: { duration: 1 } }}
      transition={{
        duration: 2,
        delay: 12,
        ease: "circOut",
      }}
      style={{
        willChange,
        background: "#111",
        position: "fixed",
        justifyContent: "center",
        display: "flex",
        top: "0",
        zIndex: "100",
        left: "0",
        width: "100%",
        height: "100%",
      }}
    >
      <motion.div
        initial={{ opacity: 1, zIndex: "100" }}
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
          fontSize: "5em",
          color: "#e1e1e1",
        }}
      >
        {rounded}
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
          height: "20px",
          width: `1%`,
          scaleX: rounded,
          background: "#e1e1e1",
          transformOrigin: "0%",
          position: "fixed",
          left: "0",
          bottom: "0",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: 1,
          transition: { duration: 0.5, ease: "circOut", delay: 10 },
        }}
        exit={{ scaleX: 0, transition: { duration: 0.5, ease: "circIn" } }}
        layout
        style={{
          willChange,
          height: "50vh",
          width: "100vw",
          background: "#e1e1e1",
          transformOrigin: "0%",
          position: "fixed",
          left: "0",
          bottom: "0",
        }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: 1,
          transition: { duration: 0.5, ease: "circOut", delay: 10.5 },
        }}
        exit={{ scaleX: 0, transition: { duration: 0.5, ease: "circIn" } }}
        layout
        style={{
          willChange,
          height: "50vh",
          width: "100vw",
          background: "#e1e1e1",
          transformOrigin: "0%",
          position: "fixed",
          right: "0",
          top: "0",
        }}
      />
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{
          duration: 2,
          delay: 6,
          ease: "circOut",
        }}
        style={{
          position: "fixed",
          alignSelf: "center",
          textAlign: "center",
          width: "400px",
        }}
      >
        <Logo light />
      </motion.div>
    </motion.div>
  );
};

export default Header;
