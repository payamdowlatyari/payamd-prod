import LinkOut from "../../motion/View/LinkOut";

export default function Contacts() {
  return (
    <div className="flex flex-col px-4 z-[2] contacts min-w-72">
      <div className="flex flex-col m-auto w-[200px] my-2">
        <h5 className="min-w-[100px] text-xl m-2 uppercase text-neutral-300">
          Contact Me
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="pdyari@gmail.com" url="mailto:pdyari@gmail.com" low />
          <LinkOut title="+1 916 547 8918" url="tel:+19165478918" low />
        </div>
      </div>

      <div className="flex flex-col m-auto w-[200px] my-2">
        <h5 className="min-w-[100px] text-xl m-2 uppercase text-neutral-300">
          More Links
        </h5>
        <div className="inline-grid p-2">
          <LinkOut title="My Blog" url="https://blog.payamd.com" low />
          <LinkOut title="Photography" url="https://photos.payamd.com" out />
        </div>
      </div>
    </div>
  );
}
