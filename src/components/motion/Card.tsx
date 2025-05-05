"use client";

import { LinkArrowOut } from "~/components/Button/Button";
import { cn } from "~/utils/cn";

/**
 * A component that renders a card title with specified styling.
 *
 * @param {Object} props - The component props.
 */
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
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
 */
export const CardSubTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "my-1 md:my-2 text-neutral-400 uppercase tracking-wide leading-relaxed text-xs md:text-sm",
        className
      )}
    >
      {children}
    </p>
  );
};

/**
 * A component that renders a date label.
 * @param {React.ReactNode} children - The date string to render.
 */
export const CardDate = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
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
 */
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-1 md:mt-2 text-neutral-200 tracking-wide leading-relaxed text-xs md:text-sm md:leading-loose",
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
 */
export function Card({ items }: { items: any }) {
  return (
    <div className="flex flex-col my-5 max-w-screen-sm">
      {items.map((item: any) => (
        <div key={item.title} className="h-full w-full p-2 m-1 overflow-hidden">
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
              <ul className="list-disc list-inside text-xs md:text-sm">
                {item.description.map((d: string) => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            )}
          </CardDescription>
        </div>
      ))}
    </div>
  );
}
