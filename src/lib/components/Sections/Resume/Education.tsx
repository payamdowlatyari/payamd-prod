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

const Education = () => {
  return (
    <>
      <Flex>
        <Box p={1}>
          <Text p={1}>
            <b>UC Irvine</b>, <i>Software Engineering B.S.</i>
          </Text>{" "}
        </Box>
        <Spacer />
        <Box p={1}>
          <Tag>Class 2020</Tag>
        </Box>{" "}
      </Flex>
      <List>
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
