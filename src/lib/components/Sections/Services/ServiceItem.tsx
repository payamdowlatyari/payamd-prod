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
      className="px-2 py-4 min-h-[40vh] max-w-[95vw] z-[1]"
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeIn" }}
            style={{
              willChange,
            }}
            className={`flex flex-wrap items-center ${service.id % 2 > 0 ? "flex-row-reverse" : "flex-row"}`}
          >
            <motion.div
              className="w-[500px]"
              initial={{ x: service.id % 2 > 0 ? 100 : -100 }}
              animate={{ x: 0 }}
              transition={{ delay: 1, duration: 0.75, ease: "easeOut" }}
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
                className="w-24 h-24 m-auto mb-2"
              />
            </motion.div>
            <div className="w-[500px] m-1 p-1">
              <h2 className="text-2xl lg:text-4xl capitalize font-medium text-gray-300 mb-2">
                {service.name}
              </h2>
              <p className="text-sm lg:text-base font-light text-gray-100">
                {service.text}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
