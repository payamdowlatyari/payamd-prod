import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="grid justify-center m-auto w-[45w] min-w-[300px] z[2]">
      <ul className="inline-grid h-fit w-fit self-center py-2 min-w-[300px]">
        <li className="list-none py-1">
          <HoverLink title="Home" url="/" size="28px" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="About" url="/about" size="28px" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="Projects" url="/projects" size="28px" />
        </li>
        <li className="list-none py-1">
          <HoverLink title="Contact" url="/contact" size="28px" />
        </li>
      </ul>
    </div>
  );
}
