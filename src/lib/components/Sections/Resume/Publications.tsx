import { publication } from "../../data/data";
import { HoverEffect } from "../../motion/Card";

const Publications = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse px-4">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Publications
        </h3>
      </div>
      <div className="max-w-[98vw] flex flex-col justify-evenly">
        <HoverEffect items={publication} />
      </div>
    </div>
  </div>
);

export default Publications;
