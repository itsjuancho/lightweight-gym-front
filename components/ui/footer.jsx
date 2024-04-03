import React from "react";
import fab from "../../public/images/fab.svg";
import ig from "../../public/images/ig.svg";
import linke from "../../public/images/linke.svg";
import x from "../../public/images/x.svg";
import Image from "next/image";
import Container from "./container";

const Footer = () => {
  return (
    <footer className=" bg-slate-950 text-white text-xl py-16">
      <Container className="flex justify-between px-5 md:px-20">
        <p>©2024 Lightweight</p>

        <div className="flex space-x-4">
          <Image src={fab} alt="facebook" />
          <Image src={linke} alt="Linkedin" />
          <Image src={x} alt="X" />
          <Image src={ig} alt="IG" />
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
