import { experience } from "../../data/data";

const Experience = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen m-1 z-[1]">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden z-[2]">
        <div className="flex flex-col-reverse px-4">
          <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
            Experience
          </h3>
        </div>

        <div className="w-[750px] flex flex-col justify-evenly">
          {experience?.map((item) => {
            return (
              <div className="bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 rounded-lg mb-4 p-2">
                <div className="flex justify-between flex-wrap gap-2 w-full">
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
                <div className="mt-2 text-sm pl-1">
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
