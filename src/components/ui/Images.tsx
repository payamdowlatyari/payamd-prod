import Image from "next/image";

import BlurFade from "~/components/motion/BlurFade";

/**
 * Renders an image for the introduction section.
 */
export const IntroImage = () => (
  <BlurFade
    className="w-52 justify-self-center sm:w-64 md:w-full md:max-w-80 md:justify-self-end"
    inView
    blur="xl"
    duration={0.8}
    delay={0.5}
  >
    <Image
      src="/me-home-bw.webp"
      alt="Black-and-white portrait of Payam Dowlatyari"
      className="aspect-square h-auto w-full rounded-xl border border-border object-cover"
      width={500}
      height={500}
      sizes="(min-width: 768px) 320px, (min-width: 640px) 256px, 208px"
      priority
    />
  </BlurFade>
);

/**
 * Renders an image for the camera section.
 */
export const CameraImage = () => (
  <BlurFade
    className="inset-0 flex items-center justify-center"
    inView
    blur="xl"
    duration={0.8}
    delay={0.5}
  >
    <Image
      src="/leaf.jpeg"
      alt="me with camera"
      width={500}
      height={300}
      className="w-full h-full max-w-xl object-cover opacity-80"
    />
  </BlurFade>
);
