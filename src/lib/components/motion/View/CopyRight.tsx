import Link from "next/link";

export default function CopyRight() {
  return (
    <div className="text-center justify-center text-sm self-end py-7 z-[3]">
      <Link
        className="text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold"
        href="https://www.payamd.com"
        target="_blank"
        rel="noreferrer"
      >
        payamd.com
      </Link>
      <span className="text-neutral-400">
        {" © "}
        {new Date().getFullYear()}
        {" | "}
        All Rights Reserved.
      </span>
    </div>
  );
}
