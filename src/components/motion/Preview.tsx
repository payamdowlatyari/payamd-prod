"use client";

import {
  motion,
  MotionValue,
  motionValue,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import { cn } from "~/utils/cn";

const TRANSITION = {
  type: "spring",
  stiffness: 280,
  damping: 18,
  mass: 0.3,
};

/**
 * A component that displays a single number with a sliding animation.
 *
 * @param {Object} props - The component props.
 * @param {MotionValue<number>} props.mv - The motion value for the sliding animation.
 * @param {number} props.number - The number to display.
 */
function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;

    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  // don't render the animated number until we know the height
  if (!bounds.height) {
    return (
      <span ref={ref} className="invisible absolute">
        {number}
      </span>
    );
  }

  return (
    <motion.span
      style={{ y }}
      layoutId={`${uniqueId}-${number}`}
      className="absolute inset-0 flex items-center justify-center"
      transition={TRANSITION}
      ref={ref}
    >
      {number}
    </motion.span>
  );
}

/**
 * Renders a digit from a given value and place.
 *
 * @param {object} props - The props for the component.
 * @param {number} props.value - The value to render as a digit.
 * @param {number} props.place - The place value of the digit.
 */
function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative inline-block w-[1ch] overflow-x-visible overflow-y-clip leading-none tabular-nums">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

/**
 * Renders a number in a sliding animation style.
 *
 * @param {object} props - The props for the component.
 * @param {number} props.value - The number to render.
 * @param {boolean} [props.padStart=false] - Whether to pad the integer part with leading zeros.
 * @param {string} [props.decimalSeparator="."] - The character to use as the decimal separator.
 */
export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = ".",
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const [integerPart, decimalPart] = absValue.toString().split(".");
  const integerValue = parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split("");
  const integerPlaces = integerDigits.map(
    (_, i) => 10 ** (integerDigits.length - i - 1)
  );

  return (
    <div className="flex items-center">
      {value < 0 && "-"}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          value={integerValue}
          place={integerPlaces[index]}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              // eslint-disable-next-line react/no-array-index-key
              key={`decimal-${index}`}
              value={parseInt(decimalPart, 10)}
              place={10 ** (decimalPart.length - index - 1)}
            />
          ))}
        </>
      )}
    </div>
  );
}

/**
 * A basic example of a sliding number component that animates the value change.
 */
export function SlidingNumberBasic() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (value === 100) return;
    const interval = setInterval(() => {
      setValue(value + 1);
    }, 10);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <motion.div
      initial={{ y: 0, fontSize: `${24}px` }}
      animate={{ y: 0, fontSize: `${24}px` }}
      transition={{
        ease: [1, 0, 0.35, 0.95],
        duration: 1.5,
        delay: 0.3,
      }}
    >
      <div className="inline-flex items-center">
        <SlidingNumber value={value} />%
      </div>
    </motion.div>
  );
}

/**
 * Props for the Preview component.
 */
interface PreviewProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
}

/**
 * A component that displays a number with a spring animation.
 *
 * @param {PreviewProps} props - The props for the component.
 */
export default function Preview({
  value,
  direction = "up",
  delay = 0,
  className,
}: PreviewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { margin: "0px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(direction === "down" ? 0 : value);
      }, delay * 1000);
    }
  }, [motionValue, isInView, delay, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Intl.NumberFormat("en-US").format(latest.toFixed(0))}%`;
        }
      }),
    [springValue]
  );

  return (
    <motion.div
      initial={{ y: "0" }}
      animate={{ y: "-100%" }}
      transition={{
        duration: 1,
        delay: 4,
        ease: "easeInOut",
      }}
      className="fixed flex justify-center top-0 left-0 w-full h-full bg-neutral-950 z-[1002]"
    >
      <span
        className={cn(
          "inline-block tracking-wider text-3xl font-thin leading-none self-center",
          className
        )}
        ref={ref}
      />
    </motion.div>
  );
}
