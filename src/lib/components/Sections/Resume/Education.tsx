import { education } from "../../data/data";

const Education = () => (
  <div className="flex flex-row flex-wrap justify-center items-center h-screen max-w-[100vw] overflow-hidden m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse px-4">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Education
        </h3>
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {education?.map(({ school, major, date, description }) => (
          <div className="bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 rounded-lg mx-2 mb-4 p-2">
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <p>
                <span className="font-bold uppercase">{school}</span>
              </p>
              <p>
                <span className="text-sm text-neutral-300">{date}</span>
              </p>
            </div>

            <p>
              <span className="text-neutral-300 font-thin">{major}</span>
            </p>
            <div className="mt-2 text-sm pl-1">
              {description?.map((desc) => (
                <p className="mb-1" key={desc}>
                  {desc}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Education;
