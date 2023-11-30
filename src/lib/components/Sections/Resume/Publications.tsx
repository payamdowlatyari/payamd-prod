"use client";

import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Text, LinkBox, LinkOverlay, Divider, Stack } from "@chakra-ui/react";

const Publications = () => {
  return (
    <LinkBox as="article" p="3" borderWidth="1px" rounded="md">
      <LinkOverlay href="https://dl.acm.org/doi/10.1145/3432231" isExternal>
        <b>Mapping and Taking Stock of the Personal Informatics Literature</b>
      </LinkOverlay>
      <Text fontSize="sm" pb={1}>
        <i>
          Proceedings of the ACM on Interactive, Mobile, Wearable and Ubiquitous
          Technologies December 2020 Article No.: 126{" "}
        </i>{" "}
        <ExternalLinkIcon />
      </Text>
      <Stack direction="row" h="220px" p={4}>
        <Divider orientation="vertical" />
        <Text fontSize="xs">
          <b>Abstract:</b> The research community on the study and design of
          systems for personal informatics has grown over the past decade. To
          take stock of what the topics the field has studied and methods the
          field has used, we map and label 523 publications from ACM's library,
          IEEE Xplore, and PubMed. We surface that the literature has focused on
          studying and designing for health and wellness domains, an emphasis on
          understanding and overcoming barriers to data collection and
          reflection, and progressively fewer contributions involving artifacts
          being made. Our mapping review suggests directions future research
          could explore, such as identifying and resolving barriers to tracking
          stages beyond collection and reflection, engaging more with domain
          experts, and further discussing the privacy and ethical concerns
          around tracked data.
        </Text>
      </Stack>
    </LinkBox>
  );
};

export default Publications;
