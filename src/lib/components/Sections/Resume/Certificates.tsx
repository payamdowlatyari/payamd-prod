import { certificate } from "../../data/data";
import LinkOut from "../../motion/View/LinkOut";

const Certificates = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse p-2">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Certificates
        </h3>
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {certificate?.map(({ major, link, date, school }) => (
          <div className="bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 rounded-lg mx-2 mb-4 p-2">
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <p>
                <span className="font-bold">
                  <LinkOut title={major} url={link} out />
                </span>
              </p>
              <p>
                <span className="text-sm text-neutral-300">{date}</span>
              </p>
            </div>
            <p>
              <span className="mr-2 text-sm text-neutral-300">{school}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Certificates;
