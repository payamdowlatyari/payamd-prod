import { motion, useScroll, useTransform, useWillChange } from "framer-motion";
import Icon from "../../motion/Icon";
import { frontend, backend, devops } from "../../data/icons";
import ParallaxText from "../../motion/ParallaxText";
import { useRef } from "react";

const displayByGroup = (icon: any) => {
  return <Icon id={icon.item} title={icon.title} del={Math.random() * 10} />;
};

export const FilterByGroup = ({ group }: any) => {
  const willChange = useWillChange();
  return (
    <motion.div
      layout
      style={{
        willChange,
        display: "grid",
      }}
    >
      <motion.div
        style={{
          willChange,
          alignSelf: "flex-start",
          fontSize: "0.5em",
          margin: "auto",
        }}
      >
        <h2>{group[0].group}</h2>
      </motion.div>
      <motion.div
        layout
        style={{
          willChange,
          margin: "auto",
          padding: "1em 0 5em",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
          whiteSpace: "nowrap",
          justifyContent: "center",
          maxWidth: "300px",
        }}
      >
        {group?.map((icon: any) => {
          return displayByGroup(icon);
        })}
      </motion.div>
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1600, 1800], [0, 1]);
  const scale = useTransform(scrollY, [1500, 1900], [2, 1]);

  return (
    <motion.div layout ref={ref}>
      <motion.div
        layout
        style={{
          willChange,
          height: "5em",
          fontSize: "2em",
          opacity,
          scale,
        }}
      >
        <ParallaxText baseVelocity={-0.1}>
          Professional Skills Technical Skills
        </ParallaxText>
      </motion.div>
      <motion.div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
        }}
      >
        <FilterByGroup group={frontend} />
        <FilterByGroup group={backend} />
        <FilterByGroup group={devops} />
      </motion.div>
    </motion.div>
  );
}
