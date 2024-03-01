import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { useRef } from "react";
import { motion, useScroll, useTransform, useWillChange } from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });

  const x = useTransform(scrollY, [1300, 1800], ["-100%", "0%"]);
  const y = useTransform(scrollY, [1900, 4900], [0, 3000]);

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
          Education
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
      </motion.div>
    </motion.div>
  );
};

export default Education;
