import Hero from "@/components/hero";
import Services from "@/components/services";
import Navbar from "@/components/ui/navbar";

export default function Home() {

  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Services />
    </main>
  );
}
