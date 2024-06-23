import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";

const serviceIcon = (id: number) => {
  switch (id) {
    case 1:
      return (
        <img
          src="wired-gradient-1021-rules.gif"
          alt="wired-gradient-1021-rules"
        />
      );
    case 2:
      return (
        <img
          src="wired-gradient-970-video-conference.gif"
          alt="wired-gradient-970-video-conference"
        />
      );
    case 3:
      return (
        <img src="wired-gradient-742-code.gif" alt="wired-gradient-742-code" />
      );
    case 4:
      return (
        <img
          src="wired-gradient-1326-command-window-line.gif"
          alt="wired-gradient-1326-command-window-line"
        />
      );
    case 5:
      return (
        <img
          src="wired-gradient-57-server.gif"
          alt="wired-gradient-57-server"
        />
      );
    case 6:
      return (
        <img
          src="wired-gradient-966-privacy-policy.gif"
          alt="wired-gradient-966-privacy-policy"
        />
      );
    default:
      return (
        <img
          src="wired-gradient-966-privacy-policy.gif"
          alt="wired-gradient-966-privacy-policy"
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
