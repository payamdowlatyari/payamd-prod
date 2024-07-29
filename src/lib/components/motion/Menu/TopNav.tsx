import { LinkOverlay } from "../View/TailwindButton";

export default function TopNav() {
  return (
    <div className="flex flex-col flex-wrap">
      <li className="list-none">
        <LinkOverlay url="/" title="Home" />
      </li>
      <li className="list-none">
        <LinkOverlay url="/about" title="About" />
      </li>
      <li className="list-none">
        <LinkOverlay url="/projects" title="Projects" />
      </li>
      <li className="list-none">
        <LinkOverlay url="/contact" title="Contact" />
      </li>
    </div>
  );
}
