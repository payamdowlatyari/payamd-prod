import Image from "next/image";

import Icon from "./Icon";
import LinkOut from "./View/LinkOut";

const getTags = (tags: any) => {
  return (
    <div className="flex flex-row flex-wrap text-slate-50 justify-center">
      {tags?.map((tag: any) => {
        return <Icon id={tag} />;
      })}
    </div>
  );
};

export default function Card({ item }: any) {
  return (
    <figure className="relative flex flex-row justify-evenly flex-wrap overflow-hidden rounded-xl shadow-ultra-light-gray shadow-sm opacity-80 transition-all hover:opacity-100 hover:shadow-md hover:shadow-ultra-light-gray duration-500">
      <div>
        <Image
          src={item.img}
          alt={item.title}
          width={500}
          height={500}
          className="object-cover w-[500px] max-w-[100vw] h-auto origin-bottom"
        />
      </div>
      <div className="flex flex-wrap flex-col justify-evenly content-center max-w-[100vw] min-h-[25vh] w-full p-2">
        <div>
          <LinkOut url={item.url} title={item.title} out size="1em" />
          <p className="text-sm">{item.description}</p>
        </div>
        {getTags(item.tagIcon)}
      </div>
    </figure>
  );
}
