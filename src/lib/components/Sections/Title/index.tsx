// import Link from "next/link";

import ParallaxText from "../../motion/ParallaxText";
import { Spotlight } from "../../motion/Spotlight";
import TextSpinner from "../../motion/TextSpinner";
import { GlassButton } from "../../motion/View/TailwindButton";

import { portfolio } from "./data";

const Title = () => {
  return (
    <section id="home">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className="flex flex-col self-end justify-between h-[80vh]">
        <div className="flex flex-col items-start justify-center relative">
          <div className="ml-4">
            <p className="ml-2 text-2xl lg:text-3xl text-ultra-light-gray">
              {portfolio.text[0]}
            </p>
            <h1>
              <span className="inline-flex text-5xl lg:text-7xl">
                {portfolio.text[1]}
              </span>
            </h1>
            {/* <p className="ml-2 text-2xl lg:text-3xl text-ultra-light-gray">
              {portfolio.text[2]}
            </p> */}
            <p className="ml-2 text-2xl lg:text-3xl animate-text-shimmer bg-clip-text text-transparent bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]">
              {portfolio.text[2]}
            </p>
          </div>
          <div className="uppercase m-5 flex">
            <GlassButton url="#about" title="Who I am" />
            <GlassButton url="#services" title="What I do" />
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
