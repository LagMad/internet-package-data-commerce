"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper49 = () => {
  const images = [
    { src: "/images/x.com/13.jpeg", alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/32.jpeg", alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/20.jpeg", alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/21.jpeg", alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/19.jpeg", alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/1.jpeg",  alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/2.jpeg",  alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/3.jpeg",  alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/4.jpeg",  alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/5.jpeg",  alt: "Illustrations by my fav AarzooAly" },
    { src: "/images/x.com/6.jpeg",  alt: "Illustrations by my fav AarzooAly" },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper49 };

// ─── Types ───────────────────────────────────────────────────────────────────

type ImageSlide = { src: string; alt: string };

interface Carousel003Props {
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
  // image mode (original)
  images?: ImageSlide[];
  // card mode — pass an array of React nodes, each becomes a slide
  slides?: React.ReactNode[];
  // per-slide width override (default 300px)
  slideWidth?: number;
  // carousel height override (default 350px)
  slideHeight?: number;
}

// ─── Component ───────────────────────────────────────────────────────────────

const Carousel_003 = ({
  images,
  slides,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
  slideWidth = 300,
  slideHeight = 350,
}: Carousel003Props) => {
  const css = `
    .Carousal_003 {
      width: 100%;
      height: ${slideHeight}px;
      padding-bottom: 50px !important;
    }

    .Carousal_003 .swiper-slide {
      background-position: center;
      background-size: cover;
      width: ${slideWidth}px;
    }

    .swiper-pagination-bullet {
      background-color: #000 !important;
    }
  `;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={autoplay ? { delay: 1500, disableOnInteraction: true } : false}
          effect="coverflow"
          grabCursor
          slidesPerView="auto"
          centeredSlides
          loop={loop}
          coverflowEffect={{ rotate: 40, stretch: 0, depth: 100, modifier: 1, slideShadows: true }}
          pagination={showPagination ? { clickable: true } : false}
          navigation={
            showNavigation
              ? { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {/* card/node mode */}
          {slides?.map((slide, i) => (
            <SwiperSlide key={i}>{slide}</SwiperSlide>
          ))}

          {/* image mode (original behaviour) */}
          {!slides && images?.map((image, i) => (
            <SwiperSlide key={i}>
              <img className="h-full w-full object-cover" src={image.src} alt={image.alt} />
            </SwiperSlide>
          ))}

          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_003 };

/**
 * Skiper 49 Carousel_003 — React + Swiper
 * Built with Swiper.js - Read docs to learn more https://swiperjs.com/
 * Illustrations by AarzooAly - https://x.com/AarzooAly
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */