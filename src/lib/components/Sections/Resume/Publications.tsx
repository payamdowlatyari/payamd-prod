import { Text, Box } from "@chakra-ui/react";
import { publication } from "./data";
import Link from "next/link";

const Publications = () => {
  return (
    <div style={{ padding: "1em" }}>
      <h3>Publications</h3>
      {publication?.map((item) => {
        return (
          <Box pt={2}>
            <Link href={item.link} className="underlined underlinedThin">
              <b>{item.title}</b>{" "}
            </Link>
            <Text fontSize="sm" pl={2}>
              {item.description}
            </Text>
          </Box>
        );
      })}
    </div>
  );
};

export default Publications;
