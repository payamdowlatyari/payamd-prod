import Icon from "../../motion/Icon";
import { uxui, frontend, backend, devops } from "../../data/icons";
import { FcTodoList } from "react-icons/fc";

export const FilterByGroup = ({ group }: any) => {
  return (
    <div className="skill-group second">
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
      <div className="resume-header">
        <FcTodoList />
      </div>
      <div className="resume-body">
        <div className="resume-title">
          <h3>Skills</h3>
        </div>
        <div className="resume-skills-content second">
          <FilterByGroup group={uxui} />
          <FilterByGroup group={frontend} />
          <FilterByGroup group={backend} />
          <FilterByGroup group={devops} />
        </div>
      </div>
    </div>
  );
}
