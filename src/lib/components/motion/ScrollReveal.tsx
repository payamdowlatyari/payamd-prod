import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  easeInOut,
} from "framer-motion";
import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  ReactNode,
  useRef,
} from "react";

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
const flatten = (children: ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      if (child.type === Fragment) {
        result.push(...flatten(child.props.children));
      } else if (child.props.children) {
        result.push(cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(...parts.map((part) => part));
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
  if (isValidElement(children)) {
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
      className={cn("relative h-[200vh] z-10", className)}
    >
      <div className="sticky top-1/3 mx-auto flex h-1/2 w-full sm:w-3/4 md:w-2/3 items-center bg-transparent px-2 py-20">
        <div className="flex h-fit w-full min-w-fit flex-wrap whitespace-break-spaces p-1 md:p-2">
          {flat.map((child, index) => {
            return (
              <OpacityChild
                progress={scrollYProgress}
                index={index}
                total={flat.length}
              >
                {child}
              </OpacityChild>
            );
          })}
        </div>
      </div>
      {Array.from({ length: count }).map(() => (
        <div className="h-40" />
      ))}
    </div>
  );
}
