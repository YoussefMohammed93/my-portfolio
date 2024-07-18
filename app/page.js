import Hero from "@/components/hero";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center overflow-hidden mx-auto px-5 sm:px-10 bg-black-100 min-h-screen">
      <div className="w-full max-w-7xl">
        <Navbar />
        <Hero />
      </div>
    </main>
  );
}
