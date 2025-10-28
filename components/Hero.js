"use client";

import { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import { ChevronDown, Play, Camera, Plane, Heart } from "lucide-react";
import Link from "next/link";
import "keen-slider/keen-slider.min.css";

const slides = [
  {
    id: 1,
    type: "Video",
    title: "Cinematic Storytelling",
    subtitle: "Professional video production that brings your story to life",
    image:
      "https://images.pexels.com/photos/66134/pexels-photo-66134.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    icon: Play,
    link: "/video",
    color: "bg-red-600",
  },
  {
    id: 2,
    type: "Drone",
    title: "Aerial Perspectives",
    subtitle:
      "Breathtaking views from above with professional drone photography",
    image:
      "https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    icon: Plane,
    link: "/drone",
    color: "bg-blue-600",
  },
  {
    id: 3,
    type: "Wedding",
    title: "Love Stories",
    subtitle: "Capturing the magic and emotion of your special day",
    image:
      "https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    icon: Heart,
    link: "/wedding",
    color: "bg-pink-600",
  },
  {
    id: 4,
    type: "Photo",
    title: "Timeless Portraits",
    subtitle: "Professional photography that captures your authentic self",
    image:
      "https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    icon: Camera,
    link: "/photo",
    color: "bg-green-600",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    duration: 1000,
    slides: {
      perView: 1,
      spacing: 0,
    },
    created() {
      setLoaded(true);
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  // Auto-play functionality
  useEffect(() => {
    if (!instanceRef.current) return;

    const interval = setInterval(() => {
      instanceRef.current?.next();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [instanceRef]);

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      <div ref={sliderRef} className="keen-slider h-full">
        {slides.map((slide, idx) => (
          <div key={slide.id} className="keen-slider__slide relative h-full">
            {/* Background Image - Responsive positioning */}
            <div
              className="absolute inset-0 z-0 transition-transform duration-1000 ease-out"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${slide.image}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: currentSlide === idx ? "scale(1)" : "scale(1.1)",
              }}
            />

            {/* Type Label - Responsive positioning and sizing */}
            <div className="absolute top-16 sm:top-20 left-4 sm:left-8 z-20">
              <div
                className={`${slide.color} text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center space-x-2 shadow-lg backdrop-blur-sm bg-opacity-90`}
              >
                <slide.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  {slide.type}
                </span>
              </div>
            </div>

            {/* Content - Responsive typography and spacing */}
            <div className="relative z-10 h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
              <div className="text-center text-white max-w-4xl mx-auto">
                <h1
                  className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight transition-all duration-1000 ${
                    currentSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.title}
                </h1>
                <p
                  className={`text-base sm:text-xl md:text-2xl mb-6 sm:mb-8 leading-relaxed transition-all duration-1000 delay-200 px-4 ${
                    currentSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {slide.subtitle}
                </p>
                <div
                  className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center transition-all duration-1000 delay-400 ${
                    currentSlide === idx
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  <Link
                    href={slide.link}
                    className="w-full sm:w-auto bg-[#47240E] hover:bg-[#5A2F14] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-center"
                  >
                    Explore {slide.type}
                  </Link>
                  <button
                    onClick={scrollToPortfolio}
                    className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 text-center"
                  >
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Dots - Responsive positioning */}
      {loaded && instanceRef.current && (
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-2 sm:space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => instanceRef.current?.moveToIdx(idx)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === idx
                    ? "bg-[#47240E] scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-white/20">
          <div
            className="h-full bg-[#47240E] transition-all duration-300 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Scroll Indicator - Responsive positioning */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <button
          onClick={scrollToPortfolio}
          className="text-white hover:text-brand-brown-300 transition-colors duration-200"
        >
          <ChevronDown className="h-6 w-6 sm:h-8 sm:w-8" />
        </button>
      </div>

      {/* Side Navigation - Hidden on mobile, responsive sizing */}
      {loaded && instanceRef.current && (
        <>
          <button
            onClick={() => instanceRef.current?.prev()}
            className="hidden sm:block absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="hidden sm:block absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white p-2 sm:p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <svg
              className="w-4 h-4 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}
    </section>
  );
}
