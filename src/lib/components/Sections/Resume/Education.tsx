import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";

const Education = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();

  return (
    <motion.div
      layout
      style={{
        padding: "1em",
        willChange,
      }}
      ref={ref}
    >
      <h3>Education</h3>
      {education?.map((item) => {
        return (
          <AnimatePresence initial={false}>
            {isInView && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.5 * item.index,
                  ease: "easeOut",
                }}
                style={{
                  willChange,
                }}
              >
                <Flex pt={4}>
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
                <List pl={1}>
                  {item.description?.map((desc) => {
                    return <ListItem fontSize="sm">{desc}</ListItem>;
                  })}
                </List>
              </motion.div>
            )}
          </AnimatePresence>
        );
      })}
    </motion.div>
  );
};

export default Education;
