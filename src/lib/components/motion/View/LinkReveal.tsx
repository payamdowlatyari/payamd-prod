import Link from "next/link";

export default function LinkReveal({ title, sub, url }: any) {
  return (
    <div className="relative block m-1 outline-none">
      <Link
        href={url}
        className="flex flex-row flex-wrap items-baseline text-zinc-300 hover:text-white transition-colors duration-500 ease-in-out"
      >
        <span className="relative font-medium text-4xl lg:text-5xl inline-block overflow-hidden m-1 p-1 min-w-[300px]">
          {title}
        </span>
        <span className="relative text-base inline-block min-w-[300px] m-1 p-1 normal-case">
          {sub}
        </span>
      </Link>
    </div>
  );
}
