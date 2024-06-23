import { Text, Box, Spacer, Flex } from "@chakra-ui/react";
import { publication } from "./data";
import LinkOut from "../../motion/View/LinkOut";
import React from "react";

/**
 * Renders the Publications section of the resume.
 *
 * @return {JSX.Element} The rendered Publications section.
 */
const Publications = () => (
  // Outer container for the Publications section
  <div className="resume-section">
    <div className="resume-header"></div>
    <div className="resume-body">
      <div className="resume-title">
        {/* Title for the Publications section */}
        <h3>Publications</h3>
        <img
          src="wired-gradient-245-edit-document.gif"
          alt="wired-lineal-245-edit-document"
        />
      </div>
      <div className="resume-content">
        {/* Map over the list of publications and render each one */}
        {publication?.map(
          // Destructure the properties from each publication
          ({ title, link, date, description }) => (
            <React.Fragment key={link}>
              {/* Container for the publication details */}
              <Flex p={2}>
                {/* Title of the publication */}
                <Box>
                  <LinkOut title={title} url={link} out />
                </Box>
                {/* Spacer to align the date with other elements */}
                <Spacer />
                {/* Date of the publication */}
                <Text fontSize="xs">{date}</Text>
              </Flex>

              {/* Container for the description of the publication */}
              <Box px={4}>
                {/* Description of the publication */}
                <Text fontSize="xs">{description}</Text>
              </Box>
            </React.Fragment>
          )
        )}
      </div>
    </div>
  </div>
);

export default Publications;
