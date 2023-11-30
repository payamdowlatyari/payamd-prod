import {
  Heading,
  Grid,
  Text,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Stack,
  Box,
} from "@chakra-ui/react";

const SomeImage = () => {
  return (
    <Grid textAlign="left">
      <Heading as="h1" size="4xl" m={2} color="#4299E1">
        my <br />
        Portfolio
      </Heading>
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
      >
        <CardHeader>
          <Heading size="md">Client Report</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Summary
              </Heading>
              <Text pt="2" fontSize="sm">
                View a summary of all your clients over the last month.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Overview
              </Heading>
              <Text pt="2" fontSize="sm">
                Check out the overview of your clients.
              </Text>
            </Box>
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Analysis
              </Heading>
              <Text pt="2" fontSize="sm">
                See a detailed analysis of all your business clients.
              </Text>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </Grid>
  );
};

export default SomeImage;
