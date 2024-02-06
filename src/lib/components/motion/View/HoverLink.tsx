import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";

export default function HoverLink({ title, url, size, out }: any) {
  return (
    <Link
      href={url}
      className="underlined underlinedThin"
      style={{
        fontSize: size,
        textTransform: "uppercase",
      }}
      target={out ? "_blank" : ""}
    >
      {title} {out ? <FiArrowUpRight style={{ display: "inline" }} /> : ""}
    </Link>
  );
}
