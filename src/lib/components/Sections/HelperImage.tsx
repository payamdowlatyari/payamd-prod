import { Tooltip, Image } from "@chakra-ui/react";

/**
 * A wrapper around Chakra's Image component that adds a tooltip with the given
 * label. The image itself is given an alt attribute and a title attribute with
 * the same value as the label.
 *
 * @param {{ label: string, src: string, size?: number }} props
 * @prop {string} label The label to use for the tooltip and alt/title attributes
 * @prop {string} src The source URL of the image
 * @prop {number} [size] The width of the image, in pixels
 * @returns {JSX.Element} A JSX element representing the wrapped image
 */
const HelperImage = ({
  label,
  src,
  size,
}: {
  label: string;
  src: string;
  size?: number;
}): JSX.Element => (
  <Tooltip hasArrow aria-label={label} label={label}>
    <Image src={src} alt={label} title={label} width={size} />
  </Tooltip>
);

export default HelperImage;
