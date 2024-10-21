import { experience } from "../../data/data";
import { HoverEffect } from "../../motion/Card";

const Experience = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen m-1 z-[1]">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden z-[2]">
        <div className="flex flex-col-reverse px-4">
          <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
            Experience
          </h3>
        </div>

        <div className="max-w-[98vw] flex flex-col justify-evenly">
          <HoverEffect items={experience} />
        </div>
      </div>
    </div>
  );
};

export default Experience;
