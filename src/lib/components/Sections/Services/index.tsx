import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { data } from "./data";

const serviceIcon = (id: number) => {
  switch (id) {
    case 1:
      return (
        <Image
          src="/wired-gradient-1021-rules.gif"
          alt="wired-gradient-1021-rules"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
    case 2:
      return (
        <Image
          src="/wired-gradient-970-video-conference.gif"
          alt="wired-gradient-970-video-conference"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
    case 3:
      return (
        <Image
          src="/wired-gradient-742-code.gif"
          alt="wired-gradient-742-code"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
    case 4:
      return (
        <Image
          src="/wired-gradient-1326-command-window-line.gif"
          alt="wired-gradient-1326-command-window-line"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
    case 5:
      return (
        <Image
          src="/wired-gradient-57-server.gif"
          alt="wired-gradient-57-server"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
    default:
      return (
        <Image
          src="/wired-gradient-966-privacy-policy.gif"
          alt="wired-gradient-966-privacy-policy"
          width={100}
          height={100}
          unoptimized
          loading="lazy"
        />
      );
  }
};

const ServiceItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div layout ref={ref} className="service-section">
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            layout
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            style={{
              willChange,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              flexDirection: service.id % 2 > 0 ? "row-reverse" : "row",
            }}
          >
            <motion.div
              className="service-icon"
              initial={{ x: service.id % 2 > 0 ? 100 : -100 }}
              animate={{ x: 0 }}
              transition={{ delay: 0.5, duration: 0.75, ease: "easeOut" }}
              style={{
                willChange,
              }}
            >
              {serviceIcon(service.id)}
            </motion.div>
            <div>
              <h2>{service.name}</h2>
              <p>{service.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Services() {
  return (
    <section id="services" className="service-wrapper">
      <div className="service-container">
        {data?.map((service) => {
          return <ServiceItem service={service} />;
        })}
      </div>
    </section>
  );
}
