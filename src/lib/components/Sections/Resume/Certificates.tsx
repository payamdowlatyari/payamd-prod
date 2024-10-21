import { certificate } from "../../data/data";
import { HoverEffect } from "../../motion/Card";

const Certificates = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse p-2">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Certificates
        </h3>
      </div>
      <div className="max-w-[98vw] flex flex-col justify-evenly">
        <HoverEffect items={certificate} />
      </div>
    </div>
  </div>
);

export default Certificates;
