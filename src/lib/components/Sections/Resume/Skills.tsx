import Image from "next/image";

import { uxui, frontend, backend, devops } from "../../data/icons";
import Icon from "../../motion/Icon";

export const FilterByGroup = ({ group }: any) => {
  return (
    <div className="skill-group">
      <div className="skills-header">
        <h4>{group[0].group}</h4>
      </div>
      <div className="skills-content">
        {group?.map((icon: any) => {
          return (
            <Icon id={icon.item} title={icon.title} del={Math.random() * 3} />
          );
        })}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="resume-section">
      <div className="resume-body">
        <div className="resume-title">
          <h3>Skills</h3>
          <Image
            src="/wired-gradient-56-document.gif"
            alt="wired-lineal-56-document"
            width={100}
            height={100}
          />
        </div>
        <div className="resume-skills-content">
          <FilterByGroup group={uxui} />
          <FilterByGroup group={frontend} />
          <FilterByGroup group={backend} />
          <FilterByGroup group={devops} />
        </div>
      </div>
    </div>
  );
}
