import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

/**
 * GlassButton component
 * @param {string} title - The title of the button.
 * @param {string} url - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element}
 */
export function GlassButton({
  title,
  url,
}: {
  title: string;
  url: string;
}): JSX.Element {
  return (
    <Link
      href={url}
      className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full mx-2 p-px text-xs font-semibold leading-6 text-white inline-block"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
        <span> {title}</span>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </Link>
  );
}

/**
 * Shimmer component
 * @param {string} title - The title of the button.
 * @param {string} url - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element}
 */
export function Shimmer({
  title,
  url,
}: {
  title: string;
  url: string;
}): JSX.Element {
  return (
    <Link
      href={url}
      className="inline-flex m-1 h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 hover:text-slate-50 hover:shadow-lg transition-colors duration-500"
    >
      {title}
    </Link>
  );
}

/**
 * BorderMagic component
 * @param {string} title - The title of the button.
 * @param {string} url - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element}
 */
export function BorderMagic({
  title,
  url,
}: {
  title: string;
  url: string;
}): JSX.Element {
  return (
    <Link
      href={url}
      className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
        {title}
      </span>
    </Link>
  );
}

/**
 * LinkOverlay component
 * @param {string} title - The title of the button.
 * @param {string} url - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element}
 */
export function LinkOverlay({
  title,
  url,
  className = "",
}: {
  title: string;
  url: string;
  className?: string;
}): JSX.Element {
  return (
    <Link
      href={url}
      className={`px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-neutral-100 ${className}`}
    >
      <div className="relative overflow-hidden group font-semibold">
        <span className="invisible">{title}</span>
        <span className="absolute top-0 left-0 group-hover:-translate-y-full transition-transform ease-in-out duration-500 hover:duration-300">
          {title}
        </span>
        <span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 hover:duration-300">
          {title}
        </span>
      </div>
    </Link>
  );
}

/**
 * LinkArrowOut component
 * @param {string} title - The title of the button.
 * @param {string} url - The URL to navigate to when the button is clicked.
 * @returns {JSX.Element}
 */
export function LinkArrowOut({
  title,
  url,
}: {
  title: string;
  url: string;
}): JSX.Element {
  return (
    <Link
      href={url}
      className="group inline-flex text-base backdrop-blur-md text-white justify-center items-center py-1 w-fit rounded-xl duration-200 group bg-page-gradient text-md font-geistSans hover:bg-transparent/10 hover:text-zinc-100"
    >
      {title}
      <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
        <RiArrowRightUpLine className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
        <RiArrowRightUpLine className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </Link>
  );
}
