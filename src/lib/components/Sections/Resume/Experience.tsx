import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";
import { experience } from "./data";
import { FcBriefcase } from "react-icons/fc";

const Experience = () => {
  return (
    <div className="resume-section">
      <div className="resume-header">
        <FcBriefcase />
      </div>
      <div className="resume-body">
        <div className="resume-title">
          <h3>Experience</h3>
        </div>
        <div className="resume-content second">
          {experience?.map((item) => {
            return (
              <>
                <Flex px={4} pt={4}>
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
    </div>
  );
};

export default Experience;
