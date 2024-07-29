"use client";

import { motion, useIsPresent } from "framer-motion";
import { useRef } from "react";

export const InitialTransition = () => {
  const ref = useRef(null);
  const isPresent = useIsPresent();
  return (
    <motion.div
      initial={{ opacity: 1, zIndex: 3 }}
      animate={{
        opacity: 0,
        zIndex: 1,
        transition: { duration: 2, delay: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, zIndex: 0, transition: { duration: 0.5 } }}
      style={{ originY: isPresent ? 0 : 1 }}
      className="fixed top-0 left-0 right-0 bottom-0 bg-neutral-950"
      ref={ref}
    />
  );
};
