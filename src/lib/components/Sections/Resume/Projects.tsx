import { ExternalLinkIcon, SmallAddIcon } from "@chakra-ui/icons";
import {
  List,
  ListItem,
  ListIcon,
  Text,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";

const Projects = () => {
  return (
    <>
      <LinkBox as="article" p={1} mb={2} borderWidth="1px" rounded="md">
        <LinkOverlay href="https://dashboard-mern-r47l.vercel.app/" isExternal>
          <b>My Dashboard </b> <ExternalLinkIcon />
        </LinkOverlay>
        <Text fontSize="sm" pb={2}>
          <i>Full Stack Web Application</i>
        </Text>
        <List pb={2}>
          <ListItem fontSize="sm">
            <ListIcon as={SmallAddIcon} />A project management dashboard
            deployed to Vercel
          </ListItem>
          <ListItem fontSize="sm">
            <ListIcon as={SmallAddIcon} />
            MongoDB, ExperssJS, ReactJS, NodeJS, Primereact, JWT
          </ListItem>
        </List>
      </LinkBox>
      <LinkBox as="article" p={1} mb={2} borderWidth="1px" rounded="md">
        <LinkOverlay href="https://m-studios.us/" isExternal>
          <b>M-Studios</b> <ExternalLinkIcon /> Portfolio Design
        </LinkOverlay>
        <Text fontSize="sm" pb={2}>
          <i>Portfolio Design</i>
        </Text>
        <List pb={2}>
          <ListItem fontSize="sm">
            <ListIcon as={SmallAddIcon} />A business portfolio for a media
            production company
          </ListItem>
          <ListItem fontSize="sm">
            <ListIcon as={SmallAddIcon} />
            HTML, CSS, JavaScript, jQuery, and Bootstrap
          </ListItem>
        </List>
      </LinkBox>
      <LinkBox as="article" p={1} mb={2} borderWidth="1px" rounded="md">
        <LinkOverlay
          href="https://personal-informatics.depstein.net/"
          isExternal
        >
          <b>Paper Browser</b> <ExternalLinkIcon />
        </LinkOverlay>
        <Text fontSize="sm" pb={2}>
          <i>Research and Development</i>
        </Text>
        <List pb={2}>
          <ListItem fontSize="sm">
            <ListIcon as={SmallAddIcon} />
            An academic web application with Angular
          </ListItem>
        </List>
      </LinkBox>
    </>
  );
};

export default Projects;
