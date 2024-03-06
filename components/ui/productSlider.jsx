"use client"

import React from 'react'
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { autoplayConfig, paginationConfig } from '../../lib/swiperConfig';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ProductsSlider = ({ images }) => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={autoplayConfig}
      pagination={paginationConfig}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper w-full"
    >
      {images?.map((image, index) => (
        <SwiperSlide key={index}>
          <div className="flex justify-center items-center bg-gradient-slider pt-7 pb-14">
            <Image className='transform -rotate-12' src={image} alt={`image-product ${index}`} width={400} height={400} loading="lazy"/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;