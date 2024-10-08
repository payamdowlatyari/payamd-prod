/* eslint-disable react/no-array-index-key */
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  easeInOut,
} from "framer-motion";
import React, { useRef } from "react";

import { cn } from "./utils/cn";

interface ScrollRevealProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  className?: string;
}

// This function might need updates to support different cases.
const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        result.push(...flatten(child.props.children));
      } else if (child.props.children) {
        result.push(React.cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => (
          <React.Fragment key={index}>{part}</React.Fragment>
        ))
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

function OpacityChild({
  children,
  index,
  progress,
  total,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 20) / total < 1 ? (index + 20) / total : 1],
    [0.1, 1],
    {
      ease: easeInOut,
    }
  );

  const x = useTransform(
    progress,
    [index / total, (index + 20) / total < 1 ? (index + 20) / total : 1],
    [10, 0],
    {
      ease: easeInOut,
    }
  );

  let className = "";
  if (React.isValidElement(children)) {
    className = Reflect.get(children, "props")?.className;
  }

  return (
    <motion.span style={{ opacity, x }} className={cn(className, "h-fit")}>
      {children}
    </motion.span>
  );
}

export default function ScrollReveal({
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const flat = flatten(children);
  const count = flat.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        // Adjust the height and spacing according to the need
        "storybook-fix relative h-[200vh] w-full overflow-y-scroll scroll-smooth",
        className
      )}
    >
      <div className="absolute top-[20vh] left-0 flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-full min-w-fit flex-wrap whitespace-break-spaces p-2 md:p-4">
          {flat.map((child, index) => {
            return (
              <OpacityChild
                progress={scrollYProgress}
                index={index}
                total={flat.length}
                key={index}
              >
                {child}
              </OpacityChild>
            );
          })}
        </div>
      </div>
      {Array.from({ length: count }).map((_, index) => (
        // Create really large area to make the scroll effect work
        <div key={index} className="h-40" />
      ))}
    </div>
  );
}
