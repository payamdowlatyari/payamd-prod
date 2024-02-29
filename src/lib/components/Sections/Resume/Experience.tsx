import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [300, 700], [0, 1]);
  const y = useTransform(scrollY, [300, 700], [300, 0]);
  const rotate = useTransform(scrollY, [300, 800], [90, 0]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        margin: "1em 0",
        willChange,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
      ref={ref}
    >
      <motion.h3
        layout
        style={{
          willChange,
          rotate,
          opacity,
        }}
      >
        Experience
      </motion.h3>
      <motion.div
        className="second"
        layout
        style={{
          willChange,
          y,
          opacity,
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
  );
};

export default Experience;
