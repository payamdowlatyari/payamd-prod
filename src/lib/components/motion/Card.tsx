import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";
import { Badge } from "@chakra-ui/react";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const getTags = (tags: any) => {
  return (
    <span>
      {tags?.map((tag: any) => {
        return (
          <Badge colorScheme="gray" ml={2}>
            {tag}
          </Badge>
        );
      })}
    </span>
  );
};

export default function Card({ item }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const willChange = useWillChange();
  return (
    <motion.div
      layoutRoot
      ref={ref}
      style={{
        width: "100%",
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.figure
            style={{ position: "relative", willChange }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: "backOut",
            }}
          >
            <motion.img
              src={item.img}
              alt={item.title}
              style={{
                objectFit: "cover",
                width: "100%",
                height: "auto",
              }}
            />
            <motion.div
              style={{
                willChange,
                position: "absolute",
                display: "grid",
                background: "rgba(0, 0, 0, 0.8)",
                left: "0",
                top: "0",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <motion.div
                style={{
                  willChange,
                  backdropFilter: "brightness(0.5",
                  padding: "1em",
                  maxWidth: "25em",
                }}
                whileHover={{
                  scale: 1.1,
                  transition: { duration: 0.3, ease: "backInOut" },
                }}
              >
                <a href={item.url}>
                  <h3>
                    {item.title}{" "}
                    <FiArrowUpRight style={{ display: "inline" }} />
                  </h3>
                </a>
                <motion.p>{item.description}</motion.p>
                {getTags(item.tags)}
              </motion.div>
            </motion.div>
          </motion.figure>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
