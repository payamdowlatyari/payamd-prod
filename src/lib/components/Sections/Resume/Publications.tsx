import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text, LinkBox, LinkOverlay } from "@chakra-ui/react";

const Publications = () => {
  return (
    <LinkBox as="article" p="1" borderWidth="0" rounded="md">
      <LinkOverlay
        className="underlined underlinedReverse"
        href="https://dl.acm.org/doi/10.1145/3432231"
        isExternal
      >
        <b>Mapping and Taking Stock of the Personal Informatics Literature</b>
      </LinkOverlay>{" "}
      <ExternalLinkIcon />
      <Text fontSize="sm" pb={1}>
        <i>
          Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous
          Technologies December 2020 Article No.: 126{" "}
        </i>{" "}
      </Text>
    </LinkBox>
  );
};

export default Publications;
