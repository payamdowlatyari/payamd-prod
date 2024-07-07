import Image from "next/image";
import React from "react";

import LinkOut from "../../motion/View/LinkOut";

import { certificate } from "./data";

const Certificates = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse items-center p-2">
        <h3 className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.2vw]">
          Certificates
        </h3>
        <Image
          src="/wired-gradient-112-book.gif"
          alt="wired-gradient-112-book"
          width={80}
          height={80}
        />
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {certificate?.map(({ major, link, date, description, school }) => (
          <React.Fragment key={link}>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-apple font-bold">
                  <LinkOut title={major} url={link} out />
                </span>
                <p>
                  <span className="mr-2 text-sm text-ultra-light-gray">
                    {school}
                  </span>
                  <span className="text-sm text-ultra-light-gray">{date}</span>
                </p>
              </div>
              <p className="mt-2 ml-1 text-sm">{description}</p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default Certificates;
