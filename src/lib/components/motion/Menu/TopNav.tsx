import LinkReveal from "../View/LinkReveal";

export default function TopNav() {
  return (
    <div className="top-navbar-container">
      <ul className="top-navbar-items">
        <li>
          <LinkReveal title="Home" sub="Who I am and what I do" url="/" />
        </li>
        <li>
          <LinkReveal
            title="About"
            sub="Intro, my resume, and skills"
            url="/about"
          />
        </li>
        <li>
          <LinkReveal
            title="Projects"
            sub="My work portfolio and recent projects"
            url="/projects"
          />
        </li>
        <li>
          <LinkReveal
            title="Contact"
            sub="Send me a message to connect"
            url="/contact"
          />
        </li>
      </ul>
    </div>
  );
}
