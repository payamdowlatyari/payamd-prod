import Image from "next/image";
import React from "react";

import { education } from "../../data/data";

const Education = () => (
  <div className="flex flex-row flex-wrap justify-center items-center h-screen max-w-[100vw] overflow-hidden m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse items-center px-4">
        <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.2vw]">
          Education
        </h3>
        <Image
          src="/wired-gradient-486-school.gif"
          alt="wired-lineal-486-school"
          width={80}
          height={80}
        />
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {education?.map(({ school, major, date, description }) => (
          <React.Fragment key={school}>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-apple font-bold uppercase">{school}</span>
                <p>
                  <span className="mr-2 text-sm text-ultra-light-gray">
                    {major}
                  </span>
                  <span className="text-sm text-ultra-light-gray">{date}</span>
                </p>
              </div>
              <div className="mt-2 ml-1 text-sm">
                {description?.map((desc) => (
                  <p className="mb-2" key={desc}>
                    {desc}
                  </p>
                ))}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default Education;
