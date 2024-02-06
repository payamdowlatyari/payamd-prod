import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Certificates = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(
    scrollY,
    [1300, 1400, 1800, 1900],
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
      <h5>Certificates</h5>
      {certificate?.map((item) => {
        return (
          <motion.div
            layout
            style={{
              willChange,
            }}
          >
            <Flex pt={1}>
              <Box>
                <HoverLink
                  title={item.major + item.school}
                  url={item.link}
                  out
                />
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{item.date}</Text>
              </Box>
            </Flex>
            <Text pl={1} fontSize="xs">
              {item.description}
            </Text>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default Certificates;
