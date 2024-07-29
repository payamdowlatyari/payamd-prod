import { experience } from "../../data/data";

const Experience = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen m-1">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden z-[2]">
        <div className="flex flex-col-reverse px-4">
          <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
            Experience
          </h3>
        </div>
        <div className="w-[750px] flex flex-col justify-evenly">
          {experience?.map((item) => {
            return (
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="font-bold uppercase">{item.title}</span>
                  <p>
                    <span className="mr-2 text-sm text-neutral-300">
                      {item.company}
                    </span>
                    <span className="text-sm text-neutral-300">
                      {item.date}
                    </span>
                  </p>
                </div>
                <div className="mt-2 ml-1 text-sm border-l-2 pl-2 border-neutral-300">
                  {item.description?.map((desc) => {
                    return <p className="mb-1">{desc}</p>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
