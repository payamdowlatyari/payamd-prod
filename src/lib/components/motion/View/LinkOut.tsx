import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

export default function LinkOut({ title, url, size, low }: any) {
  return (
    <Link
      href={url}
      style={{
        fontSize: size,
      }}
      target="_blank"
    >
      <>
        {!low ? (
          <span className="uppercase pr-[1px] hover:pr-1 hover:transition-colors ease-in-out duration-500">
            {title}
          </span>
        ) : (
          <span className="pr-[1px] hover:pr-1 hover:transition-colors ease-in-out duration-500">
            {title}
          </span>
        )}
        <RiArrowRightUpLine className="inline" />
      </>
    </Link>
  );
}
