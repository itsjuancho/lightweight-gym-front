import About from "@/components/about";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Navbar from "@/components/ui/navbar";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <main className="flex flex-col">
        <Navbar />
        <Hero />
        <Services />
        <About/>
        <Contact />
    </main>
  );
}
