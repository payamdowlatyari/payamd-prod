import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Certificates = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1200, 1500], [0, 1]);
  const y = useTransform(scrollY, [1200, 1500], [100, 0]);
  const scale = useTransform(scrollY, [1100, 1600], [1, 0.6]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        margin: "2em 0",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        willChange,
      }}
      ref={ref}
    >
      <motion.div
        layout
        style={{
          willChange,
          scale,
        }}
      >
        <h1>Certificates</h1>
      </motion.div>
      <motion.div
        layout
        style={{
          width: "500px",
          minWidth: "300px",
          willChange,
          opacity,
          y,
        }}
      >
        {certificate?.map((item) => {
          return (
            <>
              <Flex p={4}>
                <Box>
                  <HoverLink title={item.major} url={item.link} out />
                  <Text fontSize="sm" pl={2}>
                    {item.school}
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Text fontSize="xs">{item.date}</Text>
                </Box>
              </Flex>
              <Text px={6} fontSize="xs">
                {item.description}
              </Text>
            </>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default Certificates;
