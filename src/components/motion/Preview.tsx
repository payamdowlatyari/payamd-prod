"use client";

import {
  AnimatePresence,
  animate,
  motion,
  MotionValue,
  motionValue,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import useMeasure from "react-use-measure";

import Logo from "~/components/ui/Logo";
import { cn } from "~/utils/cn";

const TRANSITION = {
  type: "spring" as const,
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
  value?: number;
  className?: string;
}

const PREVIEW_SESSION_KEY = "preview-seen";

/**
 * A component that displays a number with a spring animation.
 *
 * @param {PreviewProps} props - The props for the component.
 */
export default function Preview({ value = 100, className }: PreviewProps) {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return !window.sessionStorage.getItem(PREVIEW_SESSION_KEY);
  });
  const [displayValue, setDisplayValue] = useState(0);
  const progress = useMotionValue(0);
  const spring = useSpring(progress, {
    damping: 28,
    stiffness: 140,
  });

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    window.sessionStorage.setItem(PREVIEW_SESSION_KEY, "1");

    let finishTimeout: number | undefined;

    const unsubscribe = spring.on("change", (latest) => {
      setDisplayValue(Math.round(latest));
    });

    const idleAnimation = animate(progress, value * 0.9, {
      duration: 2.4,
      ease: "easeOut",
    });

    const complete = () => {
      idleAnimation.stop();
      animate(progress, value, {
        duration: 0.35,
        ease: "easeOut",
        onComplete: () => {
          finishTimeout = window.setTimeout(() => {
            setIsVisible(false);
          }, 250);
        },
      });
    };

    if (document.readyState === "complete") {
      complete();
    } else {
      window.addEventListener("load", complete, { once: true });
    }

    return () => {
      idleAnimation.stop();
      unsubscribe();
      if (finishTimeout) {
        window.clearTimeout(finishTimeout);
      }
      window.removeEventListener("load", complete);
    };
  }, [isVisible, progress, spring, value]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[1100] flex items-center justify-center overflow-hidden bg-neutral-950"
        >
          <div className="absolute inset-0 bg-gradient-radial from-neutral-900 to-neutral-950" />
          <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-neutral-50">
            <Logo size={88} type="preview" />
            <div className="text-center uppercase tracking-[0.45em] text-xs text-neutral-400">
              Loading experience
            </div>
            <div
              className={cn(
                "inline-flex items-end text-5xl font-light leading-none tabular-nums md:text-7xl",
                className
              )}
            >
              <SlidingNumber value={displayValue} />
              <span className="ml-2 text-lg text-neutral-400 md:text-2xl">
                %
              </span>
            </div>
            <div className="h-px w-48 overflow-hidden bg-white/10 md:w-72">
              <motion.div
                className="h-full origin-left bg-neutral-100"
                animate={{ scaleX: displayValue / value }}
                transition={{ ease: "easeOut", duration: 0.2 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
