import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect } from "react";

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
      initial={{ scale: 1, zIndex: "100", background: "#1e2125" }}
      animate={{ scale: 0, zIndex: "-100", background: "#e1e1e1" }}
      exit={{ scale: 1, transition: { duration: 2, ease: "circOut" } }}
      transition={{
        duration: 3,
        delay: 5,
        ease: "circIn",
      }}
      style={{
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
        layout
        style={{
          alignSelf: "center",
          fontSize: "10em",
        }}
      >
        {rounded}
      </motion.div>
    </motion.div>
  );
};

export default Header;
