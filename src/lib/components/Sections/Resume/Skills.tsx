import Image from "next/image";

import { frontend, backend, devops } from "../../data/icons";
import Icon from "../../motion/Icon";

export const FilterByGroup = ({ group }: any) => {
  return (
    <div className="mb-1">
      <div className="m-auto">
        <h4 className="flex items-center text-2xl md:text-3xl font-light">
          {group[0].group}
        </h4>
      </div>
      <div className="flex flex-wrap m-auto whitespace-nowrap max-w-[98vw] py-1">
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
    <div className="flex flex-row items-center h-screen m-1">
      <div className="flex flex-col items-center justify-evenly max-w-[98vw] h-[90vh] overflow-hidden">
        <div className="flex flex-col-reverse items-center px-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.2vw]">
            Skills
          </h3>
          <Image
            src="/wired-gradient-56-document.gif"
            alt="wired-lineal-56-document"
            width={80}
            height={80}
          />
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
