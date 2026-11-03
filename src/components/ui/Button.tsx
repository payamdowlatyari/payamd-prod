import Link from "next/link";
import { RiArrowRightUpLine } from "react-icons/ri";

/**
 * GlassButton component
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the button.
 * @param {string} props.url - The URL the button links to.
 */
/** Shared secondary action. */
export function GlassButton({ title, url }: { title: string; url: string }) {
  return (
    <Link href={url} className="button-secondary">
      {title}
    </Link>
  );
}

/** Shared primary action. */
export function Shimmer({ title, url }: { title: string; url: string }) {
  return (
    <Link href={url} className="button-primary">
      {title}
    </Link>
  );
}

/** Shared secondary action. */
export const BorderMagic = GlassButton;

/**
 * LinkOverlay component
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the link.
 * @param {string} props.url - The URL the link points to.
 * @param {string} [props.className] - Additional CSS classes for styling.
 */
export function LinkOverlay({
  title,
  url,
  className = "",
}: {
  title: string;
  url: string;
  className?: string;
}) {
  return (
    <Link
      href={url}
      className={`px-2 py-1 m-1 md:px-4 md:py-2 md:m-2 text-foreground ${className}`}
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
 *
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the link.
 * @param {string} props.url - The URL the link points to.
 */
export function LinkArrowOut({ title, url }: { title: string; url: string }) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-1 py-1 w-fit rounded-sm text-sm font-medium text-primary transition-colors hover:text-foreground"
    >
      {title}
      <div className="flex overflow-hidden relative justify-center items-center ml-1 w-5 h-5">
        <RiArrowRightUpLine className="absolute transition-all duration-500 group-hover:translate-x-4 group-hover:-translate-y-5" />
        <RiArrowRightUpLine className="absolute transition-all duration-500 -translate-x-4 -translate-y-5 group-hover:translate-x-0 group-hover:translate-y-0" />
      </div>
    </Link>
  );
}

/**
 * HoverLink component
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the link.
 * @param {string} props.url - The URL the link points to.
 * @param {boolean} [props.out] - Whether the link opens in a new tab.
 * @param {boolean} [props.low] - Whether to use a lower emphasis style
 */
export function HoverLink({
  title,
  url,
  out,
  low,
}: {
  title: string;
  url: string;
  out?: boolean;
  low?: boolean;
}) {
  return (
    <Link
      href={url}
      className="relative text-3xl sm:text-4xl md:text-5xl after:absolute after:bg-primary after:bottom-0 after:left-0 after:h-[3px] after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-500"
      rel="noopener noreferrer"
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

/**
 * LinkOut component
 * @param {Object} props - The component properties.
 * @param {string} props.title - The title of the link.
 * @param {string} props.url - The URL the link points to.
 * @param {number} [props.size] - The font size of the link
 * @param {boolean} [props.low] - Whether to use a lower emphasis style
 */
export function LinkOut({
  title,
  url,
  size,
  low,
}: {
  title: string;
  url: string;
  size?: number;
  low?: boolean;
}) {
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

/**
 * FlipLink component
 *
 * @param {Object} props - The component properties.
 * @param {string} props.children - The text content of the link.
 * @param {string} props.href - The URL the link points to.
 *
 * A link component that flips the text on hover.
 *
 * @example
 * <FlipLink href="https://example.com">Example</FlipLink>
 */
export const FlipLink = ({
  children,
  href,
}: {
  children: string;
  href: string;
}) => {
  const chars = children.split("");
  const charKeys = chars.map((ch, idx) => {
    const occurrence = chars
      .slice(0, idx)
      .reduce((acc, c) => (c === ch ? acc + 1 : acc), 0);
    return `${ch}-${occurrence}`;
  });

  return (
    <a
      href={href}
      className="group relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex">
        {chars.map((letter, i) => (
          <span
            key={charKeys[i]}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      <div className="absolute inset-0 flex">
        {chars.map((letter, i) => (
          <span
            key={`top-${charKeys[i]}`}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </a>
  );
};
