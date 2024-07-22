import Link from "next/link";

export default function CopyRight() {
  return (
    <div className="text-center justify-center text-sm self-end py-7 z-[1]">
      <Link
        className="text-zinc-300 hover:text-white transition-colors ease-in-out duration-500 font-bold"
        href="https://www.payamd.com"
        target="_blank"
        rel="noreferrer"
      >
        payamd.com
      </Link>
      <span className="text-zinc-400">
        {" © "}
        {new Date().getFullYear()}
        {" | "}
        All Rights Reserved.
      </span>
    </div>
  );
}
