/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-const */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */

"use client";

import { Button } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";

import { cn } from "./utils/cn";
import { LinkArrowOut } from "./View/TailwindButton";

/**
 * A component that renders a card with a wobble effect when the user moves the
 * mouse over the card.
 *
 * The component takes three props:
 *
 * - `children`: The content to render inside the card.
 * - `containerClassName`: An optional class name to add to the container element.
 * - `className`: An optional class name to add to the card element.
 *
 * The component creates a wobble effect by calculating the position of the mouse
 * relative to the center of the card and updating the state. It then uses the
 * `style` property to set the `transform` property of the card element based on
 * the state. The `transition` property is set to "transform 0.1s ease-out" to
 * create a smooth animation.
 */
export const WobbleCard = ({
  children,
  containerClassName,
  className,
}: {
  children: React.ReactNode;
  containerClassName?: string;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  /**
   * Sets the mouse position when the user moves the mouse over the card.
   *
   * This function is used to create a wobble effect when the user moves the mouse
   * over the card. It calculates the position of the mouse relative to the
   * center of the card and updates the state.
   *
   * @param {React.MouseEvent<HTMLElement>} event - The event object from the
   *   `mousemove` event.
   */
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - (rect.left + rect.width / 2)) / 20;
    const y = (clientY - (rect.top + rect.height / 2)) / 20;
    setMousePosition({ x, y });
  };
  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovering
          ? `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0) scale3d(1, 1, 1)`
          : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
        transition: "transform 0.1s ease-out",
      }}
      className={cn(
        "mx-auto w-full relative rounded-2xl overflow-hidden",
        containerClassName
      )}
    >
      <div
        className="relative h-full sm:mx-0 sm:rounded-2xl overflow-hidden"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{
            transform: isHovering
              ? `translate3d(${-mousePosition.x}px, ${-mousePosition.y}px, 0) scale3d(1.03, 1.03, 1)`
              : "translate3d(0px, 0px, 0) scale3d(1, 1, 1)",
            transition: "transform 0.1s ease-out",
          }}
          className={cn("h-full px-2 py-4 sm:px-4", className)}
        >
          <div
            className="absolute inset-0 w-full h-full scale-[1.2] transform opacity-10 [mask-image:radial-gradient(#fff,transparent,75%)]"
            style={{
              backgroundImage: "url(/noise.webp)",
              backgroundSize: "30%",
            }}
          />
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

/**
 * A component that renders a card with a 3D rotation effect that follows the user's mouse.
 *
 * @param {React.ReactNode} children - The children to render inside the card.
 * @param {string} [className] - A class name to add to the card.
 * @param {string} [containerClassName] - A class name to add to the container element.
 * @returns {JSX.Element} A JSX element representing the CardContainer component.
 */
export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  /**
   * Updates the container's transform to rotate it in 3D space
   * based on the user's mouse position.
   *
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event that triggered this function.
   */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 25;
    const y = (e.clientY - top - height / 2) / 25;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  /**
   * Resets the container's transform to its original state when the user enters the card.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event that triggered this function.
   */
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  /**
   * Resets the container's transform to its original state when the user leaves the card.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event that triggered this function.
   */
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };
  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn(
          "py-20 flex items-center justify-center",
          containerClassName
        )}
        style={{
          perspective: "1000px",
        }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

/**
 * Returns the state of whether the mouse is currently inside the
 * component's boundaries, and a function to update that state.
 *
 * This hook must be used within a `MouseEnterProvider` component.
 *
 * @returns {[(boolean), (React.Dispatch<React.SetStateAction<boolean>>)]}
 *   An array containing the state of whether the mouse is currently
 *   inside the component's boundaries, and a function to update that state.
 */
export const useMouseEnter = (): [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider");
  }
  return context;
};

/**
 * A component that renders its children in a 3D space.
 *
 * @param {{ children: React.ReactNode; className?: string; }} props
 * @returns {JSX.Element} A JSX element representing the CardBody component
 */
export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * A component that renders a card item with animations when the user hovers it.
 * It applies the translateX, translateY, translateZ, rotateX, rotateY and rotateZ
 * CSS properties to the card item.
 *
 * @param {{ as?: React.ElementType; children: React.ReactNode; className?: string; translateX?: number | string; translateY?: number | string; translateZ?: number | string; rotateX?: number | string; rotateY?: number | string; rotateZ?: number | string; [key: string]: any; }} props
 * @returns {JSX.Element} A JSX element representing the CardItem component
 */
