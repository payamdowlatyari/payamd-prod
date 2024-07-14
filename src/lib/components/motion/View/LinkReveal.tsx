import Link from "next/link";

export default function LinkReveal({ title, sub, url }: any) {
  return (
    <div className="relative block my-1 outline-none">
      <Link
        href={url}
        className="flex flex-col items-center text-apple hover:text-white transition-colors duration-500 ease-in-out"
      >
        <span className="relative text-3xl md:text-5xl inline-block overflow-hidden py-1 text-apple">
          {title}
        </span>
        <span className="relative text-base text-ultra-light-gray inline-block text-[0.25em] ml-[0] mr-[0] my-[0.25em] mt-[0.25em] p-[0.25em] normal-case">
          {sub}
        </span>
      </Link>
    </div>
  );
}
