import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function HoverLink({ title, url, size, out, low }: any) {
  return (
    <Link
      href={url}
      className="underlined underlinedThin"
      style={{
        fontSize: size,
        fontWeight: "400",
      }}
      target={out ? "_blank" : ""}
    >
      <>
        {!low ? (
          <span style={{ textTransform: "uppercase" }}>{title}</span>
        ) : (
          <span>{title}</span>
        )}
        {out ? <RiArrowRightUpLine style={{ display: "inline" }} /> : ""}
      </>
    </Link>
  );
}
