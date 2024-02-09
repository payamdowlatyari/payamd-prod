import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import { useRef } from "react";

const Experience = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [500, 700], [0, 1]);
  const x = useTransform(scrollY, [500, 700], [300, 0]);
  const scale = useTransform(scrollY, [500, 800], [1, 0.6]);

  return (
    <motion.div
      layout
      style={{
        padding: "0.5em",
        margin: "2em 0",
        willChange,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
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
        <h1>Experience</h1>
      </motion.div>
      <motion.div
        layout
        style={{
          willChange,
          x,
          opacity,
          backgroundImage: "linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)",
          width: "500px",
          minWidth: "300px",
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
