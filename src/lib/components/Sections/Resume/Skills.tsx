import {
  AnimatePresence,
  motion,
  useInView,
  useWillChange,
} from "framer-motion";
import Icon from "../../motion/Icon";
import { skillIcons } from "../../data/icons";
import { useRef } from "react";

export default function Skills() {
  const skills = useRef(null);
  const isInView = useInView(skills);
  const willChange = useWillChange();

  return (
    <motion.div ref={skills}>
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            style={{
              willChange,
              backgroundImage:
                "linear-gradient(to right, #434343 0%, black 100%)",
              display: "flex",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
          >
            <h3 style={{ padding: "0.5em" }}>Skills</h3>
            <motion.div
              style={{
                willChange,
                display: "flex",
                flexWrap: "wrap",
                overflow: "hidden",
                whiteSpace: "nowrap",
                margin: "5px 0",
                padding: "1em",
              }}
            >
              {skillIcons?.map((icon: any) => {
                return (
                  <Icon
                    id={icon.item}
                    title={icon.title}
                    del={Math.random() * 10}
                  />
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
