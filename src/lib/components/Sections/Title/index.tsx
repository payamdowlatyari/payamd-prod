import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import TextSpinner from "../../motion/TextSpinner";
import HoverLink from "../../motion/View/HoverLink";

const Title = () => {
  return (
    <section id="home">
      <div className="title-content">
        <div className="title-wrapper">
          <div className="main-title gradiant-area">
            <p>{portfolio.text[0]}</p>
            <h1>{portfolio.text[1]}</h1>
            <p>{portfolio.text[2]}</p>
          </div>
          <div className="top-links">
            <div>
              <HoverLink title="Who I am" url="#about" />
            </div>
            <div>
              <HoverLink title="What I do" url="#services" />
            </div>
          </div>
          <img
            src="wired-gradient-680-it-developer.gif"
            alt="wired-gradient-680-it-developer"
          />
        </div>
        <TextSpinner />
        <div className="max-width-screen">
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </div>
      </div>
    </section>
  );
};

export default Title;
