import { Flex, Spacer, List, ListItem, Box, Text } from "@chakra-ui/react";

const Education = () => {
  return (
    <>
      <Flex>
        <Box p={1}>
          <Text>
            <b>UC Irvine</b>, <i>Software Engineering B.S.</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Text fontSize="xs">Class 2020</Text>
        </Box>{" "}
      </Flex>
      <List pb={4} pl={1}>
        <ListItem fontSize="sm">
          Capstone: Grid-Level Energy Negotiation for EVSE
        </ListItem>
        <ListItem fontSize="sm">
          Research Area: Informatics and Human-Computer Interaction
        </ListItem>
        <ListItem fontSize="sm">
          Honor Society: National Society of Leadership and Success (ΣAπ)
        </ListItem>
      </List>
    </>
  );
};

export default Education;
