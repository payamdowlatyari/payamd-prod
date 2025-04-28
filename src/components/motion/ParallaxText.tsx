import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { useRef } from "react";

import { wrap } from "~/utils/wrap";

interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

/**
 * A component that renders a parallax scrolling text effect.
 * @param {React.ReactNode} children - The text to be rendered.
 * @returns {JSX.Element}
 */
export default function ParallaxText({
  children,
  baseVelocity = 100,
}: ParallaxProps): JSX.Element {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 500], [0, 500], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <motion.div
      className="uppercase flex whitespace-nowrap flex-nowrap -tracking-wide"
      style={{ x }}
    >
      {[1, 2, 3, 4].map((index) => (
        <span
          key={index}
          className="block mr-5 text-5xl md:text-7xl lg:text-8xl font-bold text-neutral-600"
        >
          {children}{" "}
        </span>
      ))}
    </motion.div>
  );
}
