import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import TextSpinner from "../../motion/TextSpinner";
import LineBelow from "../../motion/View/LineBelow";

const Title = () => {
  return (
    <section id="home">
      <div className="title-content blend-difference">
        <div>
          <div className="main-title">
            <h2>{portfolio.text[0]}</h2>
            <h1>{portfolio.text[1]}</h1>
            <p>{portfolio.text[2]}</p>
          </div>
          <div className="top-links">
            <LineBelow title="01 Who I am" url="#about" />
            <LineBelow title="02 What I do" url="#services" />
          </div>
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
