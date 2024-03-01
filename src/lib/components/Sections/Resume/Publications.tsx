import { Text, Box, Spacer, Flex } from "@chakra-ui/react";
import { publication } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Publications = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [3300, 3800], ["-100%", "0%"]);
  const y = useTransform(scrollY, [3900, 4900], [0, 1000]);

  return (
    <motion.div
      layout
      style={{
        margin: "2em 0",
        willChange,
      }}
      ref={ref}
    >
      <motion.div
        className="second"
        style={{
          padding: "0.5em",
          willChange,
          x,
          y,
          height: "100vh",
          alignItems: "center",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        <motion.h3
          layout
          style={{
            willChange,
          }}
        >
          Publications
        </motion.h3>
        <motion.div
          layout
          style={{
            width: "500px",
            minWidth: "300px",
            borderRadius: "5px",
            willChange,
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
      </motion.div>
    </motion.div>
  );
};

export default Publications;
