import { experience } from "../../data/data";
import { MagicCard } from "../../motion/MagicCard";

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
          {experience?.map((item) => {
            return (
              <MagicCard className="cursor-pointer flex-col items-stretch justify-center shadow-2xl whitespace-nowrap m-1 p-1">
                <div className="flex justify-between flex-wrap gap-1 sm:gap-2">
                  <p>
                    <span className="font-bold uppercase">{item.title}</span>
                    <span className="text-neutral-300 font-thin ml-2">
                      {item.company}
                    </span>
                  </p>
                  <p>
                    <span className="inline-flex items-center mx-1 text-sm">
                      {item.date}
                    </span>
                  </p>
                </div>
                <div className="mt-1 sm:mt-2 text-xs sm:text-sm pl-1">
                  {item.description?.map((desc) => {
                    return <p className="mb-1">{desc}</p>;
                  })}
                </div>
              </MagicCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
