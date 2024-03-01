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
        borderRadius: "5px",
        margin: "5px",
      }}
    >
      <motion.div
        style={{
          willChange,
          alignSelf: "center",
          fontSize: "0.75em",
          margin: "auto",
        }}
      >
        <h3>{group[0].group}</h3>
      </motion.div>
      <motion.div
        layout
        style={{
          willChange,
          margin: "auto",
          padding: "2em 0",
          display: "flex",
          flexWrap: "wrap",
          overflow: "hidden",
          whiteSpace: "nowrap",
          justifyContent: "center",
          maxWidth: "400px",
          minHeight: "300px",
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
  const opacity = useTransform(scrollY, [2800, 3200], [0, 1]);
  const scale = useTransform(scrollY, [2800, 3200], [3, 1]);
  const y = useTransform(scrollY, [6100, 7600], [0, 1500]);

  return (
    <motion.div layout ref={ref}>
      <motion.div
        layout
        style={{
          willChange,
          fontSize: "3em",
          marginTop: "120vh",
          opacity,
          scale,
        }}
      >
        <ParallaxText baseVelocity={-0.1}>
          Professional Skills Technical Skills
        </ParallaxText>
      </motion.div>
      <motion.div
        className="second"
        style={{
          willChange,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
          y,
          opacity,
        }}
      >
        <FilterByGroup group={frontend} />
        <FilterByGroup group={backend} />
        <FilterByGroup group={devops} />
      </motion.div>
    </motion.div>
  );
}
