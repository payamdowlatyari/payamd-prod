import HoverLink from "../View/HoverLink";

export default function Nav() {
  return (
    <div className="navbar-container">
      <div className="navbar-items">
        <HoverLink title="Home" url="/" />
        <HoverLink title="About" url="/about" />
        <HoverLink title="Projects" url="/projects" />
      </div>
    </div>
  );
}
