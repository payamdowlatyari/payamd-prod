import LinkReveal from "../View/LinkReveal";

export default function TopNav() {
  return (
    <ul>
      <li className="list-none m-auto w-[90vw]">
        <LinkReveal title="Home" sub="Who I am and what I do" url="/" />
      </li>
      <li className="list-none m-auto w-[90vw]">
        <LinkReveal
          title="About"
          sub="Intro, my resume, and skills"
          url="/about"
        />
      </li>
      <li className="list-none m-auto w-[90vw]">
        <LinkReveal
          title="Projects"
          sub="My work portfolio and recent projects"
          url="/projects"
        />
      </li>
      <li className="list-none m-auto w-[90vw]">
        <LinkReveal
          title="Contact"
          sub="Send me a message to connect"
          url="/contact"
        />
      </li>
    </ul>
  );
}
