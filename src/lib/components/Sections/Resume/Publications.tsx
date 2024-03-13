import { Text, Box, Spacer, Flex } from "@chakra-ui/react";
import { publication } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { FcNews } from "react-icons/fc";

const Publications = () => {
  return (
    <div className="resume-section">
      <div className="resume-header">
        <FcNews />
      </div>
      <h3>Publications</h3>
      <div className="resume-content">
        {publication?.map((item) => {
          return (
            <>
              <Flex p={2}>
                <Box>
                  <HoverLink title={item.title} url={item.link} out />
                </Box>
                <Spacer />
                <Text fontSize="xs">{item.date}</Text>
              </Flex>

              <Box px={4}>
                <Text fontSize="xs">{item.description}</Text>
              </Box>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Publications;
