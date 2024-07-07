import ParallaxText from "../../motion/ParallaxText";
import TextSpinner from "../../motion/TextSpinner";
import HoverLink from "../../motion/View/HoverLink";

import { portfolio } from "./data";

const Title = () => {
  return (
    <section id="home">
      <div className="flex flex-col self-end justify-between h-[80vh]">
        <div className="flex flex-col items-start justify-center relative">
          <div className="ml-4">
            <p className="ml-2 text-2xl lg:text-3xl text-ultra-light-gray">
              {portfolio.text[0]}
            </p>
            <h1>
              <span className="inline-flex animate-background-shine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-5xl lg:text-7xl text-transparent">
                {portfolio.text[1]}
              </span>
            </h1>
            <p className="ml-2 text-2xl lg:text-3xl text-ultra-light-gray">
              {portfolio.text[2]}
            </p>
          </div>
          <div className="uppercase m-5 flex">
            <div className="min-w-[120px] ml-2">
              <HoverLink title="Who I am" url="#about" />
            </div>
            <div className="min-w-[120px] ml-5">
              <HoverLink title="What I do" url="#services" />
            </div>
          </div>
        </div>
        <TextSpinner />
        <div className="max-w-[100vw]">
          <ParallaxText baseVelocity={-0.05}>{portfolio.titles}</ParallaxText>
        </div>
      </div>
    </section>
  );
};

export default Title;
