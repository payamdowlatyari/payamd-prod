"use client";

import { CheckIcon } from "@chakra-ui/icons";
import {
  Flex,
  Spacer,
  Tag,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
} from "@chakra-ui/react";

const Experience = () => {
  return (
    <>
      <Flex>
        <Box p={1}>
          <Text p={1}>
            <b>Software Engineer</b>, <i>Amplify.ai</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Tag>Dec 2020 - Nov 2023</Tag>
        </Box>{" "}
      </Flex>
      <List>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Design, develop, test, and deploy virtual assistant apps
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Developed 50+ chatbots on various social media platforms
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Created automated tools and services with Jenkins
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Used AWS to maintain the platform and create additional features
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Developed user interfaces using JS frameworks
        </ListItem>
      </List>
      <Flex pt={3}>
        <Box p={1}>
          <Text p={1}>
            <b>Full Stack Web Developer</b>, <i>Freelance</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Tag>Sep 2019 - Present</Tag>
        </Box>{" "}
      </Flex>
      <List>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Design and develop interactive user interfaces
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Create responsive and low-cost business websites
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Develop and deploy server-side web applications
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Design system artitechture for full-stack applications
        </ListItem>
      </List>
    </>
  );
};

export default Experience;
