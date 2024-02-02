import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";

const Certificates = () => {
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
      <h3>Certificates</h3>
      {certificate?.map((item) => {
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
                <Flex pt={2}>
                  <Box>
                    <Link
                      href={item.link}
                      className="underlined underlinedThin"
                    >
                      <b>{item.major}</b> <b>{item.school}</b>{" "}
                      <FiArrowUpRight style={{ display: "inline" }} />
                    </Link>
                  </Box>
                  <Spacer />
                  <Box>
                    <Text fontSize="xs">{item.date}</Text>
                  </Box>{" "}
                </Flex>
                <Text pl={2} fontSize="sm">
                  {item.description}
                </Text>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

export default Certificates;
