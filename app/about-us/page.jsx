import React from "react";
import Container from "../../components/ui/container";

const About = () => {
  const members = [
    { name: "Tobías Moccagatta" },
    { name: "Elías Vásquez" },
    { name: "Ruth Borda Mendez" },
    { name: "Erika Martínez" },
    { name: "Luca González" },
    { name: "Juan Andrés Pérez" },
    { name: "Alejandro Laurito" },
    { name: "Juan Ignacio Delena" },
    { name: "Máximo Vulcano" },
    { name: "Oscar Pulido" },
  ];

  return (
    <div id="about" className="min-h-[100dvh] bg-[#030712] text-gray-50  flex flex-col justify-center">
      <Container className="py-32 gap-5 md:px-20 px-5 flex flex-col justify-center items-center">
        <h1 className="text-red-500 md:text-display text-4xl coanda-bold md:text-nowrap text-center md:text-start">
          The muscle behind Lightweight
        </h1>
        <p className="md:text-2xl text-center max-w-[650px] text-balance mt-2">
          our team is the core of our strength. Comprised of seasoned
          powerlifters, certified trainers, and nutrition experts, we&apos;re
          united by a single mission—to ignite your full potential.
        </p>

        <div className="w-full md:flex md:flex-wrap md:justify-center md:items-center gap-5 md:mt-16 mt-8">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
            >
              <div className="bg-[#111827] w-56 h-56 rounded-xl" />
              <span className="coanda text-red-500 pt-2">{member.name}</span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default About;
