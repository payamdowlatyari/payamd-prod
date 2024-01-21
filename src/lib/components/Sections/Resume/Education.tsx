import { CheckIcon } from "@chakra-ui/icons";
import {
  Flex,
  Spacer,
  List,
  ListItem,
  ListIcon,
  Box,
  Text,
} from "@chakra-ui/react";

const Education = () => {
  return (
    <>
      <Flex p={1}>
        <Box p={1}>
          <Text>
            <b>UC Irvine</b>, <i>Software Engineering B.S.</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={2}>
          <Text fontSize="xs">Class 2020</Text>
        </Box>{" "}
      </Flex>
      <List pb={4}>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Capstone: Grid-Level Energy Negotiation for EVSE
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Research Area: Informatics and Human-Computer Interaction
        </ListItem>
        <ListItem fontSize="sm">
          <ListIcon as={CheckIcon} />
          Honor Society: National Society of Leadership and Success (ΣAπ)
        </ListItem>
      </List>
    </>
  );
};

export default Education;
