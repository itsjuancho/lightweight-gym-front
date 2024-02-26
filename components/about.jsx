import React from "react";
import Container from "./ui/container";

const About = () => {
  const members = [
    { name: "Maicol" },
    { name: "Tobi" },
    { name: "Elias" },
    { name: "Lina" },
    { name: "Ruth" },
    { name: "Eri" },
    { name: "Luca" },
    { name: "Juancho" },
    { name: "Ale" },
    { name: "Juan Ignacio" },
  ];

  return (
    <div id="about" className="min-h-[100dvh] bg-[#030712] text-gray-50 aeonik flex flex-col justify-center">
      <Container className="py-16 gap-5 px-20 flex flex-col justify-center items-center">
        <h1 className="text-red-500 text-display coanda-bold text-nowrap">
          The muscle behind Lightweight
        </h1>
        <p className="text-2xl text-center max-w-[650px] text-balance mt-16">
          our team is the core of our strength. Comprised of seasoned
          powerlifters, certified trainers, and nutrition experts, we&apos;re
          united by a single mission—to ignite your full potential.
        </p>

        <div className="w-full flex flex-wrap justify-center items-center gap-5 mt-16">
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
