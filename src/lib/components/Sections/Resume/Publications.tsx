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
          <div className="mb-6">
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <LinkOut title={title} url={link} out />
              <p>
                <span className="mr-2 text-sm text-neutral-300">{date}</span>
              </p>
            </div>
            <div className="border-l-2 pl-2 border-neutral-300">
              <p className="mt-2 ml-1 text-sm">{description}</p>
              <br />
              <p className="ml-1 text-sm">{summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Publications;
