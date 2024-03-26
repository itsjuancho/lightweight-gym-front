import React from "react";
import ProductsCarousel from "../ui/productsCarousel";
import Container from "../ui/container";
import products from "../../public/enhanced_gym_items.json";
import ProductBento from "../ui/productBento";

const Highlights = () => {
  return (
    <div
      id="services"
      className="overflow-hidden bg-gradient-to-b from-[#210303] to-[#030712] text-gray-50  flex flex-col justify-center"
    >
      <Container className={'pb-20'}>
        <h1 className="text-heading">Our Favorite Products</h1>
        <ProductsCarousel items={products} speed="slow" />
        <ProductBento />
      </Container>
    </div>
  );
};

export default Highlights;
