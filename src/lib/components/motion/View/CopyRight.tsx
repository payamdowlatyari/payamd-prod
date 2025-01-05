import Link from "next/link";

/**
 * CopyRight component
 * @returns {JSX.Element}
 */
export default function CopyRight(): JSX.Element {
  return (
    <div className="flex mx-auto text-sm self-end py-7">
      <Link
        className="text-neutral-300 hover:text-neutral-50 transition-colors ease-in-out duration-500 font-bold px-1"
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
