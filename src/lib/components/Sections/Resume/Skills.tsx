import Icon from "../../motion/Icon";
import { frontend, backend, devops } from "../../data/icons";

const displayByGroup = (icon: any) => {
  return <Icon id={icon.item} title={icon.title} del={Math.random() * 10} />;
};

export const FilterByGroup = ({ group }: any) => {
  return (
    <div
      style={{
        display: "grid",
        margin: "5px",
      }}
    >
      <div
        style={{
          alignSelf: "center",
          margin: "auto",
        }}
      >
        <h4>{group[0].group}</h4>
      </div>
      <div
        style={{
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
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div
      className="second"
      style={{
        display: "grid",
        height: "100vh",
        alignItems: "center",
        alignContent: "space-evenly",
        justifyContent: "space-evenly",
      }}
    >
      <FilterByGroup group={frontend} />
      <FilterByGroup group={backend} />
      <FilterByGroup group={devops} />
    </div>
  );
}
