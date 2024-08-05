import Image from "next/image";

import LinkOut from "./View/LinkOut";

export default function Card({ item }: any) {
  return (
    <figure className="relative flex flex-row justify-evenly flex-wrap overflow-hidden backdrop-blur-sm rounded-xl shadow-neutral-500 shadow-md opacity-90 transition-all hover:opacity-100 hover:scale-105 hover:shadow-lg hover:shadow-neutral-500 duration-500">
      <div>
        <Image
          src={item.img}
          alt={item.title}
          width={500}
          height={500}
          className="object-cover w-[500px] max-w-[100vw] h-auto origin-bottom"
        />
      </div>
      <div className="flex flex-wrap flex-col justify-evenly content-center max-w-[100vw] min-h-[25vh] w-full bg-gray-800/40 backdrop-blur-sm ring-1 ring-inset ring-gray-500/20 p-2">
        <div>
          <LinkOut url={item.url} title={item.title} out size="1em" />
          <p className="text-sm">{item.description}</p>
        </div>
        <div className="flex flex-row flex-wrap text-slate-50 justify-center">
          {item.tags?.map((tag: any) => {
            return (
              <span className="inline-flex items-center mx-1 gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white">
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </figure>
  );
}
