import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useTime,
  useTransform,
  useWillChange,
} from "framer-motion";
import Icon from "../../motion/Icon";
import { skillIcons } from "../../data/icons";
import { useRef } from "react";
import { wrap } from "@motionone/utils";

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
    <motion.div
      ref={skills}
      id="skills"
      // layoutScroll
      style={
        {
          // display: "flex",
          // flexWrap: "nowrap",
          // justifyContent: "center",
          // overflow: 'hidden',
          // maxWidth: '100vw',
          // willChange,
          // x
        }
      }
    >
      <AnimatePresence initial={false}>
        {isInView && (
          <motion.div
            style={{
              willChange,
              display: "flex",
              flexWrap: "wrap",
              placeContent: "center",
              justifyContent: "space-evenly",
              overflow: "hidden",
              maxWidth: "100vw",
              margin: "5px 0",
            }}
          >
            {skillIcons?.map((icon: any) => {
              return <Icon key={icon.title} id={icon.item} del={1} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
