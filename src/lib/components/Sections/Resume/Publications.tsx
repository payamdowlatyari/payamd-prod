import { publication } from "../../data/data";
import LinkOut from "../../motion/View/LinkOut";

const Publications = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse px-4">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Publications
        </h3>
      </div>
      <div className="w-[750px] max-w-screen-md flex flex-col justify-evenly">
        {publication?.map(({ title, link, date, description, summary }) => (
          <div className="bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 rounded-lg mb-4 p-2">
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <LinkOut title={title} url={link} out />
              <p>
                <span className="mr-2 text-sm text-neutral-300">{date}</span>
              </p>
            </div>
            <div className="pl-1">
              <p className="my-2 font-thin">{description}</p>
              <p className="text-sm">{summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Publications;
