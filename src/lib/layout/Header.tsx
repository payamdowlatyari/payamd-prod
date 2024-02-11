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
      initial={{ opacity: 1, zIndex: "100" }}
      animate={{ opacity: 0, zIndex: "-100" }}
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
          color: "#c2a76b",
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
          background: "#c2a76b",
          transformOrigin: "0%",
          position: "fixed",
          left: "0",
          bottom: "0",
        }}
      />
      <motion.div
        className="third"
        initial={{ scaleY: 0 }}
        animate={{
          scaleY: 1,
          transition: { duration: 0.5, ease: "circOut", delay: 10 },
        }}
        exit={{ scaleY: 0, transition: { duration: 0.5, ease: "circIn" } }}
        layout
        style={{
          willChange,
          height: "100vh",
          width: "45vw",
          transformOrigin: "0%",
          position: "fixed",
          right: "0",
          top: "0",
        }}
      />
      <motion.div
        className="third"
        initial={{ scaleX: 0 }}
        animate={{
          scaleX: 1,
          transition: { duration: 0.5, ease: "circOut", delay: 10.5 },
        }}
        exit={{ scaleX: 0, transition: { duration: 0.5, ease: "circIn" } }}
        layout
        style={{
          willChange,
          height: "100vh",
          width: "55vw",
          transformOrigin: "0%",
          position: "fixed",
          left: "0",
          top: "0",
        }}
      />
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        exit={{ opacity: 0 }}
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
