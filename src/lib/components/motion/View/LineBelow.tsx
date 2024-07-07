import Link from "next/link";

export default function LineBelow({ title, url }: any) {
  return (
    <Link
      href={url}
      className="relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
    >
      {title}
    </Link>
  );
}
