import ParallaxText from "../../motion/ParallaxText";
import { portfolio } from "./data";
import TextSpinner from "../../motion/TextSpinner";

const Title = () => {
  return (
    <section id="home">
      <div className="title-content blend-difference">
        <div className="main-title">
          <h2>{portfolio.text[0]}</h2>
          <h1>{portfolio.text[1]}</h1>
          <h1>{portfolio.text[2]}</h1>
          <p>{portfolio.text[3]}</p>
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
