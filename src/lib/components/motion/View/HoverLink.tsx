import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function HoverLink({ title, url, size, out, low }: any) {
  return (
    <Link
      href={url}
      className="relative after:absolute after:bg-black after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500"
      style={{
        fontSize: size,
      }}
      target={out ? "_blank" : ""}
    >
      <>
        {!low ? (
          <span className="uppercase">{title}</span>
        ) : (
          <span>{title}</span>
        )}
        {out ? <RiArrowRightUpLine className="inline" /> : ""}
      </>
    </Link>
  );
}
