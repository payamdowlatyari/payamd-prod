import { Text, Box } from "@chakra-ui/react";
import { publication } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Publications = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(
    scrollY,
    [1400, 1500, 2000, 2100],
    [0.5, 1, 1, 1]
  );

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
        opacity,
      }}
      ref={ref}
    >
      <h5>Publications</h5>
      {publication?.map((item) => {
        return (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <Box>
              <HoverLink title={item.title} url={item.link} out />
              <Text fontSize="xs" pl={1}>
                {item.description}
              </Text>
            </Box>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Publications;
