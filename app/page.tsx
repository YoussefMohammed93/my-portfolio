import dynamic from "next/dynamic";

import { Hero } from "@/components/sections/hero";

const About = dynamic(() =>
  import("@/components/sections/about").then((mod) => mod.About),
);

const Skills = dynamic(() =>
  import("@/components/sections/skills").then((mod) => mod.Skills),
);

const Services = dynamic(() =>
  import("@/components/sections/services").then((mod) => mod.Services),
);

const Projects = dynamic(() =>
  import("@/components/sections/projects").then((mod) => mod.Projects),
);

const Experience = dynamic(() =>
  import("@/components/sections/experience").then((mod) => mod.Experience),
);

const Contact = dynamic(() =>
  import("@/components/sections/contact").then((mod) => mod.Contact),
);

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Services />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
