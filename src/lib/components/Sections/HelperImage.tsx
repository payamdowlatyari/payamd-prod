import { Tooltip, Image } from "@chakra-ui/react";

const HelperImage = ({
  label,
  src,
  size,
}: {
  label: string;
  src: string;
  size?: number;
}) => (
  <Tooltip hasArrow aria-label={label} label={label}>
    <Image src={src} alt={label} title={label} width={size} />
  </Tooltip>
);

export default HelperImage;
