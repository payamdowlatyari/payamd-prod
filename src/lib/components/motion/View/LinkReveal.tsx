import Link from "next/link";

export default function LinkReveal({ title, sub, url }: any) {
  return (
    <div className="relative block my-1 outline-none">
      <Link href={url} className="flex flex-col items-center">
        <span className="relative text-3xl md:text-5xl inline-block overflow-hidden py-1 text-apple hover:text-white after:absolute after:top-[0] after:left-[0] after:w-full after:h-full after:[transition:transform_0.7s] after:ease-[cubic-bezier(0.7,0,0.3,1)] before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full before:translate-x-0 before:z-[-1] before:[transform:translate3d(100%,_0,_0)_translate3d(1px,_0,_0)] after:[transform:translate3d(0,_0,_0)]">
          {title}
        </span>
        <span className="relative text-base text-ultra-light-gray hover:text-apple inline-block text-[0.25em] ml-[0] mr-[0] my-[0.25em] mt-[0.25em] p-[0.25em] [transition:color_0.7s] normal-case ease-[cubic-bezier(0.7,0,0.3,1)]">
          {sub}
        </span>
      </Link>
    </div>
  );
}
