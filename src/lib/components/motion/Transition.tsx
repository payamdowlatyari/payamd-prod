"use client";

import { motion } from "framer-motion";

export const Transition = () => {
  return (
    <motion.div
      initial={{ y: "0%", opacity: 1 }}
      animate={{ y: "-100%", opacity: 0 }}
      exit={{ y: "0%", opacity: 1 }}
      transition={{ delay: 1, duration: 2, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-black z-[1000] pointer-events-none"
    />
  );
};
