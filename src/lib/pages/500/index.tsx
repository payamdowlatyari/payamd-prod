import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Link as ChakraLink,
  useColorMode,
  Flex,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionBox = motion(chakra.div);
/**
 * Page500 component
 * @returns {JSX.Element}
 */
const Page500 = (): JSX.Element => {
  const { colorMode } = useColorMode();

  return (
    <Flex minHeight="70vh" direction="column" justifyContent="center">
      <MotionBox
        animate={{ y: 20 }}
        transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        width={{ base: "100%", sm: "70%", md: "60%" }}
        margin="0 auto"
      >
        <Image
          src="/Under construction-amico.svg"
          alt="Error 500 Illustration"
        />
      </MotionBox>
      <Text textAlign="center" fontSize="xs" color="gray">
        <ChakraLink
          href="https://stories.freepik.com/web"
          isExternal
          rel="noopener noreferrer"
        >
          Illustration by Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center" size="lg">
          Oops! Something went wrong at our end 🙇‍♂️.
        </Heading>

        <Box textAlign="center" marginTop={4}>
          <Button
            as={Link}
            href="/"
            backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            size="sm"
          >
            Let&apos;s Head Back
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};

export default Page500;
