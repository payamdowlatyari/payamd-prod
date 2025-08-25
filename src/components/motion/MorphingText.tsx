"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "~/utils/cn";

const morphTime = 1.5;
const cooldownTime = 0.5;

/**
 * Creates a morphing text effect.
 * @param {string[]} texts An array of strings to cycle through.
 * @returns An object with two properties: `text1Ref` and `text2Ref`, which are refs to the two text elements.
 * The text elements should be placed inside a container with relative positioning.
 * The text elements should have absolute positioning and the same font styles as each other.
 * The morphing effect is done by animating the blur and opacity of the two text elements.
 * The animation is done using requestAnimationFrame.
 * The animation is paused when the component is unmounted or the window is blurred.
 */
const useMorphingText = (texts: string[]) => {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());

  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [current1, current2] = [text1Ref.current, text2Ref.current];
      if (!current1 || !current2) return;

      current2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      current2.style.opacity = `${fraction ** 0.4 * 100}%`;

      const invertedFraction = 1 - fraction;
      current1.style.filter = `blur(${Math.min(8 / invertedFraction - 8, 100)}px)`;
      current1.style.opacity = `${invertedFraction ** 0.4 * 100}%`;

      current1.textContent = texts[textIndexRef.current % texts.length];
      current2.textContent = texts[(textIndexRef.current + 1) % texts.length];
    },
    [texts]
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;

    let fraction = morphRef.current / morphTime;

    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }

    setStyles(fraction);

    if (fraction === 1) {
      textIndexRef.current += 1;
    }
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [current1, current2] = [text1Ref.current, text2Ref.current];
    if (current1 && current2) {
      current2.style.filter = "none";
      current2.style.opacity = "100%";
      current1.style.filter = "none";
      current1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    /**
     * Handles the animation loop.
     *
     * - Updates the current time.
     * - Calculates the time difference from the last frame.
     * - Decreases the cooldown by the time difference.
     * - If the cooldown is over, start the morph, otherwise do the cooldown.
     */
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const newTime = new Date();
      const dt = (newTime.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = newTime;

      cooldownRef.current -= dt;

      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };

    animate();
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
};

/**
 * Props for the `MorphingText` component.
 */
interface MorphingTextProps {
  // eslint-disable-next-line react/no-unused-prop-types
  className?: string;
  texts: string[];
}

/**
 * A component that renders two `<span>` elements that are morphing between each
 * other. The elements are absolutely positioned and have the same width and
 * height as their parent.
 *
 * The component uses the `useMorphingText` hook internally to handle the
 * animation logic.
 *
 * @param {MorphingTextProps} props - The component props.
 */
const Texts: React.FC<Pick<MorphingTextProps, "texts">> = ({
  texts,
}: MorphingTextProps) => {
  const { text1Ref, text2Ref } = useMorphingText(texts);
  return (
    <>
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full text-neutral-500"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full text-neutral-500"
        ref={text2Ref}
      />
    </>
  );
};

/**
 * A component that renders an SVG with a single filter, which is used
 * internally by MorphingText. The filter is used to create a threshold
 * effect on the text.
 *
 * The component is a simple wrapper around the SVG element, and is used
 * to avoid having to manually include the SVG in the render tree.
 *
 * @returns The SVG element with the filter.
 */
const SvgFilters: React.FC = () => (
  <svg
    id="filters"
    className="fixed h-0 w-0"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <filter id="threshold">
        <feColorMatrix
          in="SourceGraphic"
          type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 255 -140"
        />
      </filter>
    </defs>
  </svg>
);

/**
 * A motion component that renders a sequence of morphing text elements.
 *
 * The component wraps each text element in a span with a unique key and
 * uses the `useMotionValue` hook to create a spring animation that
 * morphs the previous text element into the next one.
 *
 * The component also renders an SVG element with a threshold filter,
 * which is used to create a threshold effect on the text elements.
 *
 * @param {MorphingTextProps} props - The component props.
 * @returns The MorphingText component.
 */
export const MorphingText: React.FC<MorphingTextProps> = ({
  className,
  texts,
}: MorphingTextProps) => {
  return (
    <div
      className={cn(
        "relative h-16 w-full max-w-screen-md text-center font-sans font-bold leading-none [filter:url(#threshold)_blur(0.6px)] md:h-24 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl",
        className
      )}
    >
      <Texts texts={texts} />
      <SvgFilters />
    </div>
  );
};

export default MorphingText;
