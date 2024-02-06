import { motion, useWillChange } from "framer-motion";
import { Badge } from "@chakra-ui/react";
import { useRef } from "react";
import { FiArrowUpRight } from "react-icons/fi";

const getTags = (tags: any) => {
  return (
    <span>
      {tags?.map((tag: any) => {
        return (
          <Badge colorScheme="gray" m={1} size="sm">
            {tag}
          </Badge>
        );
      })}
    </span>
  );
};

export default function Card({ item }: any) {
  const ref = useRef(null);
  const willChange = useWillChange();
  return (
    <motion.div
      layoutRoot
      ref={ref}
      style={{
        width: "100%",
      }}
    >
      <figure style={{ position: "relative" }}>
        <img
          src={item.img}
          alt={item.title}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "auto",
          }}
        />
        <div
          style={{
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
              padding: "1em",
              maxWidth: "30em",
              fontSize: "small",
            }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.3, ease: "backInOut" },
            }}
          >
            <a href={item.url}>
              <h3>
                {item.title} <FiArrowUpRight style={{ display: "inline" }} />
              </h3>
            </a>
            <p>{item.description}</p>
            {getTags(item.tags)}
          </motion.div>
        </div>
      </figure>
    </motion.div>
  );
}
