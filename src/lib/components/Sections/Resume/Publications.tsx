import { Text, Box } from "@chakra-ui/react";
import { publication } from "./data";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";

const Publications = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
      }}
      ref={ref}
    >
      <h3>Publications</h3>
      {publication?.map((item) => {
        return (
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
                style={{
                  willChange,
                }}
              >
                <Box pt={2}>
                  <Link href={item.link} className="underlined underlinedThin">
                    <b>{item.title}</b>{" "}
                    <FiArrowUpRight style={{ display: "inline" }} />
                  </Link>
                  <Text fontSize="sm" pl={2}>
                    {item.description}
                  </Text>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

export default Publications;
