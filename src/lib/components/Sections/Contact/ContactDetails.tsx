import { LinkArrowOut } from "../../motion/View/TailwindButton";

export default function Contacts() {
  return (
    <div className="flex flex-col px-4 z-[2] contacts min-w-72">
      <div className="flex flex-col m-auto w-52 my-4">
        <h5 className="min-w-24 font-semibold text-2xl md:text-3xl m-2 uppercase text-neutral-500">
          Contact
        </h5>
        <div className="inline-grid p-2">
          <LinkArrowOut
            title="pdyari@gmail.com"
            url="mailto:pdyari@gmail.com"
          />
        </div>
      </div>

      <div className="flex flex-col m-auto w-52 my-4">
        <h5 className="min-w-24 font-semibold text-2xl md:text-3xl m-2 uppercase text-neutral-500">
          Check Out
        </h5>
        <div className="inline-grid p-2">
          <LinkArrowOut title="My Blog" url="https://blog.payamd.com" />
          <LinkArrowOut title="Photography" url="https://photos.payamd.com" />
        </div>
      </div>
    </div>
  );
}
