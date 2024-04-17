import {
  useWillChange,
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import { data } from "./data";
import { GrSecure } from "react-icons/gr";
import { BsDatabaseCheck } from "react-icons/bs";
import { MdOutlineDevicesOther } from "react-icons/md";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { HiOutlineCommandLine } from "react-icons/hi2";
import { IoMdSwitch } from "react-icons/io";

const serviceIcon = (id: number) => {
  switch (id) {
    case 1:
      return <IoMdSwitch />;
    case 2:
      return <MdOutlineDevicesOther />;
    case 3:
      return <TbDeviceDesktopCode />;
    case 4:
      return <HiOutlineCommandLine />;
    case 5:
      return <BsDatabaseCheck />;
    case 6:
      return <GrSecure />;
    default:
      return <GrSecure />;
  }
};

const ServiceItem = ({ service }: any) => {
  const ref = useRef(null);
  const willChange = useWillChange();
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div layout ref={ref} className="service-section second">
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
  const willChange = useWillChange();
  const ref = useRef(null);

  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [2000, 4200], [0, 2500]);

  return (
    <motion.section
      ref={ref}
      id="services"
      className="service-wrapper"
      layoutScroll
    >
      <motion.div
        className="section-number"
        style={{
          margin: "auto",
          willChange,
          y,
        }}
      >
        <span>02</span>
      </motion.div>
      <div className="service-container">
        {data?.map((service) => {
          return <ServiceItem service={service} />;
        })}
      </div>
    </motion.section>
  );
}
