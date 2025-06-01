import BlurFade from "~/components/motion/BlurFade";

/**
 * A h1 element with a blur fade animation.
 *
 * @param {string} label - The label to render as the h1 element's content.
 */
const H1 = ({ label }: { label: string }) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-tighter">
      {label}
    </h1>
  </BlurFade>
);

/**
 * A h2 element with a blur fade animation.
 *
 * @param {string} label - The label to render as the h2 element's content.
 */
const H2 = ({ label }: { label: string }) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <h2 className="text-4xl sm:text-5xl md:text-6xl">{label}</h2>
  </BlurFade>
);

/**
 * A h3 element with a blur fade animation.
 *
 * @param {string} label - The label to render as the h3 element's content.
 */
const H3 = ({ label }: { label: string }) => (
  <h3 className="text-3xl sm:text-4xl md:text-5xl max-w-md text-neutral-200">
    {label}
  </h3>
);

/**
 * A h4 element with a blur fade animation.
 *
 * @param {string} label - The label to render as the h4 element's content.
 */
const H4 = ({ label }: { label: string }) => (
  <h4 className="text-2xl sm:text-3xl md:text-4xl max-w-md text-neutral-200">
    {label}
  </h4>
);

/**
 * A p element with a blur fade animation.
 *
 * @param {string} text - The text to render as the p element's content.
 */
const Paragraph = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => (
  <BlurFade blur="6px" duration={0.4} delay={0.3} inView>
    <p
      className={`text-neutral-300 max-w-screen-sm text-xs sm:text-sm md:text-base ${className}`}
    >
      {text}
    </p>
  </BlurFade>
);

export { H1, H2, H3, H4, Paragraph };
