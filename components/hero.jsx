import React from "react";
import Container from "./ui/container";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Hero = () => {
  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-zinc-100 to-zinc-200 text-zinc-800 flex flex-col justify-center">
      <Container className="py-16 rounded-3xl">
        <div className="flex flex-col justify-center items-center">
          <Drawer>
            <DrawerTrigger className="border-2 border-[#FFFF69] px-4 py-1 rounded-lg">Grupo 04</DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className={'min-w-[1440px] mx-auto'}>
                <DrawerTitle>Integrantes</DrawerTitle>
                <DrawerDescription>
                  Ale, Elias, Erika, Juancho, Lina, Luca, Maicol, Ruth, Tobi
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
