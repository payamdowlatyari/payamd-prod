import Image from "next/image";

import { uxui, frontend, backend, devops } from "../../data/icons";
import Icon from "../../motion/Icon";

export const FilterByGroup = ({ group }: any) => {
  return (
    <div className="m-1">
      <div className="m-auto">
        <h4 className="flex justify-center items-center text-2xl md:text-3xl font-light">
          {group[0].group}
        </h4>
      </div>
      <div className="flex flex-wrap justify-center m-auto whitespace-nowrap max-w-[400px] py-1">
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
    <div className="flex flex-row justify-center items-center h-screen m-1">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden">
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
        <div className="flex justify-center max-w-[100vw] max-h-[80vh]">
          <FilterByGroup group={uxui} />
          <FilterByGroup group={frontend} />
          <FilterByGroup group={backend} />
          <FilterByGroup group={devops} />
        </div>
      </div>
    </div>
  );
}
