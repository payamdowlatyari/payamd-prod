import { Text, Box, Spacer, Flex } from "@chakra-ui/react";
import { publication } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Publications = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1300, 1600], [0, 1]);
  const y = useTransform(scrollY, [1300, 1600], [100, 0]);
  const scale = useTransform(scrollY, [1200, 1700], [1, 0.6]);

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
          width: "500px",
          minWidth: "300px",
          backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
          willChange,
          opacity,
          y,
        }}
      >
        {publication?.map((item) => {
          return (
            <>
              <Flex p={4}>
                <Box>
                  <HoverLink title={item.title} url={item.link} out />
                </Box>
                <Spacer />
                <Text fontSize="xs">{item.date}</Text>
              </Flex>

              <Box px={4}>
                <Text fontSize="xs">{item.description}</Text>
              </Box>
            </>
          );
        })}
      </motion.div>
      <motion.div
        layout
        style={{
          willChange,
          scale,
        }}
      >
        <h1>Publications</h1>
      </motion.div>
    </motion.div>
  );
};

export default Publications;
