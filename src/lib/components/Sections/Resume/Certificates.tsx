import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import HoverLink from "../../motion/View/HoverLink";

const Certificates = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const x = useTransform(scrollY, [2300, 2800], ["-100%", "0%"]);
  const y = useTransform(scrollY, [2900, 4900], [0, 2000]);

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
        <motion.div
          layout
          style={{
            willChange,
          }}
        >
          <motion.h3>Certificates</motion.h3>
        </motion.div>
        <motion.div
          layout
          style={{
            width: "500px",
            minWidth: "300px",
            borderRadius: "5px",
            willChange,
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
    </motion.div>
  );
};

export default Certificates;
