/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */

"use client";

import { cn } from "./utils/cn";
import { LinkArrowOut } from "./View/TailwindButton";

/**
 * A component that renders a card title with specified styling.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional additional class names for styling.
 * @param {React.ReactNode} props.children - The content to be rendered as the card title.
 *
 * @returns {JSX.Element} A heading element styled as a card title.
 */
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <h4
      className={cn(
        "text-neutral-100 font-semibold tracking-wide text-base md:text-lg",
        className
      )}
    >
      {children}
    </h4>
  );
};

/**
 * A component that renders a styled subtitle paragraph.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Optional additional class names for styling.
 * @param {React.ReactNode} props.children - The content to be rendered within the subtitle.
 *
 * @returns {JSX.Element} A paragraph element styled as a subtitle.
 */
export const CardSubTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <p
      className={cn(
        "my-1 md:my-2 text-neutral-400 tracking-wide leading-relaxed text-sm md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that renders a date label.
 *
 * @param {React.ReactNode} children - The date string to render.
 * @param {string} [className] - An optional class name to add to the element.
 *
 * @returns {React.ReactElement} A date label component.
 */
export const CardDate = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): React.ReactElement => {
  return (
    <p
      className={cn(
        "mt-1 ml-1 text-neutral-400 tracking-wide leading-relaxed text-xs md:text-sm min-w-12",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that renders a description paragraph with specified styling.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names for styling.
 * @param {React.ReactNode} props.children - The content to be displayed within the paragraph.
 * @returns {JSX.Element} A styled paragraph element.
 */
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <p
      className={cn(
        "mt-1 md:mt-2 text-neutral-200 tracking-wide leading-relaxed text-xs md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that displays a list of resume items.
 * @param items - An array of resume items.
 * @returns {JSX.Element} A list of resume items.
 */
export function ResumeCard({ items }: { items: any }): JSX.Element {
  return (
    <div className="flex flex-col my-5 max-w-screen-sm">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="h-full w-full p-2 mt-2 overflow-hidden">
          <div className="flex justify-between">
            {item.link ? (
              <LinkArrowOut title={item.title} url={item.link} />
            ) : (
              <CardTitle>{item.title}</CardTitle>
            )}
            <CardDate>{item.date}</CardDate>
          </div>
          <CardSubTitle>{item.subtitle}</CardSubTitle>
          <CardDescription>
            {item.description && item.description.length > 0 && (
              <>
                {item.description.map((d: any, i: number) => (
                  <p key={i}>{d}</p>
                ))}
              </>
            )}
          </CardDescription>
        </div>
      ))}
    </div>
  );
}
