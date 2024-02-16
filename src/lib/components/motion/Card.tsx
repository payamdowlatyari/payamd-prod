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
        height: "auto",
      }}
    >
      <figure style={{ position: "relative" }}>
        <motion.img
          src={item.img}
          alt={item.title}
          style={{
            objectFit: "cover",
            borderRadius: "5px",
            width: "100%",
            height: "auto",
          }}
        />

        <div
          style={{
            position: "absolute",
            display: "grid",
            borderRadius: "5px",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
          }}
        >
          <motion.div
            style={{
              willChange,
              padding: "1em",
              display: "grid",
              justifyContent: "center",
              alignContent: "flex-end",
              fontSize: "small",
              background: "rgba(0, 0, 0, 0.5)",
              color: "#e1e1e1",
              boxShadow: "1px 1px 5px 1px #333",
            }}
            whileHover={{
              boxShadow: "1px 1px 10px 1px #333",
              background: "rgba(0, 0, 0, 0.8)",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <a href={item.url}>
              <h6>
                {item.title} <FiArrowUpRight style={{ display: "inline" }} />
              </h6>
            </a>
            <p>{item.description}</p>
            {getTags(item.tags)}
          </motion.div>
        </div>
      </figure>
    </motion.div>
  );
}
