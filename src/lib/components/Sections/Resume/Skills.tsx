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
  // const time = useTime()
  // const baseX = useMotionValue(0)
  const willChange = useWillChange();

  // const x = useTransform(baseX, (v) => `${wrap(-30, 35, v)}%`);
  // const directionFactor = useRef<number>(1);
  // useAnimationFrame((delta) => {
  //   let moveBy = directionFactor.current * (delta / 10000);
  //     directionFactor.current = 0.01;

  //   moveBy += directionFactor.current * moveBy;

  //   baseX.set(baseX.get() + moveBy);
  // });
  return (
    <motion.div ref={skills} id="skills">
      <h3 style={{ padding: "0.5em" }}>Skills</h3>
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            style={{
              willChange,
              display: "flex",
              flexWrap: "wrap",
              overflow: "hidden",
              maxWidth: "100vw",
              margin: "5px 0",
              padding: "1em",
            }}
          >
            {skillIcons?.map((icon: any) => {
              return <Icon id={icon.item} title={icon.title} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
