import { motion } from "framer-motion";
import HelperImage from "../Sections/HelperImage";
import { Badge } from "@chakra-ui/react";

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
  return (
    <motion.div
      style={{
        width: "100%",
      }}
    >
      <motion.div>
        {/* <div style={{ background: 'rgba(0,0,0,0.5)', width: '10em', height: '10em', position: 'fixed'}}/> */}
        <HelperImage src={item.img} label={item.title} />
      </motion.div>
      <motion.div>
        <motion.a href={item.url}>
          <motion.h3>{item.title}</motion.h3>
        </motion.a>
        <motion.p>{item.description}</motion.p>
        {getTags(item.tags)}
      </motion.div>
    </motion.div>
  );
}
