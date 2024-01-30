import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";

const Experience = () => {
  return (
    <>
      <Flex>
        <Box p={1}>
          <Text>
            <b>Software Engineer</b>, <i>Amplify.ai</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Text fontSize="xs">Dec 2020 - Nov 2023</Text>
        </Box>{" "}
      </Flex>
      <List pl={1}>
        <ListItem fontSize="sm">
          Design, develop, test, and deploy virtual assistant apps
        </ListItem>
        <ListItem fontSize="sm">
          Developed 50+ chatbots on various social media platforms
        </ListItem>
        <ListItem fontSize="sm">
          Created automated tools and services with Jenkins
        </ListItem>
        <ListItem fontSize="sm">
          Used AWS to maintain the platform and create additional features
        </ListItem>
        <ListItem fontSize="sm">
          Developed user interfaces using JS frameworks
        </ListItem>
      </List>
      <Flex pt={3}>
        <Box p={1}>
          <Text>
            <b>Full Stack Web Developer</b>, <i>Freelance</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Text fontSize="xs">Sep 2019 - Present</Text>
        </Box>{" "}
      </Flex>
      <List pl={1}>
        <ListItem fontSize="sm">
          Design and develop interactive user interfaces
        </ListItem>
        <ListItem fontSize="sm">
          Create responsive and low-cost business websites
        </ListItem>
        <ListItem fontSize="sm">
          Develop and deploy server-side web applications
        </ListItem>
        <ListItem fontSize="sm">
          Design system artitechture for full-stack applications
        </ListItem>
      </List>
    </>
  );
};

export default Experience;
