/* eslint-disable react/no-array-index-key */

"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

import { cn } from "./utils/cn";

/**
 * A component that renders a series of animated background beams with collision detection.
 *
 * @param {React.ReactNode} children - The content to render inside the background beams.
 * @param {string} [className] - Optional additional class names for styling the container.
 * @returns {JSX.Element} A React component rendering the background beams with collision detection.
 *
 * The component uses a set of predefined beams with various animation properties such as
 * initial position, translation, duration, delay, and repeat delay. Each beam is rendered using
 * the `CollisionMechanism` component, which handles the animation and collision detection logic.
 * The container and its children are styled to occupy full height and width, with optional custom
 * class names for additional styling.
 */
export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "h-full bg-transparent relative flex items-center w-full justify-center overflow-hidden",
        // h-screen if you want bigger
        className
      )}
    >
      {beams.map((beam) => (
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        <CollisionMechanism
          key={`${beam.initialX}beam-idx`}
          beamOptions={beam}
          containerRef={containerRef}
          parentRef={parentRef}
        />
      ))}

      {children}
      <div
        ref={containerRef}
        className="absolute bottom-0 bg-neutral-100 w-full z-10 inset-x-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset",
        }}
      />
    </div>
  );
};

const CollisionMechanism = React.forwardRef<
  HTMLDivElement,
  {
    containerRef: React.RefObject<HTMLDivElement>;
    parentRef: React.RefObject<HTMLDivElement>;
    beamOptions?: {
      initialX?: number;
      translateX?: number;
      initialY?: number;
      translateY?: number;
      rotate?: number;
      className?: string;
      duration?: number;
      delay?: number;
      repeatDelay?: number;
    };
  }
