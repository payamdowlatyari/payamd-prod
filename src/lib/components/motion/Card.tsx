import Image from "next/image";

import Icon from "./Icon";
import LinkOut from "./View/LinkOut";

export default function Card({ item }: any) {
  return (
    <figure className="relative flex flex-row justify-evenly flex-wrap overflow-hidden rounded-xl shadow-neutral-500 shadow-md opacity-90 transition-all hover:opacity-100 hover:scale-105 hover:shadow-lg hover:shadow-neutral-500 duration-500">
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
        <div className="flex flex-row flex-wrap text-slate-50 justify-center">
          {item.tagIcon?.map((tag: any) => {
            return <Icon id={tag} />;
          })}
        </div>
      </div>
    </figure>
  );
}
