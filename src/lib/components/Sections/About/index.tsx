import { Grid, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Grid textAlign="left">
      <Heading as="h1" size="3xl" m={2} color="#F56565">
        About <br />
        me
      </Heading>
      <Text m={2} fontSize="xl">
        My name is <b>Payam Dowlatyari</b>.
      </Text>
      <Text m={2} fontSize="md">
        I am a software engineer, UX designer, photographer, and blogger. I
        studied Software Engineering at UC Irvine and graduated in 2020. I have
        been working in Silicon Valley as a full-stack web developer since then
        with focus on the design and implementation of user interfaces using
        JavaScript-based frameworks and libraries. I am interested in reading
        books on varius topics such as psychology, sociology, philosophy,
        history, and enjoy cycling and taking photographs.
      </Text>
    </Grid>
  );
};

export default About;
