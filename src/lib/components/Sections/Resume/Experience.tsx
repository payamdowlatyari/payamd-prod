import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [1000, 5000], [0, 4000]);
  const x = useTransform(scrollY, [300, 800], ["-100%", "0%"]);

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
          Experience
        </motion.h3>
        <motion.div
          layout
          style={{
            willChange,
            width: "500px",
            minWidth: "300px",
            borderRadius: "5px",
          }}
        >
          {experience?.map((item) => {
            return (
              <>
                <Flex pt={4} px={4}>
                  <Box>
                    <Text>
                      <b>{item.title}</b>, <i>{item.company}</i>
                    </Text>{" "}
                  </Box>
                  <Spacer />
                  <Box>
                    <Text fontSize="xs">{item.date}</Text>
                  </Box>{" "}
                </Flex>
                <List px={6} pb={4}>
                  {item.description?.map((desc) => {
                    return <ListItem fontSize="xs">{desc}</ListItem>;
                  })}
                </List>
              </>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Experience;
