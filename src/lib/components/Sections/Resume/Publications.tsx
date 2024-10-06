import { publication } from "../../data/data";
import { MagicCard } from "../../motion/MagicCard";
import LinkOut from "../../motion/View/LinkOut";

const Publications = () => (
  <div className="flex flex-row justify-center items-center h-screen m-1">
    <div className="flex flex-col justify-evenly max-w-[98vw] h-[80vh] overflow-hidden">
      <div className="flex flex-col-reverse px-4">
        <h3 className="text-3xl md:text-5xl lg:text-7xl tracking-[-0.2vw]">
          Publications
        </h3>
      </div>
      <div className="max-w-[98vw] flex flex-col justify-evenly">
        {publication?.map(({ title, link, date, description, summary }) => (
          <MagicCard
            key={title}
            className="cursor-pointer flex-col items-stretch justify-center shadow-2xl whitespace-nowrap m-1 p-1"
          >
            <div className="flex justify-between flex-wrap gap-2 w-full">
              <LinkOut title={title} url={link} out />
              <p>
                <span className="mr-2 text-sm text-neutral-300">{date}</span>
              </p>
            </div>
            <div className="pl-1 text-wrap max-w-screen-md">
              <p className="my-2 font-thin">{description}</p>
              <p className="text-sm">{summary}</p>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  </div>
);

export default Publications;
