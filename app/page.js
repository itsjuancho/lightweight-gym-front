import Hero from "@/components/hero";

export default function Home() {
  return (
    <main className="flex flex-col">
        <Hero />
        <a href="/auth/login"> login</a>
        <a href="/auth/register"> registro</a>
    </main>
  );
}
