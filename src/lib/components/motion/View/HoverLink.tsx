import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function HoverLink({ title, url, size, out, low }: any) {
  return (
    <Link
      href={url}
      className="relative text-lg w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-apple after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
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
