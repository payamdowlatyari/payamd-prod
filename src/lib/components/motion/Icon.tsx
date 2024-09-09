import { Tooltip } from "@chakra-ui/react";

export default function Icon({ id, title }: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      className="w-[4vw] max-w-12 min-w-8 overflow-visible stroke-neutral-50 stroke-[1] m-2 fill-neutral-50"
    >
      <Tooltip
        hasArrow
        label={title}
        bg="blackAlpha"
        color="white"
        placement="top"
        openDelay={1000}
      >
        <path d={id} fill="currentColor" />
      </Tooltip>
    </svg>
  );
}
