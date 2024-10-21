import { education } from "../../data/data";
import { HoverEffect } from "../../motion/Card";
// import { MagicCard } from "../../motion/MagicCard";

const Education = () => (
  <div className="flex flex-row flex-wrap justify-center items-center h-screen max-w-[100vw] overflow-hidden m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse px-4">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Education
        </h3>
      </div>
      <div className="max-w-[98vw] flex flex-col justify-evenly">
        <HoverEffect items={education} />
      </div>
    </div>
  </div>
);

export default Education;
