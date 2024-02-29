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
  const rotate = useTransform(scrollY, [1200, 1800], [-90, 0]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        margin: "2em 0",
        display: "flex",
        flexWrap: "wrap-reverse",
        justifyContent: "space-evenly",
        willChange,
      }}
      ref={ref}
    >
      <motion.div
        className="second"
        layout
        style={{
          width: "500px",
          minWidth: "300px",
          borderRadius: "5px",
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
      <motion.h3
        layout
        style={{
          willChange,
          rotate,
          opacity,
        }}
      >
        Publications
      </motion.h3>
    </motion.div>
  );
};

export default Publications;
