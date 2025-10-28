"use client";

import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import MediaContext from "@/contexts/MediaContext";
import { Camera } from "lucide-react";

const categories = [
  "All",
  "wedding",
  "portrait",
  "corporate",
  "event",
  "drone",
  "commercial",
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { mediaItems, loading, error } = useContext(MediaContext);

  const filteredItems =
    activeCategory === "All"
      ? mediaItems
      : mediaItems.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-12 sm:py-16 lg:py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
            My <span className="text-brand-brown">Portfolio</span>
          </h2>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4">
            A collection of moments frozen in time, each telling a unique story
            of love, joy, and celebration
          </p>
        </div>

        {/* Category Filter - Mobile optimized */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="w-full max-w-4xl overflow-x-auto">
            <div className="flex justify-center gap-2 sm:gap-4 p-2 bg-white rounded-full shadow-lg min-w-max mx-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category
                      ? "bg-brand-brown text-white shadow-lg"
                      : "text-neutral-600 hover:text-brand-brown hover:bg-brand-brown-50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Responsive Grid - Mobile first approach */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredItems.slice(0, 9).map((item) => (
            <div
              key={item._id}
              className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3.5] relative">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw,
                 (max-width: 1024px) 50vw,
                 33vw"
                />
              </div>

              {/* Category Badge - Responsive sizing */}
              <div className="absolute top-2 sm:top-3 left-2 sm:left-3">
                <span className="bg-brand-brown text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay - Responsive text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 text-white">
                  <p className="text-xs sm:text-sm font-medium text-brand-brown-300 mb-1 sm:mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results - Responsive text */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <Camera className="h-12 w-12 sm:h-16 sm:w-16 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-2">
              No media found in this category.
            </h3>
            <p className="text-neutral-600">
              Try selecting a different category to see more content.
            </p>
          </div>
        )}

        {/* View More Button - Responsive sizing */}
        <div className="text-center mt-8 sm:mt-12">
          <Link
            href="/portfolio"
            className="inline-flex items-center bg-brand-brown hover:bg-brand-brown-hover text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View Full Portfolio
            <svg
              className="ml-2 h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
