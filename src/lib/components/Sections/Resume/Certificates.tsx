import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import HoverLink from "../../motion/View/HoverLink";
import { FcDiploma2 } from "react-icons/fc";

const Certificates = () => {
  return (
    <div className="resume-section">
      <div className="resume-header">
        <FcDiploma2 />
      </div>
      <h3>Certificates</h3>
      <div className="resume-content">
        {certificate?.map((item) => {
          return (
            <>
              <Flex p={4}>
                <Box>
                  <HoverLink title={item.major} url={item.link} out />
                  <Text fontSize="sm" pl={2}>
                    {item.school}
                  </Text>
                </Box>
                <Spacer />
                <Box>
                  <Text fontSize="xs">{item.date}</Text>
                </Box>
              </Flex>
              <Text px={6} fontSize="xs">
                {item.description}
              </Text>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Certificates;
