import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1100, 1400], [0, 1]);

  const x = useTransform(scrollY, [1100, 1400], [-200, 0]);
  const scale = useTransform(scrollY, [900, 1500], [1, 0.6]);

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
          x,
        }}
      >
        {education?.map((item) => {
          return (
            <>
              <Flex px={4} pt={4}>
                <Box>
                  <Text>
                    <b>{item.school}</b>, <i>{item.major}</i>
                  </Text>{" "}
                </Box>
                <Spacer />
                <Box>
                  <Text fontSize="xs">{item.date}</Text>
                </Box>{" "}
              </Flex>
              <List px={4} pb={4}>
                {item.description?.map((desc) => {
                  return <ListItem fontSize="xs">{desc}</ListItem>;
                })}
              </List>
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
        <h1>Education</h1>
      </motion.div>
    </motion.div>
  );
};

export default Education;
