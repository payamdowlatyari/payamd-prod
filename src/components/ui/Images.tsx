import Image from "next/image";
import BlurFade from "../motion/BlurFade";

/**
 * Renders an image for the introduction section.
 */
export const IntroImage = () => (
  <BlurFade
    className="w-72 sm:w-80 md:w-96 h-auto"
    inView
    blur="xl"
    duration={0.8}
    delay={0.5}
  >
    <Image
      src="/me-home-bw-removebg.png"
      alt="me"
      className="shadow-lg object-cover"
      width={384}
      height={512}
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
      src="/me-camera-removebg-3.webp"
      alt="me with camera"
      width={500}
      height={300}
      className="w-full h-full max-w-xl object-cover opacity-80"
    />
  </BlurFade>
);
