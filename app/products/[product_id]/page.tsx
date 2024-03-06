"use client";

import React, { useState } from "react";
import Container from "../../../components/ui/container";
import ProductSlider from "../../../components/ui/productSlider";
import QuantitySelector from "../../../components/ui/quantitySelector";
import ProductInformation from "../../../components/ui/productInformation";
import products from "../../../public/enhanced_gym_items.json";
import ProductsCarousel from "../../../components/ui/productsCarousel";
import ProductBento from "../../../components/ui/productBento";
import Link from "next/link";

const ProductPage = ({ params }) => {
  const product_id = parseInt(params.product_id);
  const [showNotification, setShowNotification] = useState(false);
  const product = products.find((item) => item.id === product_id);
  const [quantity, setQuantity] = useState(1);

  const changeQuantity = (amount: number) => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + amount;
      return newQuantity > 0 ? newQuantity : 1;
    });
  };
  const addToCart = () => {
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div
      id="product-page"
      className="pt-36 min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50 aeonik flex flex-col justify-center "
    >
      <Container className={"w-auto relative"}>
        <div className="flex">
          <div className="w-3/6">
            <ProductSlider images={product?.image_gallery} />
          </div>
          <div className="w-3/6 space-y-6">
            <div className="w-full bg-slate-50 opacity-85">
              <p className="leading-[1.6] text-zinc-900 font-bold aeonik text-4xl pl-10 py-2">
                {product?.name}
              </p>
            </div>
            <QuantitySelector
              quantity={quantity}
              changeQuantity={changeQuantity}
            />
            <ProductInformation product={product} />
            <div className="pl-10 space-x-10 pt-6">
              <button
                onClick={addToCart}
                className="bg-gray-600 text-base py-2 px-8 text-center"
              >
                Add to Cart
              </button>
              {showNotification && (
                <div className="fixed top-36 z-10 text-center left-0 2xl:left-[calc(100%-90%)] w-60 p-3 bg-red-500 text-white rounded shadow-lg">
                  Item added to cart!
                </div>
              )}
              <Link
                href={""}
                className="bg-red-500 text-base py-2 px-8 text-center"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="overflow-hidden mb-10">
          <h1 className="text-heading my-12">
            Other <b className="text-red-500">products</b>
          </h1>
          <ProductsCarousel
            className={"w-auto"}
            items={products}
            speed="slow"
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
