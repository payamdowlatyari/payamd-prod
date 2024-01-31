import { Text, Flex, Box, Spacer } from "@chakra-ui/react";
import { certificate } from "./data";
import Link from "next/link";

const Certificates = () => {
  return (
    <div style={{ padding: "1em" }}>
      <h3>Certificates</h3>
      {certificate?.map((item) => {
        return (
          <>
            <Flex pt={2}>
              <Box>
                <Link href={item.link} className="underlined underlinedThin">
                  <b>{item.major}</b> <b>{item.school}</b>
                </Link>
              </Box>
              <Spacer />
              <Box>
                <Text fontSize="xs">{item.date}</Text>
              </Box>{" "}
            </Flex>
            <Text pl={2} fontSize="sm">
              {item.description}
            </Text>
          </>
        );
      })}
    </div>
  );
};

export default Certificates;
