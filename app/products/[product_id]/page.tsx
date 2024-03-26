"use client";

import React, { useState } from "react";
import Container from "../../../components/ui/container";
import ProductSlider from "../../../components/ui/productSlider";
import QuantitySelector from "../../../components/ui/quantitySelector";
import ProductInformation from "../../../components/ui/productInformation";
import products from "../../../public/enhanced_gym_items.json";
import ProductsCarousel from "../../../components/ui/productsCarousel";
import CouponsModal from "../../../components/ui/couponsModal";
import ProductBento from "../../../components/ui/productBento";
import Link from "next/link";

const ProductPage = ({ params }) => {
  const product_id = parseInt(params.product_id);
  const [showNotification, setShowNotification] = useState(false);
  const product = products.find((item) => item.id === product_id);
  const [quantity, setQuantity] = useState(1);
  const [couponModal, setCouponModal] = useState(false);

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

  const closeCouponModal = () => {
    setCouponModal(false);
  }

  return (
    <div
      id="product-page"
      className="pt-36 min-h-[100dvh] bg-gradient-to-b from-[#030712] to-[#210303] text-gray-50  flex flex-col justify-center"
    >
      <Container className={"w-auto relative"}>
        <div className="flex">
          <div className="w-3/6">
            <ProductSlider images={product?.image_gallery} />
          </div>
          <div className="w-3/6 space-y-6">
            <div className="w-full text-zinc-50">
              <p className="leading-[1.6] font-bold  text-4xl pl-10 py-2">
                {product?.name}
              </p>
            </div>
            <QuantitySelector
              quantity={quantity}
              changeQuantity={changeQuantity}
            />
            <ProductInformation product={product} className="" />
            <div className="flex justify-end space-x-10 items-center">
              <button
                onClick={() => setCouponModal(true)}
                className="group text-neutral-100 transition duration-300 animate-fade-in"
              >
                Apply coupons
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-[1px] bg-neutral-100"></span>
              </button>
              <button
                onClick={addToCart}
                className="bg-zinc-600 border text-base py-2 px-8 text-center rounded hover:bg-transparent transition-colors"
              >
                Add to Cart
              </button>
              {showNotification && (
                <div className="absolute top-0 z-10 right-0 text-center w-60 p-3 bg-red-500/50 text-white rounded">
                  Item added to cart!
                </div>
              )}
              <button className="bg-red-500 text-base py-2 px-8 text-center rounded border border-red-500 hover:bg-transparent transition-colors">
                Buy Now
              </button>
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
      {couponModal && <CouponsModal close={closeCouponModal}/>}
    </div>
  );
};

export default ProductPage;
