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
          <div className="relative max-h-[400px] flex rounded-xl justify-center items-center bg-gradient-to-r from-slate-800 to-slate-900 pt-7 pb-14 overflow-hidden">
            <div className='z-10 absolute w-full h-full top-0 left-0 bg-gradient-to-r from-[#111827] via-transparent to-[#111827]'/>
            <Image className='transform' src={image} alt={`image-product ${index}`} width={1024} height={768} loading="lazy"/>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;