>(({ parentRef, containerRef, beamOptions = {} }) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        containerRef.current &&
        parentRef.current &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const relativeX =
            beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          setCollision({
            detected: true,
            coordinates: {
              x: relativeX,
              y: relativeY,
            },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);

    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, containerRef, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prevKey) => prevKey + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        animate="animate"
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        variants={{
          animate: {
            translateY: beamOptions.translateY || "1800px",
            translateX: beamOptions.translateX || "0px",
            rotate: beamOptions.rotate || 0,
          },
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-indigo-500 via-violet-300 to-transparent",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          <Explosion
            key={`${collision.coordinates.x}-${collision.coordinates.y}`}
            className=""
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

/**
 * Explosion animation component.
 *
 * This component renders an explosion animation at the specified position,
 * using a combination of a gradient background and a series of moving spans to
 * create a burst effect.
 *
 * @param {Object} props - props to be passed to the component
 * @param {string} [props.className] - additional class names for styling
 *
 * @returns {JSX.Element} A JSX element representing the explosion animation.
 */
const Explosion = ({
  ...props
}: React.HTMLProps<HTMLDivElement>): JSX.Element => {
  const spans = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    initialX: 0,
    initialY: 0,
    directionX: Math.floor(Math.random() * 80 - 40),
    directionY: Math.floor(Math.random() * -50 - 10),
  }));

  return (
    // eslint-disable-next-line react/prop-types
    <div {...props} className={cn("absolute z-50 h-2 w-2", props.className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent blur-sm"
      />
      {spans.map((span) => (
        <motion.span
          key={span.id}
          initial={{ x: span.initialX, y: span.initialY, opacity: 1 }}
          animate={{
            x: span.directionX,
            y: span.directionY,
            opacity: 0,
          }}
          transition={{ duration: Math.random() * 1.5 + 0.5, ease: "easeOut" }}
          className="absolute h-1 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-lightBlue-500"
        />
      ))}
    </div>
  );
};

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
      "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
      "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
      "M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819",
      "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
      "M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803",
      "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
      "M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787",
      "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
      "M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771",
      "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
      "M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755",
      "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
      "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
      "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
      "M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723",
      "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
      "M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707",
      "M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699",
      "M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691",
      "M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683",
      "M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675",
      "M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667",
      "M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659",
      "M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651",
      "M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643",
      "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
      "M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627",
      "M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619",
      "M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611",
      "M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603",
      "M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595",
      "M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587",
      "M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579",
      "M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571",
      "M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563",
      "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
      "M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547",
      "M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539",
      "M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531",
      "M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523",
      "M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515",
      "M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507",
      "M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499",
      "M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491",
      "M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483",
    ];
    return (
      <div
        className={cn(
          "absolute h-full w-full inset-0  [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center",
          className
        )}
      >
        <svg
          className=" z-0 h-full w-full pointer-events-none absolute "
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827M-331 -245C-331 -245 -263 160 201 287C665 414 733 819 733 819M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811M-317 -261C-317 -261 -249 144 215 271C679 398 747 803 747 803M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795M-303 -277C-303 -277 -235 128 229 255C693 382 761 787 761 787M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779M-289 -293C-289 -293 -221 112 243 239C707 366 775 771 775 771M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763M-275 -309C-275 -309 -207 96 257 223C721 350 789 755 789 755M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731M-247 -341C-247 -341 -179 64 285 191C749 318 817 723 817 723M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715M-233 -357C-233 -357 -165 48 299 175C763 302 831 707 831 707M-226 -365C-226 -365 -158 40 306 167C770 294 838 699 838 699M-219 -373C-219 -373 -151 32 313 159C777 286 845 691 845 691M-212 -381C-212 -381 -144 24 320 151C784 278 852 683 852 683M-205 -389C-205 -389 -137 16 327 143C791 270 859 675 859 675M-198 -397C-198 -397 -130 8 334 135C798 262 866 667 866 667M-191 -405C-191 -405 -123 0 341 127C805 254 873 659 873 659M-184 -413C-184 -413 -116 -8 348 119C812 246 880 651 880 651M-177 -421C-177 -421 -109 -16 355 111C819 238 887 643 887 643M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635M-163 -437C-163 -437 -95 -32 369 95C833 222 901 627 901 627M-156 -445C-156 -445 -88 -40 376 87C840 214 908 619 908 619M-149 -453C-149 -453 -81 -48 383 79C847 206 915 611 915 611M-142 -461C-142 -461 -74 -56 390 71C854 198 922 603 922 603M-135 -469C-135 -469 -67 -64 397 63C861 190 929 595 929 595M-128 -477C-128 -477 -60 -72 404 55C868 182 936 587 936 587M-121 -485C-121 -485 -53 -80 411 47C875 174 943 579 943 579M-114 -493C-114 -493 -46 -88 418 39C882 166 950 571 950 571M-107 -501C-107 -501 -39 -96 425 31C889 158 957 563 957 563M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555M-93 -517C-93 -517 -25 -112 439 15C903 142 971 547 971 547M-86 -525C-86 -525 -18 -120 446 7C910 134 978 539 978 539M-79 -533C-79 -533 -11 -128 453 -1C917 126 985 531 985 531M-72 -541C-72 -541 -4 -136 460 -9C924 118 992 523 992 523M-65 -549C-65 -549 3 -144 467 -17C931 110 999 515 999 515M-58 -557C-58 -557 10 -152 474 -25C938 102 1006 507 1006 507M-51 -565C-51 -565 17 -160 481 -33C945 94 1013 499 1013 499M-44 -573C-44 -573 24 -168 488 -41C952 86 1020 491 1020 491M-37 -581C-37 -581 31 -176 495 -49C959 78 1027 483 1027 483M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475M-23 -597C-23 -597 45 -192 509 -65C973 62 1041 467 1041 467M-16 -605C-16 -605 52 -200 516 -73C980 54 1048 459 1048 459M-9 -613C-9 -613 59 -208 523 -81C987 46 1055 451 1055 451M-2 -621C-2 -621 66 -216 530 -89C994 38 1062 443 1062 443M5 -629C5 -629 73 -224 537 -97C1001 30 1069 435 1069 435M12 -637C12 -637 80 -232 544 -105C1008 22 1076 427 1076 427M19 -645C19 -645 87 -240 551 -113C1015 14 1083 419 1083 419"
            stroke="url(#paint0_radial_242_278)"
            strokeOpacity="0.05"
            strokeWidth="0.5"
          />

          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.1"
              strokeWidth="0.5"
            />
          ))}
          <defs>
            {paths.map((path, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                initial={{
                  x1: "0%",
                  x2: "0%",
                  y1: "0%",
                  y2: "0%",
                }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${93 + Math.random() * 8}%`],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: Math.random() * 10,
                }}
              >
                <stop stopColor="#18CCFC" stopOpacity="0" />
                <stop stopColor="#18CCFC" />
                <stop offset="32.5%" stopColor="#6344F5" />
                <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
              </motion.linearGradient>
            ))}

            <radialGradient
              id="paint0_radial_242_278"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(352 34) rotate(90) scale(555 1560.62)"
            >
              <stop offset="0.0666667" stopColor="var(--neutral-300)" />
              <stop offset="0.243243" stopColor="var(--neutral-300)" />
              <stop offset="0.43594" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";

/**
 * A single beam element that animates a gradient from left to right.
 *
 * The `Beam` component is an SVG element that renders a single beam with a gradient
 * animation. The gradient animation moves from left to right and repeats indefinitely.
 *
 * @returns A JSX element representing a single beam.
 */
export const Beam = () => {
  return (
    <svg
      width="156"
      height="63"
      viewBox="0 0 156 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 ml-72 -mt-32"
    >
      <path
        d="M31 .5h32M0 .5h32m30 31h32m-1 0h32m-1 31h32M62.5 32V0m62 63V31"
        stroke="url(#grad1)"
        strokeWidth={1.5}
      />
      <defs>
        <motion.linearGradient
          variants={{
            initial: {
              x1: "40%",
              x2: "50%",
              y1: "160%",
              y2: "180%",
            },
            animate: {
              x1: "0%",
              x2: "10%",
              y1: "-40%",
              y2: "-20%",
            },
          }}
          animate="animate"
          initial="initial"
          transition={{
            duration: 1.8,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
            repeatDelay: 2,
          }}
          id="grad1"
        >
          <stop stopColor="#18CCFC" stopOpacity="0" />
          <stop stopColor="#18CCFC" />
          <stop offset="0.325" stopColor="#6344F5" />
          <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
/**
 * A component that renders a beam of light and its children.
 *
 * The `GridBeam` component is a convenience wrapper around the `Beam` component.
 * It renders a single beam of light and its children inside a container
 * element. The container element is a `div` with a class name that is the
 * result of merging the `className` prop with the `cn` function.
 *
 * @param {React.ReactNode} children - The content of the component.
 * @param {string} className - The class name of the container element.
 * @returns A JSX element representing the component.
 */
export const GridBeam: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("relative w-full h-full", className)}>
    <Beam />
    {children}
  </div>
);
