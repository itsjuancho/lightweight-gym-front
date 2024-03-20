import Hero from "../components/sections/hero";
import Services from "../components/sections/services";
import Highlights from "../components/sections/highlights";

export default function Home() {
  return (
    <main className="flex flex-col">
        <Hero />
        <Highlights/>
        <Services />
    </main>
  );
}
