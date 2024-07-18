import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import MagicButton from "./ui/MagicButton";
import Link from "next/link";
import { TextGenerateEffectP } from "./ui/text-generate-effect-p";

export default function Hero() {
  return (
    <div>
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 right-20 h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight
          className="top-12 left-full h-[90vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>

      <div className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute left-0 top-0 flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div className="flex justify-center relative mb-20 mt-40 sm:mt-20 lg:mt-32 z-10">
        <div className="flex flex-col items-center justify-center max-w-[90vw] lg:max-w-[60vw]">
          <h2 className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            Dynamic Web Magic with React.Js
          </h2>
          <TextGenerateEffect
            className="text-center text-4xl lg:text-6xl font-extrabold mt-5"
            words="Transforming Code into Seamless User Experiences"
          />
          <TextGenerateEffectP
            className="text-center md:tracking-wider mb-4 mt-8 text-sm md:text-lg lg:text-2xl"
            words="Hi, I'm Youssef Mohammed, A React.js Front End Developer"
          />
          <Link href="/">
            <MagicButton title="Show My Work" />
          </Link>
        </div>
      </div>
    </div>
  );
}
