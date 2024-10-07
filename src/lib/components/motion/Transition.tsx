"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export const Transition = () => {
  const ref = useRef(null);
  return (
    <motion.div
      initial={{ y: "0%", opacity: 1 }}
      animate={{ y: "-100%", opacity: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black z-[1000] pointer-events-none"
      ref={ref}
    />
  );
};
