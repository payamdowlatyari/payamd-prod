import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export const ServiceItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      layout
      ref={ref}
      className="px-2 py-4 min-h-[40vh] max-w-[95vw]"
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            style={{
              willChange,
            }}
            className={`flex flex-wrap items-center ${service.id % 2 > 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            <motion.div
              className="w-[500px]"
              initial={{ x: service.id % 2 > 0 ? 100 : -100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
              style={{
                willChange,
              }}
            >
              <Image
                src={service.src}
                alt="service-icon"
                width={100}
                height={100}
                unoptimized
                loading="lazy"
                className="w-[100px] h-[100px] m-auto"
              />
            </motion.div>
            <div className="w-[500px] m-1 p-1">
              <h2 className="text-2xl lg:text-4xl capitalize font-light">
                {service.name}
              </h2>
              <p className="text-sm lg:text-base font-thin ml-2">
                {service.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
