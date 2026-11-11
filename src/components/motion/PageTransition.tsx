"use client";

import { motion, useReducedMotion } from "motion/react";

/** A short page fade that keeps fixed and sticky descendants in place. */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: reduceMotion ? 0 : 0.2 },
      }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
