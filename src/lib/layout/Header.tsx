import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";
import Logo from "../components/motion/Menu/Logo";

const Header = () => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const animation = animate(count, 100, { duration: 4, delay: 1 });

    return animation.stop;
  }, [count]);

  return (
    <motion.div
      layout
      initial={{ scale: 1 }}
      animate={{ scale: 0, background: "#e1e1e1" }}
      transition={{
        duration: 3,
        delay: 12,
        ease: "circOut",
      }}
      style={{
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
          alignSelf: "center",
          fontSize: "10em",
        }}
      >
        {rounded}
      </motion.div>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1, rotate: 360 }}
        transition={{
          duration: 3,
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
