import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { education } from "./data";
import { FcGraduationCap } from "react-icons/fc";

const Education = () => {
  return (
    <div className="resume-section">
      <div className="resume-header">
        <FcGraduationCap />
      </div>
      <h3>Education</h3>
      <div className="resume-content second">
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
      </div>
    </div>
  );
};

export default Education;