export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  /**
   * Handles the animations for the card item when the user hovers it or not.
   * It applies the translateX, translateY, translateZ, rotateX, rotateY and rotateZ
   * CSS properties to the card item.
   */
  const handleAnimations = () => {
    if (!ref.current) return;
    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  };

  useEffect(() => {
    handleAnimations();
  }, [handleAnimations, isMouseEntered]);

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

/**
 * ThreeDCardDemo component renders a 3D interactive card with motion effects.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The item data to display in the card.
 * @param {string} props.item.title - The title of the item.
 * @param {string} props.item.description - A brief description of the item.
 * @param {string} props.item.url - The URL to link to when the card is clicked.
 * @param {string} props.item.img - The URL of the item image to display.
 * @param {string[]} [props.item.tags] - An array of tags associated with the item.
 * @returns {JSX.Element} A JSX element representing a stylized 3D card with hover effects.
 */
export function ThreeDCardDemo({ item }: any): JSX.Element {
  return (
    <CardContainer className="relative flex flex-row justify-evenly flex-wrap inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-[20rem] sm:w-[25rem] md:w-[30rem] max-w-screen-sm h-[30rem] rounded-xl p-6 border">
        <CardItem
          translateZ={20}
          as={Link}
          href={item.url}
          target="__blank"
          className="text-xl font-bold text-white"
        >
          {item.title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {item.description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={item.img}
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex flex-wrap justify-start items-center mt-8">
          {item.tags?.map((tag: any) => {
            return (
              <span className="inline-flex items-center m-1 gap-x-1 py-1 px-3 rounded-full text-xs font-medium border border-slate-700 text-white">
                {tag}
              </span>
            );
          })}
        </div>
      </CardBody>
    </CardContainer>
  );
}

/**
 * A component that renders a styled card container.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.className] - Additional class names for custom styling.
 * @param {React.ReactNode} props.children - The content to be rendered inside the card.
 * @returns {JSX.Element} A styled card component with default and custom styles.
 */
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black bg-opacity-90 border border-white/[0.2] group-hover:border-slate-700 group-hover:bg-opacity-100 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-1">{children}</div>
      </div>
    </div>
  );
};

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
 * A component that renders a group of items with a hover effect.
 * @param {{ items: any[]; className?: string; }} props
 * @returns {JSX.Element}
 */
export const HoverEffect = ({
  items,
  className,
}: {
  items: any[];
  className?: string;
}): JSX.Element => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("flex flex-col py-5", className)}>
      {items.map((item, idx) => (
        <Link
          href={item?.link || "#"}
          key={item?.idx}
          target="_blank"
          className="relative group block p-2 h-full w-[20rem] sm:w-[35rem] md:w-[45rem]"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex justify-between">
              <CardTitle>{item.title}</CardTitle>
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
          </Card>
        </Link>
      ))}
    </div>
  );
};

export function ExpandableCard({
  /**
   * The height of the card when it is collapsed.
   */
  height = "8rem",
  /**
   * The class name to apply to the root container.
   */
  className = "",
  children,
  /**
   * Whether the button should be full width or not.
   */
  wide = false,
}: {
  height: string;
  wide?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-2 overflow-hidden bg-black bg-opacity-90 border border-white/[0.2] group-hover:border-slate-700 group-hover:bg-opacity-100 relative z-20",
        className
      )}
    >
      <div className="relative overflow-hidden bg-inherit dark:bg-inherit">
        <div
          ref={contentRef}
          id="expandable-content"
          className="transition-all duration-300 ease-in-out"
          style={{ height: isExpanded ? `${contentHeight}px` : height }}
        >
          {children}
        </div>
        <div
          data-expanded={isExpanded}
          className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-inherit dark:from-inherit/50 to-transparent pointer-events-none data-[expanded=true]:opacity-0 transition-opacity duration-300 ease-in-out"
          aria-hidden={isExpanded ? "true" : "false"}
        />
        <div
          className={cn(
            "mx-auto bg-inherit dark:bg-inherit",
            wide ? "w-full" : "w-fit",
            isExpanded ? "pt-2" : "absolute bottom-4 inset-x-0"
          )}
        >
          <Button
            variant="outline"
            className="w-full bg-inherit dark:bg-inherit rounded-lg"
            onClick={() => setIsExpanded(!isExpanded)}
            aria-expanded={isExpanded}
            aria-controls="expandable-content"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export function ResumeCard({ items }: { items: any }) {
  return (
    <div className="flex flex-col my-5 max-w-screen-sm">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="h-full w-full p-2 mt-2 overflow-hidden">
          <div className="flex justify-between">
            {/* <CardTitle>{item.title}</CardTitle> */}
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
