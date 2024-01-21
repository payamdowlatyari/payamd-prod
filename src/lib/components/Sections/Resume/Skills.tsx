import { AnimatePresence, motion, useInView } from "framer-motion";
import Icon from "../../motion/Icon";
import icons from "../../data/icons";
import { useRef } from "react";
import { ArrowDownIcon } from "@chakra-ui/icons";

export default function Skills() {
  const skills = useRef(null);
  const isInView = useInView(skills);

  return (
    <motion.section
      ref={skills}
      id="skills"
      className="second"
      layoutScroll
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div className="first">
            <motion.h1
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 2,
                delay: 1,
              }}
            >
              skills
            </motion.h1>
            <motion.a href="#projects">
              my projects <br />
              <ArrowDownIcon />
            </motion.a>
            <motion.div className="svg-container">
              <Icon id={icons[0].CSS3} />
              <Icon id={icons[0].HTML5} />
              <Icon id={icons[0].JavaScript} />
              <Icon id={icons[0].TypeScript} />
              <Icon id={icons[1].React} />
              <Icon id={icons[1].Next} />
              <Icon id={icons[1].Vue} />
              <Icon id={icons[1].Angular} />
              <Icon id={icons[2].Node} />
              <Icon id={icons[2].Express} />
              <Icon id={icons[2].Java} />
              <Icon id={icons[2].Spring} />
              <Icon id={icons[3].Mongo} />
              <Icon id={icons[3].MySQL} />
              <Icon id={icons[3].AWS} />
              <Icon id={icons[3].Git} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
