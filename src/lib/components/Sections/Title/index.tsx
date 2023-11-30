import { Grid, Heading, Text } from '@chakra-ui/react';

const Title = () => {
  return (
    <Grid w="100%">
      <Heading as="h1" size="4xl" noOfLines={1}>
        Hi There,
      </Heading>
      <Heading as="h1" size="2xl">
        My name is
      </Heading>
      <Text fontSize="6xl" as="b" color="#ED8936">
        Payam.
      </Text>
      <Text fontSize="s">
        I am a <b>Software Engineer</b> and <b>UX Designer</b> .
      </Text>
    </Grid>
  );
};

export default Title;
