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

import { wrap } from "./utils/wrap";

interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

export default function ParallaxText({
  children,
  baseVelocity = 100,
}: ParallaxProps) {
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
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap m-0 tracking-[-2px] leading-[0.8] z-[2]">
      <motion.div
        className="uppercase flex whitespace-nowrap flex-nowrap mix-blend-difference tracking-[-2px]"
        style={{ x }}
      >
        <span className="block mr-5 text-4xl md:text-5xl lg:text-6xl from-gray-200 via-gray-300 to-gray-400 bg-gradient-to-r bg-clip-text text-transparent">
          {children}{" "}
        </span>
        <span className="block mr-5 text-4xl md:text-5xl lg:text-6xl from-gray-500 via-gray-400 to-gray-300 bg-gradient-to-r bg-clip-text text-transparent">
          {children}{" "}
        </span>
        <span className="block mr-5 text-4xl md:text-5xl lg:text-6xl from-gray-200 via-gray-300 to-gray-400 bg-gradient-to-r bg-clip-text text-transparent">
          {children}{" "}
        </span>
        <span className="block mr-5 text-4xl md:text-5xl lg:text-6xl from-gray-500 via-gray-400 to-gray-300 bg-gradient-to-r bg-clip-text text-transparent">
          {children}{" "}
        </span>
      </motion.div>
    </div>
  );
}
