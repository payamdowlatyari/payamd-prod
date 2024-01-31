import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";

const Education = () => {
  return (
    <div style={{ padding: "1em" }}>
      <h3>Education</h3>
      {education?.map((item) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
};

export default Education;
