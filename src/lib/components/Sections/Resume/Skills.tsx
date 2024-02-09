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
        margin: "auto",
        padding: "1em 0",
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
        whiteSpace: "nowrap",
        justifyContent: "center",
      }}
    >
      {group?.map((icon: any) => {
        return displayByGroup(icon);
      })}
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const willChange = useWillChange();

  const { scrollY } = useScroll({ target: ref });
  const opacity = useTransform(scrollY, [1500, 1800], [0, 1]);
  const y = useTransform(scrollY, [1500, 1800], [100, 0]);
  const scale = useTransform(scrollY, [1400, 1900], [1, 0.6]);

  return (
    <motion.div
      layout
      style={{
        willChange,
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <motion.div
        layout
        style={{
          willChange,
          scale,
          padding: "1em 0",
          margin: "auto",
        }}
      >
        <h1>Skills</h1>
      </motion.div>
      <motion.div
        layout
        style={{
          willChange,
          opacity,
          y,
          padding: "1em 0",
          overflow: "hidden",
          textAlign: "center",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "600px",
          margin: "auto",
        }}
      >
        <div>
          <ParallaxText baseVelocity={-0.1}>
            Frontend Development UI/UX Design Client
          </ParallaxText>
        </div>
        <div>
          <FilterByGroup group={frontend} />
        </div>
        <div>
          <ParallaxText baseVelocity={0.1}>
            Backend Development Database API Server
          </ParallaxText>
        </div>
        <div>
          <FilterByGroup group={backend} />
        </div>
        <div>
          <ParallaxText baseVelocity={-0.1}>
            DevOps Cloud Services Testing Model
          </ParallaxText>
        </div>
        <div>
          <FilterByGroup group={devops} />
        </div>
      </motion.div>
    </motion.div>
  );
}
