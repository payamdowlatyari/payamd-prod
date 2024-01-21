import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      layout
      initial={{ scaleX: "100%", scaleY: "100%", zIndex: "100" }}
      animate={{ scaleX: "0", scaleY: "0", zIndex: "-100" }}
      transition={{
        duration: 2,
        delay: 5,
        ease: "easeOut",
        transitionEnd: {
          display: "none",
        },
      }}
      style={{
        background: "#1e2125",
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
          width: "50px",
          height: "50px",
          background: "#e17a47",
        }}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
    </motion.div>
  );
};

export default Header;
