import { Tooltip } from "@chakra-ui/react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";

const icon = {
  hidden: {
    pathLength: 0,
    fill: "transparent",
  },
  visible: {
    pathLength: 1,
    fill: "currentColor",
  },
};

export default function Icon({ id, title, del }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className="w-[4vw] max-w-12 min-w-8 overflow-visible stroke-neutral-50 stroke-[1] m-2 fill-neutral-50"
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <Tooltip
            hasArrow
            label={title}
            bg="blackAlpha"
            color="white"
            placement="top"
            openDelay={1000}
          >
            <motion.path
              d={id}
              variants={icon}
              initial="hidden"
              animate="visible"
              transition={{
                default: { delay: del, duration: 2, ease: "easeInOut" },
                fill: { duration: 1, ease: [0, 0, 0.8, 1] },
              }}
            />
          </Tooltip>
        )}
      </AnimatePresence>
    </motion.svg>
  );
}
