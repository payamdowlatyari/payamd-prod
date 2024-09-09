import { frontend, backend, devops } from "../../data/icons";
import Icon from "../../motion/Icon";

export const FilterByGroup = ({ group }: any) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 rounded-lg mb-4 p-2">
      <div className="m-auto rounded-sm">
        <h4 className="flex items-center text-2xl md:text-3xl m-2 font-medium">
          {group[0].group}
        </h4>
      </div>
      <div className="flex flex-wrap m-auto whitespace-nowrap max-w-[98vw] py-1">
        {group?.map((icon: any) => {
          return <Icon id={icon.item} title={icon.title} />;
        })}
      </div>
    </div>
  );
};

export default function Skills() {
  return (
    <div className="flex flex-row items-center h-screen m-1">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden">
        <div className="flex flex-col-reverse px-4">
          <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
            Skills
          </h3>
        </div>
        <div className="flex flex-col max-w-[100vw] max-h-[80vh]">
          <FilterByGroup group={frontend} />
          <FilterByGroup group={backend} />
          <FilterByGroup group={devops} />
        </div>
      </div>
    </div>
  );
}
