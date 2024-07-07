import Image from "next/image";

import { experience } from "./data";

const Experience = () => {
  return (
    <div className="flex flex-row justify-center items-center h-screen m-1">
      <div className="flex flex-col justify-evenly max-w-[98vw] h-[90vh] overflow-hidden">
        <div className="flex flex-col-reverse items-center px-4">
          <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.2vw]">
            Experience
          </h3>
          <Image
            src="/wired-gradient-187-suitcase.gif"
            alt="wired-lineal-187-suitcase"
            width={80}
            height={80}
          />
        </div>
        <div className="w-[750px] flex flex-col justify-evenly">
          {experience?.map((item) => {
            return (
              <div className="mb-6">
                <div className="flex justify-between flex-wrap gap-2 w-full">
                  <span className="text-apple font-bold uppercase">
                    {item.title}
                  </span>
                  <p>
                    <span className="mr-2 text-sm text-ultra-light-gray">
                      {item.company}
                    </span>
                    <span className="text-sm text-ultra-light-gray">
                      {item.date}
                    </span>
                  </p>
                </div>
                <div className="mt-2 ml-1 text-sm">
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
